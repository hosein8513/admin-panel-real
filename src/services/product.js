import { converttoFormadata } from "./convertdata"
import httpservice from "./httpservice"

export const getProduct = (page,countOnPage,searchChar)=>{
    return httpservice(`/admin/products?page=${page}&count=${countOnPage}&searchChar=${searchChar}`,'get')
}






export const createProduct = (data)=>{
  return httpservice('/admin/products','post',data.image?converttoFormadata(data):data)
}


export const editProduct = (id,data)=>{
return httpservice(`/admin/products/${id}`,'put',data)
}



export const deleteProduct = (productId)=>{
  return httpservice(`/admin/products/${productId}`, "delete");
}