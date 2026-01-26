import httpservice from "./httpservice"

export const getDiscount = ()=>{
    return httpservice('/admin/discounts','get')
}

export const addNewDiscount = (data)=>{
    return httpservice('/admin/discounts','post',data)
}