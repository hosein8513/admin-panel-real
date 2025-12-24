import React from 'react';

const Atraction = ({rowdata,editAtr,setEditAtr,handledeleteatr}) => {
    return (
        <>
            <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip" title="ویرایش ویژگی" 
            onClick={()=>setEditAtr(rowdata)}></i>
          <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" title="حذف ویژگی" onClick={()=>handledeleteatr(rowdata)}></i>

            </>
    );
};

export default Atraction;