import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import { useParams, useHistory } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'

const BlogDetail = () => {
  const [comment, setComment] = useState('')
  const id = useParams().id
  const history = useHistory()

  const blog = useSelector(({ blogs }) => blogs.find(b => b.id === id))
  const dispatch = useDispatch()

  const handleLike = async () => {
    try {
      dispatch(likeBlog(blog))
    }
    catch(exception) {
      dispatch(setNotification(exception.response.data.error, 'error'))
    }
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(removeBlog(blog))
        history.push('/')
        dispatch(setNotification(`removed ${blog.title}`))  
      }
      catch(exception) {
        dispatch(setNotification(exception.response.data.error, 'error'))
      }
    }
  }
  
  const handleComment = async (event) => {
    event.preventDefault()
    try {
      dispatch(commentBlog(blog, comment))
      setComment('')
    }
    catch(exception) {
      dispatch(setNotification(exception.response.data.error, 'error'))
    }
  }

  if (!blog) {
    return null
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>{blog.likes} likes <button onClick={() => handleLike()}>like</button></div>
      <div>added by {blog.user.name}</div>
      <div><button onClick={() => handleRemove()}>remove</button></div>
      <form onSubmit={handleComment}>
        <input 
          type='text' 
          value ={comment} 
          onChange={({ target }) => setComment(target.value)}
        />
        <button type='submit'>add comment</button>
      </form>
      <div>
        <h3>comments</h3>
        <ul>
          {blog.comments.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default BlogDetail

