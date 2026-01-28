import React from 'react';
import Usertable from './Usertable';
import Adduser from './Adduser';

const Users = () => {
    return (
        <>
            <div id="manage_user_section" className="manage_user_section main_section">
                <h4 className="text-center my-3">مدیریت کاربران</h4>
                <Usertable />
            </div>

        </>
    );
};

export default Users;