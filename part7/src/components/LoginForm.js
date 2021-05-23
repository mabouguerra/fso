import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginServices from '../services/login'
import blogServices from '../services/blogs'
import { loginUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, Typography, Container } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginServices.login({ username, password })
      window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(user))
      blogServices.setToken(user.token)  
      dispatch(loginUser(user))
      setUserName('')
      setPassword('')
    }
    catch(exception) {
      console.log(exception)
      dispatch(setNotification(exception.response.data.error, 'error'))
    }
  }

  return (
    <Container maxWidth='xs'>
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleLogin}>
          <TextField
            variant='outlined'
            label='username'
            margin='normal'
            required
            fullWidth
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUserName(target.value)}
          /> 
          <TextField
            variant='outlined'
            label='password'
            margin='normal'
            required     
            fullWidth
            id ='password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          /> 
          <Button
            className={classes.submit}
            id='login-button'
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
          >
            Sign in
          </Button>        
        </form>
      </div>
    </Container>
  )
}

export default LoginForm

