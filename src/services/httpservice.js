import axios from "axios"
import config from './config.json'
import {
    Alert
} from "../../utills/Alert"


axios.interceptors.response.use((res) => {
    if(res.status !=200 && res.status != 201){    Alert(res.data.message, "مشکلی رخ داده")
}
    return res
}, (error) => {
    Alert(` ${error.response.status}لطفا اتصال خود را بررسی کنید`, "خطا")
    return Promise.reject(error)
})



const httpservice = (url, method, data = null) => {
    const tokeninfo = JSON.parse(localStorage.getItem('localtoken'))
    return axios({
        url: config.onlineapi + url,
        method,
        data,
        headers: {
            Authorization: tokeninfo ? `Bearer ${tokeninfo.token}` : null,
            "Content-Type": "application/json"
        }
    })
}
export default httpservice