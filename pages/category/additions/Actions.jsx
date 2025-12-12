import React from 'react';
import Categoryatr from '../Categoryatr';
import { useNavigate, useParams } from 'react-router-dom';

const Actions = ({rowdata}) => {
    const navigate = useNavigate()
    const params = useParams()
    return (
        <>
        {!params.categoryId?(
              <i className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip" title="زیرمجموعه" data-bs-toggle="tooltip" data-bs-placement="top" onClick={()=>navigate(`/categories/${rowdata.id}`,{
            state:{
                parentdata:rowdata
            }
           })}></i>
        ):null}
         
            <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip" title="ویرایش دسته" data-bs-toggle="modal" data-bs-placement="top" data-bs-target="#add_product_category_modal"></i>
            <Categoryatr/>
            <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" title="حذف دسته" data-bs-toggle="tooltip" data-bs-placement="top"></i>  
        </>
    );
};

export default Actions;