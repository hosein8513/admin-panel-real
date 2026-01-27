import httpService from "./httpservice"

export const getPermitions = ()=>{
    return httpService('/admin/permissions','get')
}

export const getRoles = ()=>{
    return httpService('/admin/roles','get')
}

export const deleteRoles = (id)=>{
    return httpService(`/admin/roles/${id}`,'delete')
}

export const addRole = (data)=>{
    return httpService(`/admin/roles`,'post',data)
}