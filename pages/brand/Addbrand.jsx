import React, { useEffect, useState } from 'react';
import Modals from '../../components/Modals';
import { Form, Formik } from 'formik';
import Formikcontrol from '../../components/form/Formikcontrol';
import SubmitButton from '../../components/form/Submitbutton';
import { initialValues, onSubmit, validationSchema } from './core';
import { apiPath } from '../../src/services/httpservice';

const Addbrand = ({setdata,editBrand,setEditBrand}) => {
    const[reIni,setReIni] = useState(null)
useEffect(()=>{
    if(editBrand)setReIni({
        original_name:editBrand.original_name,
        persian_name:editBrand.persian_name,
        descriptions:editBrand.descriptions||'',
        logo:null
    })
    else setReIni(null)
},[editBrand])

    return (
        <>
            <button className="btn btn-success d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#add_brand_modal" onClick={()=>setEditBrand(null)}>
                <i className="fas fa-plus text-light"></i>
            </button>
            <Modals
                fullscreen={false}
                id={"add_brand_modal"}
                title={editBrand?"ویرایش برند":"افزودن برند"}
            >
                <div className="container">
                    <div className="row justify-content-center">
                        <Formik
                        initialValues={reIni||initialValues}
                        onSubmit={(values,actions)=>onSubmit(values,actions,setdata,editBrand)
                        }
                        validationSchema={validationSchema}
                        enableReinitialize
                        >
                            <Form>
                               <Formikcontrol
                               control='input'
                               type='text'
                               name='original_name'
                               label='نام لاتین'
                               placeholder='کیبورد را در حالت لاتین قرار دهید'
                               />
                               <Formikcontrol
                               control='input'
                               type='text'
                               name='persian_name'
                               label='نام فارسی'
                               placeholder='کیبورد را در حالت فارسی قرار دهید'
                               />
                            <Formikcontrol 
                            control='textarea'
                            name='descriptions'
                            label='توضیحات'
                            placeholder='توضیحات'
                            />
                            {
                                editBrand?(
                                   <div className='btn_box text-center col-12 py-3'>
                                    <img src={apiPath+'/'+editBrand.logo} width={60}/>
                                   </div> 
                                )
                                :null
                            }
                                <Formikcontrol
                                control='file'
                                name='logo'
                                label='تصویر'
                                placeholder='تصویر'
                                />
                               
                                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                                    <SubmitButton/>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </Modals>
        </>
    );
};

export default Addbrand;