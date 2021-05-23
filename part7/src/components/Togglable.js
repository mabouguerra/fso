import React, { useState, useImperativeHandle } from 'react'
import { TextField, Button, Typography, Container } from '@material-ui/core'


const Togglable = React.forwardRef((props, ref) => {
const [visible, setVisible] = useState(false)

const showWhenVisible = {display: visible ? '' : 'none' }
const hideWhenVisible = {display: visible ? 'none' : ''}

const toggleVisibilty = () => {
  setVisible(!visible)
}

useImperativeHandle(ref, () => {
  return {
    toggleVisibilty
  }
})

return (
  <Container maxWidth='sm'>
    <div style={hideWhenVisible}>
      <Button variant='contained' onClick={toggleVisibilty}>{props.buttonLabel}</Button>
    </div>
    <div style={showWhenVisible}>
      {props.children}
      <Button variant='contained' onClick={toggleVisibilty}>cancel</Button>
    </div>
  </Container>
  )
})

export default Togglable
