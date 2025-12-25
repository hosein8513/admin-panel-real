import React from 'react';
import Producttable from './Producttable';
import Addprodect from './Addprodect';
import Modals from '../../components/Modals';
import Tableproduct from './Tableproduct';

const Product = () => {
    return (
        
        <div id="manage_product_section" className="manage_product_section main_section">
            <h4 className="text-center my-3">مدیریت محصولات</h4>
           <Tableproduct/>

        </div>
        
    );
};

export default Product;