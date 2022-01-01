

import { Action } from "./actionCreatorType"
import actionTypes from "./actionType"
import { Dispatch } from "redux"

import axios from "axios"
import communicate from "../../model/model"

export const getUserSocials=(users:communicate[]):Action=>{
    return{
      type:actionTypes.GET_USER_CONTACTS,
      payload:users
    }
}
export const failedGetUserSocials=():Action=>{
    return{
      type:actionTypes.FAILED,
    
    }
}

export const requestSocials=():Action=>{
    return{
      type:actionTypes.LOADING,
    
    }
}
export const socialDeleted=():Action=>{
  return{
    type:actionTypes.DELETE_SOCIAL
  
  }
}
export const socialAdded=():Action=>{
  return{
    type:actionTypes.ADD_USER_CONTACTS,
  
  }
}
export const singleSocial=(social:communicate):Action=>{
  return{
    type:actionTypes.SINGLE_SOCIAL,
    payload:social
  }
}
export const getUserContacts=()=>{
    return async(dispatch:Dispatch)=>{
     try {
         dispatch(requestSocials())
         const {data}=await axios.get("http://localhost:4000/socials")
         dispatch(getUserSocials(data))
     } catch (error) {
         dispatch(failedGetUserSocials())
     }
    }
}

export const deleteSocialAction=(id:string)=>{
  return async(dispatch:Dispatch)=>{
   try {
       dispatch(requestSocials())
       await axios.delete(`http://localhost:4000/socials/${id}`)
      dispatch(socialDeleted())
      dispatch<any>(getUserContacts())
   } catch (error) {
       dispatch(failedGetUserSocials())
   }
  }
}

export const addNewSocial=(contact:communicate)=>{
  return async(dispatch:Dispatch)=>{
   try {
       dispatch(requestSocials())
       await axios.post(`http://localhost:4000/socials`,contact)
      dispatch(socialAdded())
      dispatch<any>(getUserContacts())
   } catch (error) {
       dispatch(failedGetUserSocials())
   }
  }
}

export const getSingleSocial=(id:string)=>{
  return async(dispatch:Dispatch)=>{
   try {
       dispatch(requestSocials())
      const {data} = await axios.get(`http://localhost:4000/socials/${id}`)
      dispatch(singleSocial(data))
      
   } catch (error) {
       dispatch(failedGetUserSocials())
   }
  }
}

