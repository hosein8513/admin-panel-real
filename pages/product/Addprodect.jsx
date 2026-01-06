import React, { useEffect, useState } from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import { initialValue, onSubmit, validationSchema } from './core';
import Formikcontrol from '../../components/form/Formikcontrol';
import { getcategoryservice } from '../../src/services/category';
import Loader from '../../components/Loader';
import Personalerror from '../../components/Personalerror';
import Backbutton from '../../components/Backbutton';
import Multiselect from '../../components/Multiselect';
import { getAllBrands } from '../../src/services/brands';
import { getColor } from '../../src/services/color';
import { getGuarantie } from '../../src/services/guarantie';
import SubmitButton from '../../components/form/Submitbutton';

const Addprodect = () => {
    const [parentCategory, setparentCategory] = useState([])
    const [mainCategory, setMainCategory] = useState([])
    const [brands,setbrands] = useState([])
    const [colors,setcolors] = useState([])
    const[guarantee,setguarantee] = useState([])
    const getParentCategory = async () => {
        const res = await getcategoryservice()
        if (res.status == 200) {
            setparentCategory(res.data.data.map(d => {
                return { id: d.id, value: d.title }
            }))
        }
    }
const getAllBrand = async ()=>{
    const res = await getAllBrands()    
    if(res.status == 200){        
        setbrands(res.data.data.map(d=>{
            return {id:d.id,value:d.original_name }
    }))
    }
}
const getAllColor = async ()=>{
    const res = await getColor()
    if(res.status == 200){
        setcolors(res.data.data.map(d=>{
            return {id:d.id,value:d.title}
        }))
    }
}
const getAllGuarantee = async()=>{
    const res = await getGuarantie()
    if(res.status == 200){
        setguarantee(res.data.data.map(d=>{
            return {id:d.id,value:d.title}
        }))
    }
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
            setMainCategory([])
        }
    }


    useEffect(() => {
        getParentCategory()
    }, [])

useEffect(()=>{
    getAllBrand()
    getAllColor()
    getAllGuarantee()
},[])

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
                                <Backbutton />
                            </div>
                            <div className="row justify-content-center">


                                <Formikcontrol
                                    className='col-12 col-md-6 col-lg-8'
                                    control='select'
                                    options={parentCategory}
                                    name='parent'
                                    label='دسته والد'
                                    firstItem='دسته مورد نظر را انتخاب کنید'
                                    handleOnchange={hanadlesetmaincategory}
                                />


                                <div className="col-12 col-md-6 col-lg-8">
                                    {mainCategory === 'waiting' ? (
                                        <Loader size={true} color='text-primary' />
                                    ):null} 
                                    <Formikcontrol
                                        className='col-12 col-md-6 col-lg-8'
                                        control='searchableselect'
                                        options={typeof(mainCategory) == 'object'?mainCategory:[]}
                                        name='category_ids'
                                        label='دسته اصلی'
                                        firstItem='دسته مورد نظر را انتخاب کنید'
                                        resultType='string'
                                    />

                                    <ErrorMessage name={'category_ids'} component={Personalerror} />

                                </div>
                                <Formikcontrol
                                label='عنوان'
                                className='col-md-6 col-lg-8'
                                control='input'
                                type='text'
                                name='title'
                                placeholder='فقط از حروف و اعداد استفاده کنید'
                                />
                                <Formikcontrol
                                label='قیمت'
                                className='col-md-6 col-lg-8'
                                control='input'
                                type='number'
                                name='price'
                                placeholder='فقط از اعداد استفاده کنید'
                                />
                                
                                <Formikcontrol
                                label='وزن'
                                className='col-md-6 col-lg-8'
                                control='input'
                                type='number'
                                name='weight'
                                placeholder='فقط از اعداد استفاده کنید(گرم)'
                                />
                                
                                <Formikcontrol
                                label='برند'
                                className='col-md-6 col-lg-8'
                                control='select'
                                options={brands}
                                name='brand_id'
                                placeholder='برند مورد نظر را انتخاب کنید'
                                />
                                <Formikcontrol
                                label='رنگ'
                                className='col-md-6 col-lg-8'
                                control='searchableselect'
                                options={colors}
                                name='color_ids'
                                placeholder='رنگ مورد نظر را انتخاب کنید'
                                resultType='string'
                                />
                            
                                <Formikcontrol
                                label='گارانتی'
                                className='col-md-6 col-lg-8'
                                control='searchableselect'
                                options={guarantee}
                                name='guarantee_ids'
                                placeholder='گارانتی مورد نظر را انتخاب کنید'
                                resultType='string'
                                />
                            
                                <Formikcontrol
                                label='توضیحات'
                                className='col-md-6 col-lg-8'
                                control='textarea'
                                name='descriptions'
                                placeholder='فقط از حروف و اعداد استفاده کنید'
                                />
                                
                                <Formikcontrol
                                label='تصویر'
                                className='col-md-6 col-lg-8'
                                control='file'
                                name='image'
                                placeholder='تصویر'
                                />
                                
                                <Formikcontrol
                                label='توضیح تصویر'
                                className='col-md-6 col-lg-8'
                                control='input'
                                type='text'
                                name='alt_image'
                                placeholder='فقط از حروف و اعداد استفاده کنید'
                                />
                                
                                <Formikcontrol
                                label='کلمات کلیدی'
                                className='col-md-6 col-lg-8'
                                control='input'
                                type='text'
                                name='keywords'
                                placeholder='مثلا :قسمت1قسمت2قسمت3'
                                />
                                
                                <Formikcontrol
                                label='موجودی'
                                className='col-md-6 col-lg-8'
                                control='input'
                                type='number'
                                name='stock'
                                placeholder='فقط از اعداد استقاده کنید'
                                />
                                
                                <Formikcontrol
                                label='درصد تخفیف'
                                className='col-md-6 col-lg-8'
                                control='input'
                                type='number'
                                name='discount'
                                placeholder='فقط از اعداد استقاده کنید'
                                />
                                
                        
                                
                                
                                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                                    <SubmitButton/>
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