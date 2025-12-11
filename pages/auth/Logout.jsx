import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Alert } from '../../utills/Alert';
import { logoutservice } from '../../src/services/auth';

const Logout = () => {
  const [loading, setloading] = useState(true)
  const handlelogout = async () => {
    try {
      const res = await logoutservice()
      if (res.status == 200) {
        localStorage.removeItem('localtoken')
      } else {
        Alert(res.data.message, "متاسفیم")
      }
      setloading(false)
    } catch (error) {
      setloading(false)
      Alert("لطفا اتصال خود را بررسی کنید", "خطا")
    }
  }
  useEffect(() => {

  handlelogout()

    }, [])
return (
  <>
    {loading ? (
      <h1 className='text-gray-600 text-2xl p-4 animate-pulse'>لطفا صبر کنید</h1>
    ) : (
      <Navigate to={'/auth/login'} />
    )}
  </>
);
};

export default Logout;