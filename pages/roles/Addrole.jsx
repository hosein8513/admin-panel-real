import React, { useEffect, useState } from 'react';
import Modals from '../../components/Modals';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { Form, Formik } from 'formik';
import Formikcontrol from '../../components/form/Formikcontrol';
import SubmitButton from '../../components/form/Submitbutton';
import { getPermitions } from '../../src/services/users';
import { initialValues, onSubmit, validationSchema } from './core';

const Addrole = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const editRole = location.state?.editRole
    const {setData} = useOutletContext()

    const[permition,setpermition] = useState([])

    const handleGetPermition = async()=>{
        const res = await getPermitions()
        if(res.status == 200){
            setpermition(res.data.data.map(p=>{return{id:p.id,title:p.description}}))
        }
    }
    useEffect(()=>{
        handleGetPermition()
    },[])

    return (
        <>
            <Modals
                fullscreen={true}
                className='show d-block'
                id={"add_role_modal"}
                title={editRole ? 'ویرایش نقش' : "افزودن نقش"}
                closeFunction={() => navigate(-1)}
            >
                <div className="container">
                    <Formik 
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values,actions)=>onSubmit(values,actions,setData)}>
                        <Form className="row justify-content-center">
                            <Formikcontrol
                                className='col-md-8'
                                control='input'
                                type='text'
                                name='title'
                                label='عنوان نقش'
                                placeholder='فقط از حروف فارسی ولاتین استفاده کنید'
                            />
                            <Formikcontrol
                                className='col-md-8'
                                control='textarea'
                                name='description'
                                label='توضیحات نقش'
                                placeholder='فقط از حروف فارسی ولاتین استفاده کنید'
                            />
                            <Formikcontrol
                                className='col-md-8'
                                control='checkbox'
                                name='perimissions_id'
                                label='دسترسی ها:'
                               options={permition}
                            />

                            {/* <div className="col-12 my-1 mb-3">
                            <div className="input-group my-2 dir_ltr">
                                <input type="text" className="form-control" placeholder="قسمتی از مجوز مورد نظر را وارد کنید" list="permissionsList" />
                                <span className="input-group-text w_8rem justify-content-center">دسترسی ها</span>
                                <datalist id="permissionsList">
                                    <option value="مجوز شماره 1" />
                                    <option value="مجوز شماره 2" />
                                    <option value="مجوز شماره 3" />
                                </datalist>
                            </div>
                            <div className="col-12 col-md-6 col-lg-8">
                                <span className="chips_elem">
                                    <i className="fas fa-times text-danger"></i>
                                    مجوز 1
                                </span>
                                <span className="chips_elem">
                                    <i className="fas fa-times text-danger"></i>
                                    مجوز 2
                                </span>
                            </div>
                        </div>

                        <div className="col-12 my-2">
                            <div className="form-check form-switch col-5 col-md-4">
                                <input className="form-check-input pointer" type="checkbox" id="flexSwitchCheckDefault" />
                                <label className="form-check-label pointer" htmlFor="flexSwitchCheckDefault">وضعیت : فعال</label>
                            </div>
                        </div> */}


                            <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                                <SubmitButton />
                            </div>
                        </Form>
                    </Formik>
                </div>
            </Modals>
        </>
    );
};

export default Addrole;
