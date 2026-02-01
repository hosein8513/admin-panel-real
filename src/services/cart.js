import httpService from "./httpservice"

export const getCarts = (page,pageCount,searchChar)=>{
    return httpService(`/admin/carts?page=${page}&count=${pageCount}&searchChar=${searchChar}`,'get')
}

export const addCart = (data)=>{
    return httpService('/admin/carts','post',data)
}

export const getSingleCart = (id)=>{
    return httpService(`/admin/carts/${id}`,'get')
}

export const deleteCart = (id)=>{
    return httpService(`/admin/carts/${id}`,'delete')
}

export const editCart = (id,data)=>{
    return httpService(`/admin/carts/${id}`,'put',data)
}