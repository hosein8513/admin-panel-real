import httpService from "./httpservice"

export const getOrders = (page,countOnPage,searchChar)=>{
    return httpService(`/admin/orders?page=${page}&count=${countOnPage}&searchChar=${searchChar}`,'get')
}

export const addOrder = (data)=>{
    return httpService('/admin/orders','post',data)
}

export const getSingleOrder = (id)=>{
    return httpService(`/admin/orders/${id}`,'get')
}

export const editOrder = (id,data)=>{
    return httpService(`/admin/orders/${id}`,'put',data)
}

export const deleteOrder = (id)=>{
    return httpService(`/admin/orders/${id},'delete`)
}

export const getOrdersStatistics = ()=>{
    return httpService('/admin/orders/order_statistics','get')
}

export const getThisYearOrders = ()=>{
    return httpService('/admin/orders/this_year_orders','get')
}