import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../../pages/auth/Login';

const Authlayout = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-indigo-200 p-6" dir="rtl">
            
            <Routes>
                <Route path='/login' element={<Login/>} />

            </Routes>




        </div>
    );
};

export default Authlayout;