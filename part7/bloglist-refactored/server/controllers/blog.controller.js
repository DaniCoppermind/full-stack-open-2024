const blogRouter = require('express').Router()
const Blog = require('../models/blog.model')
const { tokenExtractor, userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id).populate('user', {
      username: 1,
      name: 1,
    })
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

blogRouter.post(
  '/',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const { title, author, url, likes } = request.body
    const user = request.user

    if (!user) {
      return response.status(401).json({ error: 'user not authenticated' })
    }

    if (!title || !url) {
      return response.status(400).json({ error: 'title and url are required' })
    }

    const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user._id,
    })

    try {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog)
    } catch (error) {
      response.status(400).json({ error: error.message })
    }
  }
)

blogRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  blog.comments = blog.comments.concat(comment)
  const updatedBlog = await blog.save()
  response.status(201).json(updatedBlog)
})

blogRouter.put(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const { title, author, url, likes } = request.body
    const user = request.user

    if (!user) {
      return response.status(401).json({ error: 'user not authenticated' })
    }

    const blog = {
      title,
      author,
      url,
      likes,
    }

    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        blog,
        {
          new: true,
        }
      )
      if (updatedBlog) {
        response.json(updatedBlog)
      } else {
        response.status(404).end()
      }
    } catch (error) {
      response.status(400).json({ error: error.message })
    }
  }
)

blogRouter.delete(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (request, response, next) => {
    try {
      const user = request.user

      if (!user) {
        return response.status(401).json({ error: 'user not authenticated' })
      }

      const blog = await Blog.findById(request.params.id)
      if (!blog) {
        return response.status(404).json({ error: 'blog not found' })
      }

      if (blog.user.toString() !== user._id.toString()) {
        return response.status(401).json({ error: 'unauthorized' })
      }

      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } catch (error) {
      response.status(400).json({ error: error.message })
    }
  }
)

module.exports = blogRouter
