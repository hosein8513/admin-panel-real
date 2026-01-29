import { ContextWatchdog } from "ckeditor5"
import httpService from "./httpservice"

export const getPermitions = () => {
    return httpService('/admin/permissions', 'get')
}

export const getRoles = () => {
    return httpService('/admin/roles', 'get')
}

export const deleteRoles = (id) => {
    return httpService(`/admin/roles/${id}`, 'delete')
}

export const addRole = (data) => {
    return httpService(`/admin/roles`, 'post', data)
}

export const getSingleRole = (id) => {
    return httpService(`/admin/roles/${id}`, 'get')
}

export const editRoleService = (id, data) => {
    return httpService(`/admin/roles/${id}`, 'put', data)
}

export const editRolePermitions = (id, data) => {
    return httpService(`/admin/roles/${id}/permissions`, 'put', data)
}

// export const getAllUsers = () =>{
//     return httpService('/admin/users','get')
// }

export const getUsers = (page,countofpage,search)=>{
    return httpService(`/admin/users?page=${page}&count=${countofpage}&searchChar=${search}`,'get')
}

export const deleteUsers = (id) =>{
    return httpService(`/admin/users/${id}`,'delete')
}

export const getSingleUser = (id)=>{
    return httpService(`/admin/users/${id}`,'get')
}

export const addUser=(data)=>{
    return httpService('/admin/users','post',data)
}

export const editUsers = (id,data)=>{
    return httpService(`/admin/users/${id}`,'put',data)
}