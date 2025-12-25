import React, { useEffect, useState } from 'react';
import Modals from '../../components/Modals';
import SubmitButton from '../../components/form/Submitbutton';
import { Form, Formik } from 'formik';
import { initialValues, onSubmit, validationSchema } from './core';
import Formikcontrol from '../../components/form/Formikcontrol';

const Addcolor = ({ setdata, editColor, setEditcolor }) => {
    const [reIni, setReini] = useState(null)

    useEffect(() => {
        if (editColor) setReini({
            title: editColor.title,
            code: editColor.code
        })
        else {
            setReini(null)
        }
    }, [editColor])
    return (
        <>
            <button className="btn btn-success d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#add_color_modal"
            onClick={()=>setEditcolor(null)}
            >
                <i className="fas fa-plus text-light"></i>
            </button>
            <Modals
                fullscreen={false}
                id={"add_color_modal"}
                title={editColor ? 'ویرایش رنگ' : "افرودن رنگ جدید"}
            >
                <div className="container">
                    <div className="row justify-content-center">
                        <Formik
                            initialValues={reIni || initialValues}
                            enableReinitialize
                            validationSchema={validationSchema}
                            onSubmit={(values, action) => onSubmit(values, action, setdata, editColor)}
                        >
                            <Form>
                                <Formikcontrol
                                    control='input'
                                    type='text'
                                    name='title'
                                    label='نام رنگ'
                                    placeholder='نام رنگ را وارد کنید'
                                />
                                <Formikcontrol
                                    control='input'
                                    type='text'
                                    name='code'
                                    label='کد رنگ'
                                    placeholder='کد رنگ را وارد کنید'
                                />
                                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                                    <SubmitButton />
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </Modals>
        </>
    );
};

export default Addcolor;