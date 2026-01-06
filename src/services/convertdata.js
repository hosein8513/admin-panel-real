export const converttoFormadata = (data)=>{
    const formdata = new FormData()
    for(const key in data){
        formdata.append(key,data[key])
    }
return formdata
}