import React from 'react';
import Brandtable from './Brandtable';
import Addbrand from './Addbrand';

const Brand = () => {
    return (
        <>
            <div id="manage_brand_section" className="manage_brand_section main_section">
                <h4 className="text-center my-3">مدیریت برند ها</h4>
                <Brandtable numofpage={3} />
            </div>
        </>
    );
};

export default Brand;