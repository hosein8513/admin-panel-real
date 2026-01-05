import React, { useEffect, useState } from 'react';
import Modals from '../../components/Modals';
import { ErrorMessage, Form, Formik } from 'formik';
import { initialValue, onSubmit, validationSchema } from './core';
import Formikcontrol from '../../components/form/Formikcontrol';
import { getcategoryservice } from '../../src/services/category';
import Loader from '../../components/Loader';
import Personalerror from '../../components/Personalerror';
import Backbutton from '../../components/Backbutton';
import Chips from '../../components/Chips';

const Addprodect = () => {
    const [parentCategory, setparentCategory] = useState([])
    const [mainCategory, setMainCategory] = useState(null)
    const [selectedcategory, setSelectedCategory] = useState([])
    const getParentCategory = async () => {
        const res = await getcategoryservice()
        if (res.status == 200) {
            setparentCategory(res.data.data.map(d => {
                return { id: d.id, value: d.title }
            }))
        }
    }

    const handleselectcategory = (value, formik) => {
        setSelectedCategory(old => {
            if (old.findIndex(d => d.id == value) == -1) {
                const newData = [...old, mainCategory.filter(c => c.id == value)[0]]


                const selectedIds = newData.map(d => d.id)
                formik.setFieldValue('category_ids', selectedIds.join('-'))



                return newData
            } else {
                return old
            }
        })

    }
    
    const hanadlesetmaincategory = async (value) => {
        setMainCategory('waiting')
        if (value > 0) {
            const res = await getcategoryservice(value)
            if (res.status == 200) {
                setMainCategory(res.data.data.map(d => {
                    return { id: d.id, value: d.title }
                }))
            }
        } else {
            setMainCategory(null)
        }
    }


    useEffect(() => {
        getParentCategory()
    }, [])

    return (
        <Formik
            initialValues={initialValue}
            onSubmit={(values, actions) => onSubmit(values, actions)}
            validationSchema={validationSchema}
        >
            {formik => {
                return (
                    <Form>
                        <div className="container">
                            <h4 className='text-center my-3'>افزودن محصول جدید</h4>
                            <div className='text-left col-12 col-md-6 col-lg-8 m-auto my-3'>
                                <Backbutton/>
                            </div>
                          <div className="row justify-content-center">

                                {parentCategory.length > 0 ?
                                    <Formikcontrol
                                        className='col-12 col-md-6 col-lg-8'
                                        control='select'
                                        options={parentCategory}
                                        name='parent'
                                        firstitem='دسته مورد نظر را انتخاب کنید'
                                        handleonchange={hanadlesetmaincategory}
                                    />
                                    : null
                                }

                                <div className="col-12 col-md-6 col-lg-8">
                                    {mainCategory === 'waiting' ? (
                                        <Loader size={true} color='text-primary' />
                                    ) : mainCategory !== null ? <Formikcontrol
                                        className='col-12 col-md-6 col-lg-8'
                                        control='select'
                                        options={mainCategory}
                                        name='mainCats'
                                        firstitem='دسته مورد نظر را انتخاب کنید'
                                        handleonchange={handleselectcategory}

                                    /> : null}

                                    <ErrorMessage name={'category_ids'} component={Personalerror} />


                                    <div className="input-group mb-2 dir_ltr">
                                        <select type="text" className="form-control">
                                            <option value="1">انتخاب دسته محصول</option>
                                            <option value="1">دسته شماره 1</option>
                                        </select>
                                        <span className="input-group-text w_6rem justify-content-center">دسته</span>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-8">
                                        <Chips setSelectedCategory={setSelectedCategory} formik={formik} selectedcategory={selectedcategory}/>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-8">
                                    <div className="input-group my-3 dir_ltr">
                                        <input type="text" className="form-control" placeholder="عنوان محصول" />
                                        <span className="input-group-text w_6rem justify-content-center">عنوان</span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-8">
                                    <div className="input-group mb-3 dir_ltr">
                                        <input type="text" className="form-control" placeholder="قیمت محصول" />
                                        <span className="input-group-text w_6rem justify-content-center">قیمت</span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-8">
                                    <div className="input-group mb-3 dir_ltr">
                                        <input type="text" className="form-control" placeholder="وزن محصول (کیلوگرم)" />
                                        <span className="input-group-text w_6rem justify-content-center">وزن</span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-8">
                                    <div className="input-group mb-3 dir_ltr">
                                        <span className="input-group-text justify-content-center">
                                            <i className="fas fa-plus text-success hoverable_text pointer"></i>
                                        </span>
                                        <input type="text" className="form-control" placeholder="قسمتی از نام برند را وارد کنید" list="brandLists" />
                                        <span className="input-group-text w_6rem justify-content-center">برند</span>
                                        <datalist id="brandLists">
                                            <option value="سامسونگ" />
                                            <option value="سونی" />
                                            <option value="اپل" />
                                        </datalist>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-8">
                                    <div className="input-group mb-2 dir_ltr">
                                        <input type="text" className="form-control" placeholder="قسمتی از نام رنگ را وارد کنید" list="colorList" />
                                        <datalist id="colorList">
                                            <option value="مشکی" />
                                            <option value="سفید" />
                                            <option value="قرمز" />
                                        </datalist>
                                        <span className="input-group-text w_6rem justify-content-center">رنگ</span>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-8 mb-3 d-flex">
                                        <span className="color_tag chips_elem d-flex justify-content-center align-items-center pb-2 dir_ltr" >
                                            <i className="fas fa-times text-danger hoverable_text"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-8">
                                    <div className="input-group mb-2 dir_ltr">
                                        <input type="text" className="form-control" placeholder="قسمتی از نام گارانتی را وارد کنید" list="guarantiList" />
                                        <datalist id="guarantiList">
                                            <option value="گارانتی فلان 1" />
                                            <option value="گارانتی فلان 2" />
                                            <option value="گارانتی فلان 3" />
                                        </datalist>
                                        <span className="input-group-text w_6rem justify-content-center">گارانتی</span>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-8 mb-3">
                                        <span className="chips_elem">
                                            <i className="fas fa-times text-danger"></i>
                                            گارانتی فلان
                                        </span>
                                        <span className="chips_elem">
                                            <i className="fas fa-times text-danger"></i>
                                            گارانتی فلان
                                        </span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-8">
                                    <div className="input-group mb-3 dir_ltr" >
                                        <textarea type="text" className="form-control" placeholder="توضیحات" rows="5"></textarea>
                                        <span className="input-group-text w_6rem justify-content-center">توضیحات</span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-8">
                                    <div className="input-group mb-3 dir_ltr" >
                                        <input type="file" className="form-control" placeholder="تصویر" />
                                        <span className="input-group-text w_6rem justify-content-center">تصویر</span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-8">
                                    <div className="input-group mb-3 dir_ltr" >
                                        <input type="text" className="form-control" placeholder="یک کلمه در مورد تصویر" />
                                        <span className="input-group-text w_6rem justify-content-center">توضیح تصویر</span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-8">
                                    <div className="input-group mb-3 dir_ltr" >
                                        <input type="text" className="form-control" placeholder="با - از هم جدا شوند" />
                                        <span className="input-group-text w_6rem justify-content-center">تگ ها</span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-8">
                                    <div className="input-group mb-3 dir_ltr" >
                                        <input type="number" className="form-control" placeholder="فقط عدد" />
                                        <span className="input-group-text w_6rem justify-content-center">موجودی</span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-8">
                                    <div className="input-group mb-3 dir_ltr" >
                                        <input type="number" className="form-control" placeholder="فقط عدد " />
                                        <span className="input-group-text w_6rem justify-content-center">درصد تخفیف</span>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-8 row justify-content-center">
                                    <div className="form-check form-switch col-5 col-md-2">
                                        <input className="form-check-input pointer" type="checkbox" id="flexSwitchCheckDefault" />
                                        <label className="form-check-label pointer" htmlFor="flexSwitchCheckDefault">وضعیت فعال</label>
                                    </div>
                                </div>
                                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                                    <button className="btn btn-primary ">ذخیره</button>
                                </div>

                            </div>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    );
};

export default Addprodect;