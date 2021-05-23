import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return  response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const like = async (blog) => {
  const likedBlog = {
    user: blog.user.id,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, likedBlog)
  return response.data
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

const comment = async (blog, comment) => {
  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, comment)
  return response.data
}

export default { getAll, create, setToken, like, remove, comment }