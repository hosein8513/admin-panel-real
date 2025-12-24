import httpservice from "./httpservice"

export const getAllBrands = () =>{
    return httpservice('/admin/brands','get')
}


export const addNewBrand = (data) =>{
    if(data.logo){
        let formdata = new FormData()
        formdata.append('original_name',data.original_name)
        formdata.append('persian_name',data.persian_name)
        formdata.append('descriptions',data.descriptions)
        formdata.append('logo',data.logo)
        data=formdata
    }
    return httpservice('/admin/brands','post',data)
}

export const editBrands = (id,data)=>{
     if(data.logo){
        let formdata = new FormData()
        formdata.append('original_name',data.original_name)
        formdata.append('persian_name',data.persian_name)
        formdata.append('descriptions',data.descriptions)
        formdata.append('logo',data.logo)
        data=formdata
    }
    return httpservice(`/admin/brands/${id}`,'post',data)
}

export const deleteBrand = (id)=>{
    return httpservice(`/admin/brands/${id}`,'delete')
}