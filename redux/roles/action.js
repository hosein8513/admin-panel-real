import { getuserservice } from "../../src/services/auth"
import { getUsers } from "../../src/services/users"
import { RECEIVE_ROLES_ERROR, RECEIVE_ROLES_RESPONSE, SEND_ROLES_REQUEST } from "./types"

export const sendRolesRequest = ()=>{
    return{
        type:SEND_ROLES_REQUEST
    }
}

export const reciveRolesResponse = (data)=>{
    return{
        type:RECEIVE_ROLES_RESPONSE,
        payload:data
    }
}

export const reciveRolesError = (error) => {
    return {
        type:RECEIVE_ROLES_ERROR,
        payload:error
    }
}

export const getRolesAction = ()=>{
    return (dispatch)=>{
        dispatch(sendRolesRequest())
        getuserservice().then(res=>{
            dispatch(reciveRolesResponse(res.data.roles))
        }).catch(error=>{
            dispatch(reciveRolesError(error.message))
        })
    }
}