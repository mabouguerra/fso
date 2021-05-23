import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { setNotification } from './reducers/notificationReducer'
import { InitializeBlogs, addBlog } from './reducers/blogReducer'
import { loginUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
a
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import UserList from './components/UserList'
import User from './components/User'
import BlogDetail from './components/BlogDetail'
import Nav from './components/Nav'

import blogService from './services/blogs'

import './index.css'

import { Container } from '@material-ui/core'




const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ loggedIn }) => loggedIn)

  useEffect(() => {
    dispatch(InitializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loginUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  
  const createBlog = async (blog) => {
    blogFormRef.current.toggleVisibilty()
    try {      
      dispatch(addBlog(blog))   
      dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} added`))
    }
    catch(exception) {
      dispatch(setNotification(exception.response.data.error, "error"))
    }
  }

  const blogFormRef = React.createRef()

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
      )}
  return (
    <div>
      <Router>
        <Nav />
        <Notification />
        <Switch>
          <Route path='/users/:id'>
            <User />          
          </Route>
          <Route path='/blogs/:id'>
            <BlogDetail />
          </Route>
          <Route path='/users'>
            <UserList />      
          </Route>        
          <Route path='/'>
            <BlogList />
            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
              <BlogForm createBlog={createBlog} />
            </Togglable>
          </Route>        
        </Switch>
    </Router>
    </div>

  )
}

export default App