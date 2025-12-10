import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../../pages/auth/Login';
import { useIslogin } from '../../src/hooks/Authhook';

const Authlayout = () => {
    const [loading, login] = useIslogin()

    return (
        <>
            {
                loading ? (
                    <h1 className=' text-center text-gray-600 animate-pulse' > لطفا صبر کنید...</h1>
                ) : !login ? (
                    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-indigo-200 p-6" dir="rtl">
                        <Routes>
                            <Route path='/auth/login' element={<Login />} />
                        </Routes>
                    </div>
                ) : (
                    <Navigate to={'/'} />
                )
            }
        </>
    );
};

export default Authlayout;