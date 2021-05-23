const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  { _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  { _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  { _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 0,
    __v: 0
  },
  { _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 2,
    __v: 0
  },
  { _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    const emptyList = []
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const singleElementList = blogs.slice(0,1)
    const result = listHelper.totalLikes(singleElementList)
    expect(result).toBe(7)
  })

  test('of a bigger list is calculated right', () => {
    const fullList = blogs.slice()
    const result = listHelper.totalLikes(fullList)
    expect(result).toBe(28)
  })
})

describe('favorite blog', () => {
  test('of non empty list is calculated right', () => {
    const fullList = blogs.slice()
    const result = listHelper.favoriteBlog(fullList)
    expect(result).toEqual(
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12
      }
    )
  })

  test('of empty list is null', () => {
    const emptyList = []
    const result = listHelper.favoriteBlog(emptyList)
    expect(result).toBe(null)
  })

  test('of list with single blog is that single blog', () => {
    const singleElementList = blogs.slice(0,1)
    const result = listHelper.favoriteBlog(singleElementList)
    expect(result).toEqual(
      {
        title: 'React patterns',
        author: 'Michael Chan',
        likes: 7
      },
    )
  })
  test('where list includes multiple favorites is one of them', () => {
    const multipleFavList = blogs.slice(3,6)
    const result = listHelper.favoriteBlog(multipleFavList)
    expect(result).toEqual(
      { title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        likes: 2,
      })
  })

})

describe('most blogs', () => {

  test('of empty list is null', () => {
    const emptyList = []
    const result = listHelper.mostBlogs(emptyList)
    expect(result).toBe(null)
  })

  test('when list has only one blog equals the author of that', () => {
    const singleElementList = blogs.slice(0,1)
    const result = listHelper.mostBlogs(singleElementList)
    expect(result).toEqual(
      {
        author: 'Michael Chan',
        blogs: 1
      }
    )
  })

  test('of a bigger list is calculated right', () => {
    const fullList = blogs.slice()
    const result = listHelper.mostBlogs(fullList)
    expect(result).toEqual(
      {
        author: 'Robert C. Martin',
        blogs: 3
      }
    )
  })
})

describe('most likes', () => {

  test('of empty list is null', () => {
    const emptyList = []
    const result = listHelper.mostLikes(emptyList)
    expect(result).toBe(null)
  })

  test('when list has only one blog equals the author of that', () => {
    const singleElementList = blogs.slice(0,1)
    const result = listHelper.mostLikes(singleElementList)
    expect(result).toEqual(
      {
        author: 'Michael Chan',
        likes: 7
      }
    )
  })

  test('of a bigger list is calculated right', () => {
    const fullList = blogs.slice()
    const result = listHelper.mostLikes(fullList)
    expect(result).toEqual(
      {
        author: 'Edsger W. Dijkstra',
        likes: 17
      }
    )
  })
})
