import httpservice from "./httpservice"

export const getDiscount = ()=>{
    return httpservice('/admin/discounts','get')
}

export const addNewDiscount = (data)=>{
    return httpservice('/admin/discounts','post',data)
}

export const editDiscount = (id,data)=>{
    return httpservice(`/admin/discounts/${id}`,'put',data)
}

export const deleteDiscount = (id)=>{
    return httpservice(`/admin/discounts/${id}`,'delete')
}