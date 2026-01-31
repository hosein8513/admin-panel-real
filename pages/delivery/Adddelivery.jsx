import React, { useEffect, useState } from 'react';
import Modals from '../../components/Modals';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { initialValues, onSubmit, validationSchema } from './core';
import SubmitButton from '../../components/form/Submitbutton';
import Formikcontrol from '../../components/form/Formikcontrol';

const Adddelivery = () => {
    const navigat = useNavigate()
    const location = useLocation()
    const deliveryToEdit = location.state?.deliveryToEdit
    const [reIni, setreIni] = useState(null)
    const { setData } = useOutletContext()

    useEffect(() => {
        if (deliveryToEdit) setreIni(deliveryToEdit)
    }, [])
    return (
        <>
            <Modals
                className='show d-block'
                fullscreen={false}
                id={"add_delivery_modal"}
                title={deliveryToEdit ? "ویرایش نحوه ارسال" : "افزودن نحوه ارسال"}
                closeFunction={() => navigat(-1)}
            >
                <div className="container">
                    <Formik
                        initialValues={reIni||initialValues}
                        onSubmit={(values, actions) => onSubmit(values, actions, setData, deliveryToEdit)}
                        validationSchema={validationSchema}
                        enableReinitialize
                    >
                        {formik => {
                            return (
                                <Form>
                                    <div className="row justify-content-center">
                                        <Formikcontrol
                                            control="input"
                                            type="text"
                                            name="title"
                                            label="عنوان"
                                            placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                                        />
                                        <Formikcontrol
                                            control="input"
                                            type="number"
                                            name="amount"
                                            label="مبلغ"
                                            placeholder="فقط از اعداد استفاده کنید"
                                        />
                                        <Formikcontrol
                                            control="input"
                                            type="number"
                                            name="time"
                                            label="مدت ارسال"
                                            placeholder="فقط از اعداد استفاده کنید"
                                        />
                                        <Formikcontrol
                                            control="input"
                                            type="text"
                                            name="time_unit"
                                            label="واحد مدت"
                                            placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                                        />


                                        <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                                            <SubmitButton />
                                        </div>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </Modals>
        </>
    );
};

export default Adddelivery;