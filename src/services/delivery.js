import httpService from "./httpservice"

export const getDeliveries = ()=>{
    return httpService('/admin/deliveries','get')
}

export const getOneDelivery = (id)=>{
return httpService(`/admin/deliveries/${id}`,'get')
}

export const addNewDelivery = (data)=>{
    return httpService('/admin/deliveries','post',data)
}

export const deleteDelivery = (id)=>{
    return httpService(`/admin/deliveries/${id}`,'delete')
}

export const editDelivery = (id,data)=>{
    return httpService(`/admin/deliveries/${id}`,'put',data)
}