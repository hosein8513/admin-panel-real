import httpservice from "./httpservice"

export const getProduct = (page,countOnPage,searchChar)=>{
    return httpservice(`/admin/products?page=${page}&count=${countOnPage}&searchChar=${searchChar}`,'get')
}









export const deleteProduct = (productId)=>{
  return httpservice(`/admin/products/${productId}`, "delete");
}