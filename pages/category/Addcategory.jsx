import React, { useEffect, useState } from 'react';
import Modals from '../../components/Modals';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import Formikcontrol from '../../components/form/Formikcontrol';
import { getcategoryservice } from '../../src/services/category';
import { Alert } from '../../utills/Alert';

const initialvalue = {
    parent_id: '',
    title: '',
    description: '',
    image: null,
    is_active: true,
    show_in_menu: true,
}
const onsubmit = (values, actions) => {
    console.log(values);
}

const validationschema = Yup.object({
    parent_id: Yup.number(),
    title: Yup.string().required('لطفا این قسمت را پر کنید').matches(/^[A-Za-z\u0600-\u06FF\s]+$/, 'فقط از حروف فارسی یا انگلیسی یا اعداد استفاده کنید'),
    description: Yup.string().matches(/^[A-Za-z0-9\u0600-\u06FF\s]+$/, 'فقط از حروف فارسی یا انگلیسی یا اعداد استفاده کنید'),
    image: Yup.mixed()
        .test(
            "filesize",
            "حجم فایل نمیتواند بیشتر از 500 کیلو بایت باشد",
            (value) => !value ? true : (value.size <= 500 * 1024)
        )
        .test(
            "format",
            "فرمت فایل باید jpg باشد0",
            (value) => !value ? true : (value.type === "image/jpeg")
        ),
    is_active: Yup.boolean(),
    show_in_menu: Yup.boolean()

})




const Addcategory = () => {
    const [parent, setparent] = useState([])
    const handlegetcategoryparent = async () => {
        try {
            const res = await getcategoryservice()
            if (res.status == 200) {
                const allparams = res.data.data

                setparent(allparams.map(p=>{
                    return {id:p.id,value: p.title}
                }))
            }
        } catch (err) {
            Alert("مشکلی در دریافت اطلاعات رخ داده است", "خطا")
        }
    }
    useEffect(()=>{
        handlegetcategoryparent()
    },[])
    return (
        <>


            <Modals
                fullscreen={true}
                id="add_product_category_modal"
                title="افزودن دسته محصولات"
            >
                <Formik
                    initialValues={initialvalue}
                    onSubmit={onsubmit}
                    validationSchema={validationschema}
                >
                    <Form>
                        <div className="container">
                            <div className="row justify-content-center">
                                {parent.length>0?(<Formikcontrol
                                    className="col-md-6 col-lg-8"
                                    control="select"
                                    options={parent}
                                    name="parent_id"
                                    label="دسته والد"
                                />):null}
                                
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
                                <Formikcontrol
                                    className='clo-mg-6 col-lg-8'
                                    control='file'
                                    name='image'
                                    label='تصویر'
                                    placeholder='تصویر'
                                />
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
                                            name='show_in_manu'
                                            label='نمایش در منو'
                                        />
                                    </div>
                                </div>
                                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                                    <button className="btn btn-primary ">ذخیره</button>
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