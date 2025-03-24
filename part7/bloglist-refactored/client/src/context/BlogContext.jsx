import {
  useContext,
  createContext,
  useState,
  useEffect,
  useReducer,
} from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createBlog,
  createComment,
  deleteBlog,
  getBlogs,
  updateBlog,
} from '../api/api'
import { notificationReducer } from '../reducers/notificationReducer'

const BlogContext = createContext()

export const useBlog = () => {
  const context = useContext(BlogContext)
  if (!context) throw new Error('useBlog must be used within an BlogProvider')

  return context
}

const initialNotificationState = {
  type: '',
  message: '',
}

export const BlogProvider = ({ children }) => {
  const queryClient = useQueryClient()
  const [blogs, setBlogs] = useState([])
  const [notification, dispatchNotification] = useReducer(
    notificationReducer,
    initialNotificationState
  )

  const { data } = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (data) {
      setBlogs(data)
    }
  }, [data])

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        dispatchNotification({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      if (blogs) {
        queryClient.setQueryData(['blogs'], [...blogs, newBlog])
      }
      dispatchNotification({
        type: 'SET_NOTIFICATION',
        payload: {
          type: 'created',
          message: `Blog "${newBlog.title}" created successfully!`,
        },
      })
    },
  })

  const updateLikeMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      if (blogs) {
        const updatedBlogs = blogs.map((blog) =>
          blog.id === updatedBlog.id ? updatedBlog : blog
        )
        queryClient.setQueriesData(['blogs'], updatedBlogs)
        dispatchNotification({
          type: 'SET_NOTIFICATION',
          payload: {
            type: 'like',
            message: `You liked "${updatedBlog.title}"!`,
          },
        })
      }
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: (deletedBlogId) => {
      const blogs = queryClient.getQueryData(['blogs'])
      if (blogs) {
        const deletedBlog = blogs.find((blog) => blog.id === deletedBlogId)
        queryClient.setQueryData(
          ['blogs'],
          blogs.filter((blog) => blog.id !== deletedBlogId)
        )
        dispatchNotification({
          type: 'SET_NOTIFICATION',
          payload: {
            type: 'deleted',
            message: `Blog "${deletedBlog.title}" deleted successfully!`,
          },
        })
      }
    },
  })

  const newCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      if (blogs) {
        const updatedBlogs = blogs.map((blog) =>
          blog.id === updatedBlog.id ? updatedBlog : blog
        )
        queryClient.setQueryData(['blogs'], updatedBlogs)
        dispatchNotification({
          type: 'SET_NOTIFICATION',
          payload: {
            type: 'created',
            message: `Comment added to "${updatedBlog.title}"!`,
          },
        })
      }
    },
  })

  return (
    <BlogContext.Provider
      value={{
        blogs,
        newBlogMutation,
        updateLikeMutation,
        deleteBlogMutation,
        newCommentMutation,
        notification,
      }}
    >
      {children}
    </BlogContext.Provider>
  )
}
