import React from 'react';
import { useNavigate } from 'react-router-dom';

const Backbutton = () => {
    const navigate = useNavigate()
    return (
        <div>
               <button type='button' className='w-[70px] h-[30px] rounded-lg bg-gray-500 text-white text-center radius-3' onClick={()=>navigate(-1)}>بازگشت</button>
        </div>
    );
};

export default Backbutton;