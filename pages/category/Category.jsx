import React, {  } from 'react';
import Categotytable from './Categotytable';
import Addcategory from './Addcategory';

const Category = () => {
    return (
        <div id="manage_product_category" className="manage_product_category main_section">
            <h4 className="text-center my-3">مدیریت دسته بندی محصولات</h4>

            <Categotytable numofpage={3}/>
            <Addcategory />
        </div>
    );
};

export default Category;