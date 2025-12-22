import React, {  } from 'react';
import Categotytable from './Categotytable';
import Addcategory from './Addcategory';
import { Admincontext } from '../../layout/assets/context/admincontext';
import CategorycontextContainer from '../../layout/assets/context/categorycontext';

const Category = () => {
    return (
       <CategorycontextContainer>
        <div id="manage_product_category" className="manage_product_category main_section">
            <h4 className="text-center my-3">مدیریت دسته بندی محصولات</h4>

            <Categotytable numofpage={3}/>
        </div>
        </CategorycontextContainer>
    );
};

export default Category;