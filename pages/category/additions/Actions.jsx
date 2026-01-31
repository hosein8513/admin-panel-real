import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Categorycontext } from '../../../layout/assets/context/categorycontext';
import ActionIcon from '../../../components/ActionIcon';

const Actions = ({ rowdata, handleDeleteCategory }) => {
    const navigate = useNavigate()
    const params = useParams()
    const { seteditId } = useContext(Categorycontext)
    return (
        <>
            {!params.categoryId ? (
                <ActionIcon icon={'fas fa-project-diagram text-info'} pTitle={'read_category'} title="زیرمجموعه" onClick={() => navigate(`/categories/${rowdata.id}`, {
                    state: {
                        parentdata: rowdata
                    }
                })}/>
                
            ) : null}
            <ActionIcon icon={'fas fa-edit text-warning'} pTitle={'update_category'} title="ویرایش دسته" onClick={() => seteditId(rowdata.id)} data-bs-product='#add_product_category_modal'/>

            {params.categoryId ? <ActionIcon icon={'fas fa-receipt text-primary'} pTitle={'create_category_attr'} title="افزودن ویژگی"
                onClick={() => navigate(`/categories/${rowdata.id}/attributes`, {
                    state: {
                        Categorydata: rowdata
                    }
                })} />
                : null}
                
            <ActionIcon icon={'fas fa-times text-danger'} pTitle={'delete_category'} title="حذف دسته" onClick={() => { handleDeleteCategory(rowdata) }} />

        </>
    );
};

export default Actions;