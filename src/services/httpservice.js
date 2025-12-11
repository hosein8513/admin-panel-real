import axios from "axios"
import config from './config.json'
const httpservice = (url,method,params=null)=>{
    const tokeninfo = JSON.parse(localStorage.getItem('localtoken'))
    return axios({
        url:config.onlineapi+url,
        method,
        params,
        headers:{
            Authorization: tokeninfo?`Bearer ${tokeninfo.token}`:null,
            "Content-Type" : "application/json"
        }
    })
}
export default httpservice