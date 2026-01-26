import React from 'react';
import { useNavigate } from 'react-router-dom';

const Action = ({handleDeleteDiscount,rowData}) => {
  const navigate = useNavigate()
    return (
        <>
           <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش کد تخفیف"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={()=>navigate('/discount/add-discount-code',{state:{editCode:rowData}})}
      ></i>

      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف کد تخفیف"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={()=>handleDeleteDiscount(rowData)}
      ></i>  
        </>
    );
};

export default Action;