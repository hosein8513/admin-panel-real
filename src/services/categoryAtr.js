import httpservice from "./httpservice"

export const getCategoryAtr = (id) => {
return httpservice(`/admin/categories/${id}/attributes`,'get')
}

export const addCtegoryAtr = (id,data) =>{
    return httpservice(`/admin/categories/${id}/attributes`,'post',data)
}