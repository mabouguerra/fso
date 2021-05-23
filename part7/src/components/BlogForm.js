import React, { useState } from 'react'
import PropTypes from 'prop-types'
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
}))

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const classes = useStyles()

  const handleCreate = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Container maxWidth='xs'>
      <form onSubmit={handleCreate}>
        <Typography component='h1' variant='h6'>create new</Typography>
        <TextField
          variant='outlined'
          label='title'
          margin='dense'
          id='title' 
          type='text' 
          value={title} 
          name='Title' 
          onChange={({ target }) => setTitle(target.value)}
          fullWidth
        />       
        <TextField
          variant='outlined'
          label='author'
          margin='dense'
          id='author' 
          type='text' 
          value={author} 
          name='Author' 
          onChange={({ target }) => setAuthor(target.value)}
          fullWidth
        />
        <TextField
          variant='outlined'
          label='url'
          margin='dense'
          id='url' 
          type='text' 
          value={url} 
          name='Url' 
          onChange={({ target }) => setUrl(target.value)}
          fullWidth
        />
      <Button 
        className={classes.submit} 
        id='create-button' 
        type='submit'
        variant='contained'
        color='primary'
        fullWidth
      >
        create
      </Button>
    </form>  
  </Container>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired  
}

export default BlogForm
