import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    marginTop: theme.spacing(2),
    margin: 'auto',
  }
}))

const Notification = () => {
  const classes = useStyles()
  const notification = useSelector(({ notification }) => notification)
  if (notification) {
    return (
      <div className={classes.root}>
      <Alert severity={notification.type}>{notification.message}</Alert>
      </div>
    )}
  return null
  }


export default Notification