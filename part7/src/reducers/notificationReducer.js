let timeoutID


export const setNotification = (message, type='success') => {
  return async dispatch => {
    dispatch({
      type: 'SET',
      data: { message, type }  
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(dispatch, 5000, {type: 'CLEAR'})
  }
}

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET':
      return action.data
    case 'CLEAR':
      return null
  }
  return state
}

export default notificationReducer