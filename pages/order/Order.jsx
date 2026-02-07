import React from 'react';
import Ordertable from './Ordertable';
import Orderdetails from './Orderdetails';
import Addorder from './Addorder';

const Order = () => {
    return (
        <>
            <div id="manage_orders_section" className="manage_orders_section main_section">
                <h4 className="text-center my-3">مدیریت سفارشات</h4>
             <Ordertable/>
            </div>
        </>
    );
};

export default Order;