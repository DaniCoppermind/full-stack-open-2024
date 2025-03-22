import { useContext, createContext, useState, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createBlog, getBlogs } from '../api/api'

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

  return (
    <BlogContext.Provider value={{ blogs, newBlogMutation }}>
      {children}
    </BlogContext.Provider>
  )
}
