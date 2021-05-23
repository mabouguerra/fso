import blogServices from '../services/blogs'


export const InitializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogServices.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    const addedBlog = await blogServices.create(blog)
    dispatch({
      type: 'ADD',
      data: addedBlog
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogServices.remove(blog)
    dispatch({
      type: 'REMOVE',
      data: blog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const likedBlog = await blogServices.like(blog)
    dispatch({
      type: 'LIKE',
      data: likedBlog
    })
  }
}

export const commentBlog = (blog, comment) => {
  return async dispatch => {
    const commentedBLog = await blogServices.comment(blog, { comment })
    dispatch({
      type: 'COMMENT',
      data: commentedBLog
    })
  }
}

const blogReducer = (state = [], action) => {

  switch(action.type) {
    case 'INIT':
    return action.data
    case 'ADD':
    return [...state, action.data]
    case 'REMOVE':
      return state.filter(b => b.id !== action.data.id)
    case 'LIKE':
      return state.map(b => b.id === action.data.id ? action.data : b)
    case 'COMMENT':
      return state.map(b => b.id === action.data.id ? action.data : b)
  }
  return state
}

export default blogReducer
