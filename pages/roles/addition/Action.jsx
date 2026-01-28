import { useNavigate } from 'react-router-dom';
import React from 'react';

const Action = ({ rowdata, handledeleteRole }) => {
  const navigate = useNavigate()
  return (
    <>
      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش نقش"
        data-bs-placement="top"
        data-bs-toggle="tooltip"
        onClick={() => navigate('/roles/add-role', { state: { editRole: rowdata.id, editType: 'role' } })}
      ></i>
      <i className='fas fa-fingerprint text-info mx-1 hoverable_text pointer has_tooltip'
        title='ویرایش دسترسی ها'
        data-bs-placement="top"
        data-bs-toggle="tooltip"
        onClick={() => navigate('/roles/add-role', { state: { editRole: rowdata.id, editType:"permissions"} })}
      ></i>

      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف نقش"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={() => handledeleteRole(rowdata)}
      ></i>
    </>
  );
};

export default Action;