import React from 'react';
import Deliverytable from './Deliverytable';
import Adddelivery from './Adddelivery';

const Delivery = () => {
    return (
        <>
            <div id="manage_deliveries_section" className="manage_deliveries_section main_section">
                <h4 className="text-center my-3">مدیریت نحوه ارسال</h4>
             <Deliverytable/>
            </div>
        </>
    );
};

export default Delivery;