import httpservice from "./httpservice"

export const getcategoryservice = (id=null)=>{
return httpservice(`/admin/categories${id?`?parent${id}`:''}`,'get')
}