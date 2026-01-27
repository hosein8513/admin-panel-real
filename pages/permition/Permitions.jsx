import React from 'react';
import Permitiontable from './Permitiontable';

const Permitions = () => {
    return (
        <>
            <div id="manage_permission_section" className="manage_permission_section main_section">
                <h4 className="text-center my-3">مدیریت مجوز ها</h4>
                <Permitiontable />
            </div>
        </>
    );
};

export default Permitions;