import { converttoFormadata } from "./convertdata"
import httpservice from "./httpservice"

export const getProduct = (page,countOnPage,searchChar)=>{
    return httpservice(`/admin/products?page=${page}&count=${countOnPage}&searchChar=${searchChar}`,'get')
}

export const getAllProductTitles = ()=>{
  return httpservice('/admin/products/all_titles','get')
}

export const addProductAttr = (productId,data)=>{
    return httpservice(`/admin/products/${productId}/add_attr`,'post',data)

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



export const addproductImage = (id,data)=>{
  return httpservice(`/admin/products/${id}/add_image`,'post',data)
}
export const setMainProductImage = (imageId)=>{
  return httpservice(`/admin/products/gallery/set_main/${imageId}`, 'get')
}

export const deleteProductImage = (imageId)=>{
  return httpservice(`/admin/products/gallery/${imageId}`, 'delete')
}