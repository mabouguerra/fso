const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./helper')
const Blog = require('../models/blog')



const authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFtaW5lIiwiaWQiOiI1ZTg1MGY0ZmUxNDdmNzUzYTQ2MDUwMTAiLCJpYXQiOjE1ODU3Nzg1Mjd9.TDG4kSNuiUgduPM6fU1sbgvCPBdYtJGhNI4W2igmNkw'

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBLogs.map(blog => new Blog({ ...blog, user: mongoose.Types.ObjectId('5e850f4fe147f753a4605010') }))

  const promiseArray = blogObjects.map(blog => blog.save())

  await Promise.all(promiseArray)

})

describe('retrieval of saved blogs', () => {

  test('correct amount of blog posts is returned in the JSON format', async () => {

    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBLogs.length)

  })

  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('Addition of a new blog', () => {

  test('new blog post is successfully created ', async () => {
    const newBlog = {
      title: 'Coronavirus: Why You Must Act Now',
      author: 'Tomas Pueyo',
      url: 'https://medium.com/@tomaspueyo/coronavirus-act-today-or-people-will-die-f4d3d9cd99ca',
      likes: 7
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', authorization)
      .expect(201)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBLogs.length + 1)

    const titles = blogsInDb.map(b => b.title)
    expect(titles).toContain(newBlog.title)
  })

  test('adding new blog post fails if token is missing ', async () => {
    const newBlog = {
      title: 'Coronavirus: Why You Must Act Now',
      author: 'Tomas Pueyo',
      url: 'https://medium.com/@tomaspueyo/coronavirus-act-today-or-people-will-die-f4d3d9cd99ca',
      likes: 7
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', '')
      .expect(401)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBLogs.length)

    const titles = blogsInDb.map(b => b.title)
    expect(titles).not.toContain(newBlog.title)
  })

  test('if the likes property is missing, it will default to 0.', async () => {
    const newBlog = {
      title: 'Coronavirus: Why You Must Act Now',
      author: 'Tomas Pueyo',
      url: 'https://medium.com/@tomaspueyo/coronavirus-act-today-or-people-will-die-f4d3d9cd99ca',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', authorization)
      .expect(201)
      .send(newBlog)
      .expect(201)

    const AddedBlog = await Blog.findOne({ title: newBlog.title })
    expect(AddedBlog.likes).toBe(0)
  })

  test('Fails with statuscode 400 if title and url are missing', async () => {
    const missingTitle = {
      author: 'Tomas Pueyo',
      url: 'https://medium.com/@tomaspueyo/coronavirus-act-today-or-people-will-die-f4d3d9cd99ca'
    }
    const missingUrl = {
      title: 'Coronavirus: Why You Must Act Now',
      author: 'Tomas Pueyo'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', authorization)
      .send(missingTitle)
      .expect(400)

    await api
      .post('/api/blogs')
      .set('Authorization', authorization)
      .send(missingUrl)
      .expect(400)
  })
})

describe('Deletion of a blog', () => {
  test('succeeds with status code 204', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', authorization)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect (blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect (titles).not.toContain(blogToDelete.title)
  })
})

describe('Updating a blog', () => {
  test('Blog succefully updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 8 })

    const returnedBlog = await Blog.findById(blogToUpdate.id)
    expect (returnedBlog.likes).toBe(blogToUpdate.likes + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})