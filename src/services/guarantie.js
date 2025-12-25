import httpservice from "./httpservice"

export const getGuarantie = ()=>{
     return httpservice('/admin/guarantees','get')
}

export const addNewGuarantie = (data) =>{
    if(data.title){
        let formdata = new FormData()
        formdata.append('title',data.title)
        formdata.append('descriptions',data.descriptions)
        formdata.append('length',data.length)
        data=formdata
    }
    return httpservice('/admin/guarantees','post',data)
}

export const editGuaraties = (id,data) =>{
    return httpservice(`/admin/guarantees/${id}`,'put',data)
}

export const deleteGuarantie = (id)=>{
    return httpservice(`/admin/guarantees/${id}`,'delete')
}