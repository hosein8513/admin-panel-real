import axios from "axios"
import config from './config.json'
import {
    Alert
} from "../../utills/Alert"

export const apiPath = config.onlineapi

axios.interceptors.response.use((res) => {
    if(res.status !=200 && res.status != 201){   
        if(typeof(res.data)=='object'){
            let message = ''
            for(const key in res.data){
                message=message + `${key} :${res.data.key}`
            }
            res.data.message = message
        }
        
        Alert(res.data.message, "مشکلی رخ داده")
}
    return res
}, (error) => {
    Alert(` ${error.response.status}لطفا اتصال خود را بررسی کنید`, "خطا")
    return Promise.reject(error)
})



const httpservice = (url, method, data = null) => {
    const tokeninfo = JSON.parse(localStorage.getItem('localtoken'))
    return axios({
        url: apiPath+'/api'+ url,
        method,
        data,
        headers: {
            Authorization: tokeninfo ? `Bearer ${tokeninfo.token}` : null,
            "Content-Type": "application/json"
        }
    })
}
export default httpservice