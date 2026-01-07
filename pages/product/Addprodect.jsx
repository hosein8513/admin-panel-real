import { useEffect, useState } from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import { initialValue, onSubmit, validationSchema } from './core';
import Formikcontrol from '../../components/form/Formikcontrol';
import { getcategoryservice } from '../../src/services/category';
import Loader from '../../components/Loader';
import Personalerror from '../../components/Personalerror';
import Backbutton from '../../components/Backbutton';
import { getAllBrands } from '../../src/services/brands';
import { getColor } from '../../src/services/color';
import { getGuarantie } from '../../src/services/guarantie';
import SubmitButton from '../../components/form/Submitbutton';
import { useLocation } from 'react-router-dom';

const Addprodect = () => {
    const [parentCategory, setparentCategory] = useState([])
    const [mainCategory, setMainCategory] = useState([])
    const [brands, setbrands] = useState([])
    const [colors, setcolors] = useState([])
    const [guarantee, setguarantee] = useState([])
    const location = useLocation()
const [reini,setreini] = useState(null)
const [selectedCategory,setSelectedCategory] = useState([])
const [selectedColor,setSelectedColor] = useState([])
const [selectedGuarantee,setSelectedGuarantee] = useState([])





    const productToEdit = location.state?.productToEdit

    const getParentCategory = async () => {
        const res = await getcategoryservice()
        if (res.status == 200) {
            setparentCategory(res.data.data.map(d => {
                return { id: d.id, value: d.title }
            }))
        }
    }
    const getAllBrand = async () => {
        const res = await getAllBrands()
        if (res.status == 200) {
            setbrands(res.data.data.map(d => {
                return { id: d.id, value: d.original_name }
            }))
        }
    }
    const getAllColor = async () => {
        const res = await getColor()
        if (res.status == 200) {
            setcolors(res.data.data.map(d => {
                return { id: d.id, value: d.title }
            }))
        }
    }
    const getAllGuarantee = async () => {
        const res = await getGuarantie()
        if (res.status == 200) {
            setguarantee(res.data.data.map(d => {
                return { id: d.id, value: d.title }
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

    const handleSelectedValues = ()=>{
        if(productToEdit){
            setSelectedCategory(productToEdit.categories.map(c=>{return{id:c.id,value:c.title}})),
            setSelectedColor(productToEdit.colors.map(c=>{return{id:c.id,value:c.title}})),
            setSelectedGuarantee(productToEdit.guarantees.map(g=>{return{id:g.id,value:g.title}}))
        }
    }

    useEffect(() => {
        getParentCategory()
        getAllBrand()
        getAllColor()
        getAllGuarantee()
        handleSelectedValues()
        for(const key in productToEdit){
            if(productToEdit[key] === null) 
                {productToEdit[key] = ''}
        }
        if(productToEdit){
            setreini({
                ...productToEdit,
                category_ids:productToEdit.categories?.map(c=>c.id).join('-'),
                color_ids:productToEdit.colors?.map(c=>c.id).join('-'),
                guarantee_ids:productToEdit.guarantee?.map(g=>g.id).join('-') 
            })
        }else{
            setreini(null)
        }
    }, [])






    return (
        <Formik
            initialValues={reini ||initialValue}
            onSubmit={(values, actions) => onSubmit(values, actions,productToEdit)}
            validationSchema={validationSchema}
            enableReinitialize
        >
            {formik => {
                return (
                    <Form>
                        <div className="container">
                            <h4 className='text-center my-3'>{productToEdit?'ویرایش محصول ':'افزودن محصول جدید'}</h4>
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
                                    ) : null}
                                    <Formikcontrol
                                        className='col-12 col-md-6 col-lg-8'
                                        control='searchableselect'
                                        options={typeof (mainCategory) == 'object' ? mainCategory : []}
                                        name='category_ids'
                                        label='دسته اصلی'
                                        firstItem='دسته مورد نظر را انتخاب کنید'
                                        resultType='string'
                                        initialItems={selectedCategory}
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
                                    initialItems={selectedColor}
                                />

                                <Formikcontrol
                                    label='گارانتی'
                                    className='col-md-6 col-lg-8'
                                    control='searchableselect'
                                    options={guarantee}
                                    name='guarantee_ids'
                                    placeholder='گارانتی مورد نظر را انتخاب کنید'
                                    resultType='string'
                                    initialItems={selectedGuarantee}
                                />

                                <Formikcontrol
                                    label='توضیحات'
                                    className='col-md-6 col-lg-8'
                                    control='textarea'
                                    name='descriptions'
                                    placeholder='فقط از حروف و اعداد استفاده کنید'
                                />

                                {productToEdit?(<Formikcontrol
                                    label='تصویر'
                                    className='col-md-6 col-lg-8'
                                    control='file'
                                    name='image'
                                    placeholder='تصویر'
                                />):null}

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
                                    <SubmitButton />
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