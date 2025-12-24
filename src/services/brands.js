import httpservice from "./httpservice"

export const getAllBrands = () =>{
    return httpservice('/admin/brands','get')
}


export const addNewBrand = (data) =>{
    if(data.logo){
        let formdata = new FormData()
        formdata.append('persian_name',data.persian_name)
        formdata.append('descriptions',data.descriptions)
        formdata.append('logo',data.logo)
        data=formdata
    }
    return httpservice('/admin/brands','post',data)
}