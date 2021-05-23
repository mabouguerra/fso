import React from 'react'
import { useSelector } from 'react-redux'
import { Container } from '@material-ui/core'

import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => blogs.sort((a, b) => a.likes > b.likes ? -1 : 1))
  
  return (
    <Container maxWidth='sm'>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </Container>
  )
}

export default BlogList