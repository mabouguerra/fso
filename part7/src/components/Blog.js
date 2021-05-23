import React from 'react'
import {Link } from 'react-router-dom'
import { Paper, Typography, Link as Anchor } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  blog: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    height: theme.spacing(3),
    alignItems: 'center'
  }
}))

const Blog = ({ blog }) => {

  const classes = useStyles()

  return (
    <Paper  className={classes.blog}>
      <Typography>

      </Typography>
          <Anchor component={Link} to={`/blogs/${blog.id}`}>{blog.title}</Anchor>    
    </Paper>
    )
  }

export default Blog
