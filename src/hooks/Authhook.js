import axios from "axios"
import { useEffect, useState } from "react"

export const useIslogin = ()=>{
     const [loading,setloading] = useState(true)
  const [login,setlogin] = useState(false)
  useEffect(()=>{
    const logintoken = JSON.parse(localStorage.getItem('localtoken'))
    if(logintoken){
      axios.get('https://ecomadminapi.azhadev.ir/api/auth/user',{
        headers:{
          'Authorization' :`Bearer ${logintoken.token}`
        }
      }).then(res=>{
        setlogin(res.status == 200 ?true:false)
        setloading(false)
      }).catch(e=>{
        localStorage.removeItem('localtoken')
        setlogin(false)
        setloading(false)
      })
    }else{
      setlogin(false)
      setloading(false)
    }
  },[])

  return [loading,login]
}