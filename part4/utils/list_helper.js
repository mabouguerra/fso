// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (list) => {
  return list.reduce((sum, list) => {
    return list.likes + sum
  } ,0)
}

const favoriteBlog = (list) => {
  const result = list.sort((a, b) => (a.likes > b.likes) ? -1 : 1)
  return list.length === 0
    ? null
    : {
      title: result[0].title,
      author: result[0].author,
      likes: result[0].likes
    }
}

const mostBlogs = (list) => {
  if (list.length === 0) {
    return null
  }
  const count = list.reduce((acc, cur) => {
    return acc[cur.author]
      ? { ...acc, [cur.author] : acc[cur.author] + 1 }
      : { ...acc, [cur.author] : 1 }
  }
  , {})
  const author = Object.keys(count).reduce((acc, cur) =>  count[acc] > count[cur] ? acc : cur)
  return {
    author: author,
    blogs: count[author]
  }
}

const mostLikes = (list) => {
  if (list.length === 0) {
    return null
  }
  const count = list.reduce((acc, cur) => {
    return acc[cur.author]
      ? { ...acc, [cur.author] : acc[cur.author] + cur.likes }
      : { ...acc, [cur.author] : cur.likes }
  }
  , {})
  const author = Object.keys(count).reduce((acc, cur) =>  count[acc] > count[cur] ? acc : cur)
  return {
    author: author,
    likes: count[author]
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}