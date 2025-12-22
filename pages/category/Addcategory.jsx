import React, { useContext, useEffect, useState } from 'react';
import Modals from '../../components/Modals';
import { FastField, Form, Formik } from 'formik';
import Formikcontrol from '../../components/form/Formikcontrol';
import { getcategoryservice, getSingleCategory } from '../../src/services/category';
import { Alert, SuccessAlert } from '../../utills/Alert';
import Loader from '../../components/Loader';
import { useParams } from 'react-router-dom';
import { Categorycontext } from '../../layout/assets/context/categorycontext';
import { initialvalue, onsubmit, validationschema } from './core';





const Addcategory = ({ setForceRender }) => {
    const params = useParams()
    const [reini, setreini] = useState(null)
    const [parent, setparent] = useState([])
    const { editId, seteditId } = useContext(Categorycontext)
    const [editcategory, seteditcategory] = useState(null)

    const handlegetcategoryparent = async () => {
        try {
            const res = await getcategoryservice()
            if (res.status == 200) {
                const allparams = res.data.data

                setparent(allparams.map(p => {
                    return { id: p.id, value: p.title }
                }))
            }
        } catch (err) {
            Alert("مشکلی در دریافت اطلاعات رخ داده است", "خطا")
        }
    }

    const handlegetSingleCategory = async () => {
        try {
            const res = await getSingleCategory(editId)
            if (res.status == 200) {
                const oldCategory = res.data.data
                seteditcategory(oldCategory)
            }
        } catch (err) {
            Alert("مشگلی در دریافت دسته رخ داده است", "خطا")
        }
    }
    useEffect(() => {
        if (editId) handlegetSingleCategory()
        else seteditcategory(null)
    }, [editId])

    useEffect(() => {
        handlegetcategoryparent()
    }, [])
    useEffect(() => {
        if(editcategory){
            setreini({
                parent_id:editcategory.parent_id || '',
                title:editcategory.title,
                description:editcategory.description,
                image:null,
                is_active:editcategory.is_active?true:false,
                show_in_menu:editcategory.show_in_menu?true:false
            })
        }
       else if (params.categoryId) {
            setreini({
                ...initialvalue,
                parent_id: params.categoryId
            })
        } else {
            setreini(null)
        }
    }, [params.categoryId,editcategory])
    return (
        <>
            <button className="btn btn-success d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#add_product_category_modal"

                onClick={() => seteditId(null)}>
                <i className="fas fa-plus text-light"></i>
            </button>

            <Modals
                fullscreen={true}
                id="add_product_category_modal"
                title={editId?'ویرایش:'+(editcategory?editcategory.title:''):'افزودن دسته محصولات'}
            >
                <Formik
                    enableReinitialize
                    initialValues={reini || initialvalue}
                    onSubmit={(values, action) => onsubmit(values, action, setForceRender,editId)
                    }
                    validationSchema={validationschema}
                >
                    <Form>
                        <div className="container">
                            <div className="row justify-content-center">
                                {parent.length > 0 ? (<Formikcontrol
                                    className="col-md-6 col-lg-8"
                                    control="select"
                                    options={parent}
                                    name="parent_id"
                                    label="دسته والد"
                                />) : null}

                                <Formikcontrol
                                    className="col-md-6 col-lg-8"
                                    control="input"
                                    type="text"
                                    name="title"
                                    label="عنوان دسته"
                                    placeholder="عنوان دسته"
                                />
                                <Formikcontrol
                                    className='col-md-6 col-lg-8'
                                    control='textarea'
                                    name='description'
                                    label='توضیحات'
                                    placeholder='توضیحات'

                                />
                               {!editId?
                                <Formikcontrol
                                    className='clo-mg-6 col-lg-8'
                                    control='file'
                                    name='image'
                                    label='تصویر'
                                    placeholder='تصویر'
                                />:null}
                                <div className="w-full col-12 col-md-6 col-lg-8 row justify-center gap-4">
                                    <div className="form-check form-switch col-5 col-md-2">
                                        <Formikcontrol
                                            control='switch'
                                            name='is_active'
                                            label='وضعیت فعال'
                                        />
                                    </div>
                                    <div className="form-check form-switch col-5 col-md-2">
                                        <Formikcontrol
                                            control='switch'
                                            name='show_in_menu'
                                            label='نمایش در منو'
                                        />
                                    </div>
                                </div>
                                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                                    <FastField>
                                        {({ form }) => {
                                            return (
                                                <button className="btn btn-primary" type='submit'>ذخیره
                                                    {form.isSubmitting ? <Loader color={'text-white'} size={true} inline={true} /> : null}
                                                </button>
                                            )
                                        }}
                                    </FastField>
                                </div>

                            </div>
                        </div>
                    </Form>
                </Formik>

            </Modals>
        </>
    );
};

export default Addcategory;