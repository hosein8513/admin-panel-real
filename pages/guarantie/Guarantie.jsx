import React from 'react';
import Guarantietable from './Guarantietable';
import Addguarantie from './Addguarantie';

const Guarantie = () => {
    return (
        <>
          <div id="manage_guarantee_section" className="manage_guarantee_section main_section">
            <h4 className="text-center my-3">مدیریت گارانتی ها</h4>
            <Guarantietable numofpage = {3}/>
        </div>  
        </>
    );
};

export default Guarantie;