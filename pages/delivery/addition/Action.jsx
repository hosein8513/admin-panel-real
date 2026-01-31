import React from 'react';
import { useNavigate } from 'react-router-dom';

const Action = ({rowData,handledeleteDelivery}) => {
    const navigate = useNavigate()
    return (
        <>
          <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip pointer"
        title="ویرایش ارسال"
        data-bs-placement="top"
        data-bs-toggle="modal"
        data-bs-target="#add_delivery_modal"
        onClick={()=>navigate('/deliveries/add-delivery',{state:{deliveryToEdit:rowData}})}
      ></i>


      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip pointer"
        title="حذف ارسال"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={()=>handledeleteDelivery(rowData)}
      ></i>   
        </>
    );
};

export default Action;