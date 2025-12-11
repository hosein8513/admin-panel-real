import httpservice from "./httpservice"

export const loginservice = (value)=>{
    return httpservice('/auth/login','post',{
        ...value,
        remember:value.remember?1:0
       })
}

export const logoutservice = ()=>{
    return httpservice('/auth/logout','get')
} 

export const getuserservice = ()=>{
    return httpservice('/auth/user','get')
}