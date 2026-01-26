import React from 'react';
import Discounttable from './Discounttable';
import Adddiscount from './Adddiscount';

const Discount = () => {
    return (
        <>
          <div id="manage_discount_section" className="manage_discount_section main_section">
            <h4 className="text-center my-3">مدیریت کد های تخفیف</h4>
            <Discounttable/>
        </div>  
        </>
    );
};

export default Discount;