import { getuserservice } from "../../src/services/auth"
import { RECEIVE_USER_ERROR, RECEIVE_USER_RESPONSE, SEND_USER_REQUEST } from "./types"

export const sendUserRequest = ()=>{
    return{
        type:SEND_USER_REQUEST
    }
}

export const reciveUserResponse = (data)=>{
    return{
        type:RECEIVE_USER_RESPONSE,
        payload:data
    }
}

export const reciveUserError = (error) => {
    return {
        type:RECEIVE_USER_ERROR,
        payload:error
    }
}

export const getUserAction = ()=>{
    return (dispatch)=>{
        dispatch(sendUserRequest())
        getuserservice().then(res=>{
            dispatch(reciveUserResponse(res.data.roles))
        }).catch(error=>{
            dispatch(reciveUserError(error.message))
        })
    }
}