

import { Action } from "./actionCreatorType"
import actionTypes from "./actionType"
import { Dispatch } from "redux"

import axios from "axios"
import communicate from "../../model/model"

export const getUsers=(users:communicate[]):Action=>{
    return{
      type:actionTypes.GET_USER_CONTACTS,
      payload:users
    }
}
export const failedgetUser=():Action=>{
    return{
      type:actionTypes.FAILED,
    
    }
}

export const requestgetUser=():Action=>{
    return{
      type:actionTypes.LOADING,
    
    }
}
// export const userDeleted=():Action=>{
//   return{
//     type:actionTypes.DELETE_USER,
  
//   }
// }
// export const userAdded=():Action=>{
//   return{
//     type:actionTypes.ADD_USER,
  
//   }
// }
export const getUserContacts=()=>{
    return async(dispatch:Dispatch)=>{
     try {
         dispatch(requestgetUser())
         const {data}=await axios.get("http://localhost:4000/users")
         dispatch(getUsers(data))
     } catch (error) {
         dispatch(failedgetUser())
     }
    }
}

// export const deleteUserAction=(id:number)=>{
//   return async(dispatch:Dispatch)=>{
//    try {
//        dispatch(requestgetUser())
//        await axios.delete(`http://localhost:4000/users/${id}`)
//       dispatch(userDeleted())
//       dispatch<any>(getUserAction())
//    } catch (error) {
//        dispatch(failedgetUser())
//    }
//   }
// }

// export const addNewUserAction=(user:user)=>{
//   return async(dispatch:Dispatch)=>{
//    try {
//        dispatch(requestgetUser())
//        await axios.post(`http://localhost:4000/users`,user)
//       dispatch(userAdded())
//       dispatch<any>(getUserAction())
//    } catch (error) {
//        dispatch(failedgetUser())
//    }
//   }
// }

