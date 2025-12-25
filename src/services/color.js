import httpservice from "./httpservice"

export const getColor = ()=>{
     return httpservice('/admin/colors','get')
}

export const addNewColor = (data) =>{
    if(data.title){
        let formdata = new FormData()
       formdata.append('title',data.title)
       formdata.append('code',data.code)
        data=formdata
    }
    return httpservice('/admin/colors','post',data)
}

export const editColors = (id,data) =>{
    return httpservice(`/admin/colors/${id}`,'put',data)
}

export const deleteColor = (id)=>{
    return httpservice(`/admin/colors/${id}`,'delete')
}