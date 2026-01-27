import { useNavigate } from 'react-router-dom';
import React from 'react';

const Action = ({rowdata,handledeleteRole}) => {
   const navigate = useNavigate()
    return (
        <>
     <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش نقش"
        data-bs-placement="top"
        data-bs-toggle="modal"
        data-bs-target="#add_role_modal"
        onClick={()=>navigate('/roles/add-role',{state:{editRole:rowdata}})}
      ></i>


      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف نقش"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={()=>handledeleteRole(rowdata)}
      ></i>
    </>
    );
};

export default Action;