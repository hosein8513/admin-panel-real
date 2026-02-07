import React from 'react';
import ActionIcon from '../../../components/ActionIcon';
import { useNavigate } from 'react-router-dom';

const Action = ({ rowData, handleDeleteOrder}) => {
     const navigation = useNavigate()
    return (
        <>
            <ActionIcon
        icon="fas fa-shopping-cart text-info"
        pTitle="read_order"
        title="  جزئیات سفارش"
        onClick={() => navigation("/order/add-order", { state: { orderId: rowData.id } })}
      />
      <ActionIcon
        icon="fas fa-times text-danger"
        pTitle="delete_order"
        title="حذف سبد"
        onClick={() => handleDeleteOrder(rowData)}
      />  
        </>
    );
};

export default Action;