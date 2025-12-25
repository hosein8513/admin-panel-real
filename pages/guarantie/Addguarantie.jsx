import Modals from '../../components/Modals';
import SubmitButton from '../../components/form/Submitbutton';
import { Form, Formik } from 'formik';
import { initialValues, onSubmit, validationSchema } from './core';
import Formikcontrol from '../../components/form/Formikcontrol';
import { useEffect, useState } from 'react';

const Addguarantie = ({ setdata, editGuaratie, setEditGuarantie }) => {
    const [reIni, setReini] = useState(null)

    useEffect(() => {
        if (editGuaratie) setReini({
            title: editGuaratie.title,
            descriptions: editGuaratie.descriptions || '',
            length: editGuaratie.length || '',
            length_unit: editGuaratie.length_unit || ''})
            else{
                setReini(null)
            }
    }, [editGuaratie])
    return (
        <>
            <button className="btn btn-success d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#add_guarantee_modal" onClick={() => setEditGuarantie(null)}>
                <i className="fas fa-plus text-light"></i>
            </button>
            <Modals
                fullscreen={false}
                id={"add_guarantee_modal"}
                title={editGuaratie ? 'ویرایش گارانتی' : "افزودن گارانتی"}
            >
                <div className="container">
                    <div className="row justify-content-center">
                        <Formik
                            initialValues={reIni||initialValues}
                            onSubmit={(values, actions) => onSubmit(values, actions, setdata, editGuaratie)}
                            validationSchema={validationSchema}
                            enableReinitialize
                        >
                            <Form>
                                <Formikcontrol
                                    control='input'
                                    type='text'
                                    name='title'
                                    label='عنوان گارانتی'
                                    placeholder=''
                                />
                                <Formikcontrol
                                    control='input'
                                    type='text'
                                    name='descriptions'
                                    label='توضیحات گارانتی'
                                    placeholder=''
                                />
                                <Formikcontrol
                                    control='input'
                                    type='text'
                                    name='length'
                                    label='مدت گارانتی'
                                    placeholder='به ماه'
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

export default Addguarantie;