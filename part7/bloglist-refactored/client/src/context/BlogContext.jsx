import { useContext, createContext, useState, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createBlog, deleteBlog, getBlogs, updateBlog } from '../api/api'

const BlogContext = createContext()

export const useBlog = () => {
  const context = useContext(BlogContext)
  if (!context) throw new Error('useBlog must be used within an BlogProvider')

  return context
}

export const BlogProvider = ({ children }) => {
  const queryClient = useQueryClient()
  const [blogs, setBlogs] = useState([])

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

  const newBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], [...blogs, newBlog])
    },
  })

  const updateLikeMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
    },
  })

  return (
    <BlogContext.Provider
      value={{ blogs, newBlogMutation, updateLikeMutation, deleteBlogMutation }}
    >
      {children}
    </BlogContext.Provider>
  )
}
