const Blog = require('../models/blog.model')

const initialBlogs = [
  {
    title: 'El Camino de los Reyes',
    author: 'Brandon Sanderson',
    url: 'https://www.goodreads.com/book/show/7235533-the-way-of-kings',
    likes: 1500,
  },
  {
    title: 'Palabras Radiantes',
    author: 'Brandon Sanderson',
    url: 'https://www.goodreads.com/book/show/17332218-words-of-radiance',
    likes: 1400,
  },
  {
    title: 'Juramentada',
    author: 'Brandon Sanderson',
    url: 'https://www.goodreads.com/book/show/34002132-oathbringer',
    likes: 1300,
  },
  {
    title: 'El Ritmo de la Guerra',
    author: 'Brandon Sanderson',
    url: 'https://www.goodreads.com/book/show/49021976-rhythm-of-war',
    likes: 1200,
  },
  {
    title: 'Dawnshard',
    author: 'Brandon Sanderson',
    url: 'https://www.goodreads.com/book/show/54511228-dawnshard',
    likes: 1100,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ author: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
}
