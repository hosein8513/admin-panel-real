import React, { useEffect, useState } from 'react';
import Modals from '../../components/Modals';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { Form, Formik } from 'formik';
import Formikcontrol from '../../components/form/Formikcontrol';
import SubmitButton from '../../components/form/Submitbutton';
import { getPermitions, getSingleRole } from '../../src/services/users';
import { initialValues, onSubmit, validationSchema } from './core';

const Addrole = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const editRole = location.state?.editRole
    const editType = location.state?.editType
    const [reIni, setReIni] = useState(null)
    const { setData } = useOutletContext()
    const [permition, setpermition] = useState([])
    const [RoletoEdit, setRoleToEdit] = useState(null)

 const handleGetAllPermissions = async ()=>{
        const res = await getPermitions()
        if (res.status === 200) {
            setpermition(res.data.data.map(p=>{return {id: p.id, title: p.description}}))
        }
    }

    const handleGetRoleToEditData = async ()=>{
        const res = await getSingleRole(editRole);
        if (res.status === 200) {
            const role = res.data.data
            setRoleToEdit(role)
            editType === "role" ? setReIni({
                title: role.title, 
                description: role.description,
            }) : setReIni({
                permissions_id: role.permissions.map(p=>""+p.id),
                editPermissions: true
            })
        }
    }

    useEffect(() => {
        editType !== "role" && handleGetAllPermissions()
        editRole && handleGetRoleToEditData();
    }, []);

    return (
        <Modals
        className="show d-block"
        id={"add_role_modal"}
        title={editType === "role" 
        ? 'ویرایش نقش' 
        : editType === "permissions" 
        ?  `ویرایش مجوز های دسترسی: ${ RoletoEdit?.title || "" }`
        : "افزودن نقش کاربر"}
        fullScreen={editType == "role" ? false :true}
        closeFunction={()=>navigate(-1)}
        >
            <div className="container">
                <Formik
                initialValues={reIni || initialValues}
                onSubmit={(values, actions)=>onSubmit(values, actions, setData,editRole, editType)}
                validationSchema={validationSchema}
                enableReinitialize
                >
                    <Form className="row justify-content-center">
                        {editType !== "permissions" ? (
                            <>
                                <Formikcontrol
                                className={editType == "role" ? "" :"col-md-8"}
                                control="input"
                                type="text"
                                name="title"
                                label="عنوان نقش"
                                placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                                />
                                <Formikcontrol
                                className={editType == "role" ? "" :"col-md-8"}
                                control="textarea"
                                name="description"
                                label="توضیحات نقش"
                                placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                                />
                            </>
                        ) : null }

                        {editType !== "role" ? (
                            <Formikcontrol
                            className="col-md-8"
                            control="checkbox"
                            name="permissions_id"
                            label="دسترسی ها: "
                            options={permition}
                            />
                        ): null}

                        <div className="btn_box text-center col-12 mt-4">
                            <SubmitButton />
                        </div>
                    </Form>
                </Formik>
            </div>

        </Modals>
    );
};

export default Addrole;
