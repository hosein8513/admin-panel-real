import React from 'react';
import { useLocation } from 'react-router-dom';
import Backbutton from '../../components/Backbutton';

const Categorychild = () => {
    const location = useLocation()
    return (
        <div className='py-3 flex justify-between'>
           <h5 className='text-center'>
                <span>زیرگروه:</span>
                <span className='text-blue-400'>{location.state.parentdata.title}</span>
            </h5>  
         <Backbutton/>
        </div>
    );
};

export default Categorychild;