import React, { useState } from 'react';
import Categotytable from './Categotytable';
import Addcategory from './Addcategory';

const Category = () => {
    const [numofpage, setnumogpage] = useState(3)
    return (
        <div id="manage_product_category" className="manage_product_category main_section">
            <h4 className="text-center my-3">مدیریت دسته بندی محصولات</h4>

            <Categotytable numofpage={numofpage}/>
            <input type="text" placeholder=' تعداد مقادیر در هر صفحه' value={numofpage} onChange={(e) => setnumogpage(e.target.value)} />
            <Addcategory />
        </div>
    );
};

export default Category;