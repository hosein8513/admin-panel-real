import httpservice from "./httpservice"

export const getCategoryAtr = (id) => {
return httpservice(`/admin/categories/${id}/attributes`,'get')
}

export const addCtegoryAtr = (id,data) =>{
    return httpservice(`/admin/categories/${id}/attributes`,'post',data)
}

export const editCategoryAtr = (id,data)=>{
    return httpservice(`/admin/categories/attributes/${id}`,'put',data)
}

export const deleteCategoryAtr = (id)=>{
    return httpservice(`/admin/categories/attributes/${id}`,'delete')
}