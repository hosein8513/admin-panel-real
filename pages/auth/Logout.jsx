import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Alert } from '../../utills/Alert';

const Logout = () => {
    const [loading,setloading]=useState(true)
     const logintoken = JSON.parse(localStorage.getItem('localtoken'))
    useEffect(()=>{
axios.get('https://ecomadminapi.azhadev.ir/api/auth/logout',{
    headers:{
        'Authorization':`Bearer ${logintoken.token}`
    }
}).then(res=>{
   if(res.status == 200){
     localStorage.removeItem('localtoken')
    setloading(false)
   }else{
    Alert(res.data.message,"متاسفیم")
   }
}).catch(error=>{
setloading(false)
Alert("لطفا اتصال خود را بررسی کنید","خطا")
})

    },[])
    return (
        <>
          {loading?(
            <h1 className='text-gray-600 text-2xl p-4 animate-pulse'>لطفا صبر کنید</h1>
          ):(
            <Navigate to={'/auth/login'}/>
          )}  
        </>
    );
};

export default Logout;