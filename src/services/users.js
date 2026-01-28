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