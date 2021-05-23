import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { logoutUser } from '../reducers/loginReducer'

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  grow: { flexGrow: 1
  },
  title: { marginRight: theme.spacing(2)
  },
  signOut: { marginLeft: theme.spacing(2)

  }
}
))

const Nav = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ loggedIn }) => loggedIn)
  const classes = useStyles()
  const handleLogut = () => {
    window.localStorage.removeItem('loggedBlogsAppUser')
    dispatch(logoutUser())
    blogService.setToken(null)
  }

  if (!user) {
    return null
  }
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>Blogs App</Typography>
        <div className={classes.grow}>    
          <Button color="inherit" component={Link} to={'/'}>blogs</Button>
          <Button color="inherit" component={Link} to={'/users'} className={classes.title}>users</Button>
        </div>
        <Typography>{user.name}</Typography>
        <Button className={classes.signOut} color='inherit' onClick={handleLogut}>Sign out</Button>
      </Toolbar>
    </AppBar>
  )}

  export default Nav