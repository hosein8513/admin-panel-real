import React from 'react';
import Carttable from './Carttable';
import Addcart from './Editcart';
import Editcart from './Editcart';

const Cart = () => {
    return (
        <>
            <div id="manage_cart_section" className="manage_cart_section main_section">
                <h4 className="text-center my-3">مدیریت سبد خرید</h4>
                <Carttable />
            </div>
        </>
    );
};

export default Cart;