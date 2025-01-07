const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog.model')

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

test('Returned correct length blog list', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('Blogs have id instead of _id', async () => {
  const blogsAtStart = await helper.blogsInDb()

  blogsAtStart.forEach((blog) => {
    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
  })
})

test('a valid blog can be added', async () => {
  const newBlog = new Blog({
    title: 'Title Test',
    author: 'Author Test',
    url: 'http://example.com',
    likes: 5,
  })

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
})

test('Blog without likes start with 0', async () => {
  const newBlog = {
    title: 'Title Test',
    author: 'Author Test',
    url: 'http://example.com',
  }

  await api.post('/api/blogs').send(newBlog)

  const blogsAtEnd = await helper.blogsInDb()
  const addedBlog = blogsAtEnd[blogsAtEnd.length - 1]

  assert.strictEqual(addedBlog.likes, 0)
})

test('Blog without title and url is not added', async () => {
  const newBlog = {
    author: 'Lorem Ipsum',
  }

  await api.post('/api/blogs').send(newBlog).expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

after(async () => {
  await mongoose.connection.close()
})
