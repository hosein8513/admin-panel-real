import React from 'react';
import Roletable from './Roletable';
import Addrole from './Addrole';

const Roles = () => {
    return (
        <>
            <div id="manage_role_section" className="manage_role_section main_section">
                <h4 className="text-center my-3">مدیریت نقش ها</h4>
                <Roletable />
            </div>
        </>
    );
};

export default Roles;