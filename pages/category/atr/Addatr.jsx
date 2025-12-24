import React from 'react';
import { initialvalue, onSubmit, validationSchema } from './core';
import { Form, Formik } from 'formik';
import Formikcontrol from '../../../components/form/Formikcontrol';
import SubmitButton from '../../../components/form/Submitbutton';

const Addatr = ({reIni,editAtr,setdata,setEditAtr,location}) => {
    return (
        <Formik
            initialValues={reIni || initialvalue}
            onSubmit={(values, action) => onSubmit(values, action, location.state.Categorydata.id, setdata, editAtr, setEditAtr)}
            validationSchema={validationSchema}
            enableReinitialize
        >
            <Form>
                <div className="row my-3">
                    <Formikcontrol
                        control='input'
                        type='text'
                        name='title'
                        label='عنوان'
                        className='col-md-6 col-lg-4 my-1'
                        placeholder='عنوان ویژگی جدید'
                    />
                    <Formikcontrol
                        control='input'
                        type='text'
                        name='unit'
                        label='واحد'
                        className='col-md-6 col-lg-4 my-1'
                        placeholder='واحد ویژگی جدید'
                    />
                    <div className='col-8 col-lg-2 my-1'>
                        <Formikcontrol
                            control='switch'
                            name='in_filter'
                            label='نمایش در فیلتر'
                        />
                    </div>

                    <div className="col-4 col-lg-2 d-flex justify-content-center align-items-center my-1">
                        <SubmitButton />
                        {editAtr ? (
                            <button className='bny btn-sm btn-secondary me-2' onClick={() => setEditAtr(null)}>انصراف</button>
                        ) : null}
                    </div>
                </div>
            </Form>
        </Formik>
    );
};

export default Addatr;