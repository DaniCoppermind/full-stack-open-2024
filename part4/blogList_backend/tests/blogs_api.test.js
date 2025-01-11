const { test, after, beforeEach, describe } = require('node:test')
const assert = require('assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog.model')
const User = require('../models/user.model')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()

  await Blog.insertMany(helper.initialBlogs)
})

describe('Initial Blog Saves', () => {
  let token

  beforeEach(async () => {
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'root', password: 'sekret' })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    token = loginResponse.body.token
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Lorem ipsum 2',
      author: 'Author Test 2',
      url: 'http://example2.com',
      likes: 22,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((b) => b.title)
    assert(titles.includes(newBlog.title))
  })

  test('adding a blog fails with status code 401 if token is not provided', async () => {
    const newBlog = {
      title: 'Lorem ipsum 2',
      author: 'Author Test 2',
      url: 'http://example2.com',
      likes: 22,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlogData = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1,
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedBlogData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const updatedBlog = response.body
    assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 1)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlogFromDb = blogsAtEnd.find(
      (blog) => blog.id === blogToUpdate.id
    )
    assert.strictEqual(updatedBlogFromDb.likes, blogToUpdate.likes + 1)
  })

  test('a blog can be deleted', async () => {
    const newBlog = {
      title: 'Lorem ipsum 2',
      author: 'Author Test 2',
      url: 'http://example2.com',
      likes: 22,
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogToDelete = response.body

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

    const titles = blogsAtEnd.map((b) => b.title)
    assert(!titles.includes(blogToDelete.title))
  })
})

after(async () => {
  await mongoose.connection.close()
})
