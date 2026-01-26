import { useEffect, useState } from 'react';
import Modals from '../../components/Modals';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { initialValues, onSubmit, validationSchema } from './core';
import Formikcontrol from '../../components/form/Formikcontrol';
import SubmitButton from '../../components/form/Submitbutton';
import { getAllProductTitles } from '../../src/services/product';
import { createdate } from '../../utills/createdate';

const Adddiscount = () => {
    const navigate = useNavigate()
    const [allproduct, setallproducts] = useState([])
    const [selectedproducts, setselectedproducts] = useState([])
    const [reini,setReIni] = useState(null)
    const location = useLocation()
    const editCode = location.state?.editCode
    const { setData } = useOutletContext()
    const handleGetAllTitles = async () => {
        const res = await getAllProductTitles()
        if (res.status == 200) {
            setallproducts(res.data.data.map(p => { return { id: p.id, value: p.title } }))
        }
    }
    const handleSetProducts = (formik) => {
        const idArr = formik.values.product_ids.split("-").filter(id => id)
        const selectedproductArr = idArr.map(id => allproduct.filter(p => p.id == id)[0])
        return (
            <Formikcontrol
                label='برای'
                control='searchableselect'
                options={allproduct}
                name='product_ids'
                firstItem='محصول مورد نظر را انتخاب کنید'
                resultType='string'
                initialItems={selectedproductArr.length > 0 ? selectedproductArr : selectedproducts}
            />
        )
    }
    useEffect(() => {
        handleGetAllTitles()
        if (editCode) {
            setselectedproducts(editCode.products.map(p => { return { id: p.id, value: p.title } }))
            const productIds = editCode.products.map(p=>p.id).join("-")
            setReIni({
                ...editCode,
                expire_at:createdate(editCode.expire_at,'jD/jM/jYYYY'),
                for_all:editCode.for_all?true:false,
                product_ids:productIds
            })
        }
    }, [])
    return (
        <>
            <Modals
                className='show d-block'
                fullscreen={false}
                id={"add_discount_modal"}
                title={editCode?'ویرایش کد تخفیف':"افزودن تخفیف"}
                closeFunction={() => navigate(-1)}
            >
                <div className="container">
                    <div className="row justify-content-center">
                        <Formik
                            initialValues={ reini||initialValues}
                            onSubmit={(values, actions) => onSubmit(values, actions, setData,editCode)}
                            validationSchema={validationSchema}
                            enableReinitialize
                        >
                            {formik => {
                                return (
                                    <>
                                        <Form>
                                            <div className="col-12">
                                                <Formikcontrol
                                                    control='input'
                                                    name='title'
                                                    type='text'
                                                    label='عنوان تخفیف'
                                                    placeholder='فقط از حروف فارسی و لاتین استفاده کنید'
                                                />
                                            </div>
                                            <div className="col-12 col-md-6 col-lg-8">
                                                <Formikcontrol
                                                    control='input'
                                                    type='text'
                                                    name='code'
                                                    label="کد تخفیف"
                                                    placeholder="فقط از حروف  لاتین و اعداد  استفاده کنید"
                                                />
                                            </div>
                                            <div className="col-12 col-md-6 col-lg-8">
                                                <Formikcontrol
                                                    control='input'
                                                    type='number'
                                                    name='percent'
                                                    label='درصد تخفیف'
                                                    placeholder="فقط از اعداد استفاده کنید"
                                                />
                                            </div>
                                            <div className="col-12 col-md-6 col-lg-8">
                                                <Formikcontrol
                                                    control='date'
                                                    formik={formik}
                                                    name='expire_at'
                                                    label='تاریخ انقضا'
                                                    initialDate={editCode?.expire_at || undefined}
                                                    yearsLimit={{from:10,to:10}}
                                                />
                                            </div>
                                            <div className='row mb-2'>
                                                <div className='col-12 col-md-4'>
                                                    <Formikcontrol
                                                        control='switch'
                                                        name='for_all'
                                                        label='برای همه'
                                                    />
                                                </div>
                                                {!formik.values.for_all ? (
                                                    handleSetProducts(formik)
                                                ) :null }
                                            </div>
                                            <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                                                <SubmitButton />
                                            </div>
                                        </Form>
                                    </>
                                )
                            }}
                        </Formik>
                    </div>
                </div>
            </Modals>
        </>
    );
};

export default Adddiscount;