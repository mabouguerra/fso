
import userServices from '../services/users'

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userServices.getAll()
    dispatch({
      type: 'INITUSERS',
      data: users
    })
  }
}

const userReducer = (state = [], action) =>{
  switch(action.type) {
    case 'INITUSERS':
      return action.data
  }
  return state
}

export default userReducer