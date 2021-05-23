
export const loginUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'LOGIN',
      data: user
    })    
  }
}

export const logoutUser = () => {
  return {
    type: 'LOGOUT'
  }
} 

const userReducer = (state = null, action) =>{
  switch(action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
  }
  return state
}




export default userReducer