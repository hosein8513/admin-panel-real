import React from 'react';

const Action = ({rowdata,handleDeleteUsers}) => {
    return (
        <>
         <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش کاربر"
        data-bs-placement="top"
        data-bs-toggle="modal"
        data-bs-target="#add_user_modal"
      ></i>


      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف کاربر"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={()=>handleDeleteUsers(rowdata)}
      ></i>
        </>
    );
};

export default Action;