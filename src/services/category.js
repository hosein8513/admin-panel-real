import httpservice from "./httpservice"

export const getcategoryservice = (id=null)=>{
return httpservice(`/admin/categories${id?`?parent=${id}`:''}`,'get')
}

export const getSingleCategory = (id)=>{
    return httpservice(`/admin/categories/${id}`,'get')
}

export const createNewCategory = (data)=>{
    if(data.image){
        let formdata = new FormData()
        formdata.append('parent_id',data.parent_id)
        formdata.append('title',data.title)
        formdata.append('description',data.description)
        formdata.append('image',data.image)
        formdata.append('is_active',data.is_active)
        formdata.append('show_in_menu',data.show_in_menu)
    }
    return httpservice('/admin/categories','post',data)
}


export const editCategory = (id,data)=>{
    return httpservice(`/admin/categories/${id}`,'put',data)
}