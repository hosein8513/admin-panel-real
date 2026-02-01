import React, { useEffect, useState } from 'react';
import Modals from '../../components/Modals';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { getAllProductTitles, getOneProduct } from '../../src/services/product';
import { addCart } from '../../src/services/cart'
import { SuccessAlert } from '../../utills/Alert';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { initialValues, onSubmit, validationSchema } from './core';
// import SelectSearch from 'react-select-search';
// import 'react-select-search/style.css'
import Select from 'react-select';
import Personalerror from '../../components/Personalerror';
import SelectSearchComp from '../../components/form/SelectSearch';
import { numberWithCommas } from '../../utills/numbers';

const Editcart = () => {
    const navigate = useNavigate()
    const { handleGetCarts } = useOutletContext()
    const [allProducts, setAllProducts] = useState([])
    const [currentProduct, setCurrentProduct] = useState(null)
    const [colors, setColors] = useState([])
    const [guarantees, setGuarantees] = useState([])
    const [selectedProducts, setSelectedProducts] = useState([])
    const [selectedProductsInfo, setSelectedProductsInfo] = useState([])

    const handleGetAllProductTitles = async () => {
        const res = await getAllProductTitles();
        if (res.status === 200) {
            setAllProducts(
                res.data.data.map(p => ({
                    label: p.title,
                    value: p.id
                }))
            );
        }
    };


    const handleChangeSelectedProduct = async (option, formik) => {
        if (!option) return;

        formik.setFieldValue('product_id', option.value);

        // reset وابسته‌ها
        formik.setFieldValue('color_id', null);
        formik.setFieldValue('guarantee_id', null);
        setColors([]);
        setGuarantees([]);

        const res = await getOneProduct(option.value);
        if (res.status === 200) {
            const product = res.data.data;
            setCurrentProduct(product);

            setColors(
                product.colors.map(c => ({
                    label: c.title,
                    value: c.id
                }))
            );

            setGuarantees(
                product.guarantees.map(g => ({
                    label: g.title,
                    value: g.id
                }))
            );
        }
    };


    const handleConfirmAddCart = async (formik) => {
        const res = await addCart({
            user_id: formik.values.user_id,
            products: selectedProducts
        })
        if (res.status === 201) {
            SuccessAlert("عملیات با موفقیت انجام شد")
            handleGetCarts()
            navigate(-1);
        }
    }

    const handleDeleteProduct = (id) => {
        const index = selectedProductsInfo.findIndex(p => p.id == id)
        setSelectedProducts(old => old.splice(index, 1))
        setSelectedProductsInfo(old => old.filter(o => o.id != id))
    }

    useEffect(() => {
        handleGetAllProductTitles()
    }, [])
    return (
        <>

            <Modals
                className='show d-block'
                fullscreen={true}
                id={"edit_cart_modal"}
                title={"افزودن سبد خرید"}
                closeFunction={() => navigate(-1)}
            >
                <div className="container">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values, actions) => onSubmit(values, actions, setSelectedProducts, setSelectedProductsInfo, currentProduct)}
                        validationSchema={validationSchema}
                    >
                        {formik => {
                            return (
                                <Form>
                                    <div className="row my-3 justify-content-center">
                                        <div className="col-12 col-md-4 col-lg-2 my-1">
                                            <Field type="text" name="user_id" className="form-control" placeholder="آی دی مشتری" disabled={selectedProducts.length > 0} />
                                            <br />
                                            <ErrorMessage name='user_id' component={Personalerror} />
                                        </div>

                                        <div className="col-12 col-md-4 col-lg-3 my-1">
                                            <Select
                                                options={allProducts}
                                                placeholder="محصول"
                                                value={allProducts.find(p => p.value === formik.values.product_id) || null}
                                                onChange={(option) => handleChangeSelectedProduct(option, formik)}
                                                isClearable
                                            />
                                            <ErrorMessage name="product_id" component={Personalerror} />

                                        </div>

                                        <div className="col-12 col-md-4 col-lg-2 my-1">
                                            <Select
                                                options={colors}
                                                placeholder="رنگ"
                                                value={colors.find(c => c.value === formik.values.color_id) || null}
                                                onChange={(option) =>
                                                    formik.setFieldValue('color_id', option?.value || null)
                                                }
                                                isClearable
                                                isDisabled={!colors.length}
                                            />
                                            <ErrorMessage name="color_id" component={Personalerror} />

                                        </div>

                                        <div className="col-12 col-md-4 col-lg-2 my-1">
                                            <Select
                                                options={guarantees}
                                                placeholder="گارانتی"
                                                value={guarantees.find(g => g.value === formik.values.guarantee_id) || null}
                                                onChange={(option) =>
                                                    formik.setFieldValue('guarantee_id', option?.value || null)
                                                }
                                                isClearable
                                                isDisabled={!guarantees.length}
                                            />
                                            <ErrorMessage name="guarantee_id" component={Personalerror} />

                                        </div>

                                        <div className="col-12 col-md-4 col-lg-2 my-1">
                                            <Field type="number" name="count" className="form-control" placeholder="تعداد" />
                                            <br />
                                            <ErrorMessage name='count' component={Personalerror} />
                                        </div>

                                        <div className="col-4 col-lg-1 d-flex justify-content-center align-items-center my-1">
                                            <i className="fas fa-check text-light bg-success rounded-circle p-2 mx-1 hoverable_text hoverable pointer has_tooltip hoverable_text" title="ثبت فرم" data-bs-toggle="tooltip" data-bs-placement="top" onClick={() => formik.submitForm()}></i>
                                        </div>
                                        <hr className="mt-3" />
                                    </div>
                                    <div className="row justify-content-center">
                                        {
                                            selectedProductsInfo.map(product => (
                                                <div className="col-12 col-md-6 col-lg-4" key={product.id}>
                                                    <div className="input-group my-3 dir_ltr">
                                                        <span className="input-group-text text-end font_08 w-100 text_truncate">
                                                            <i className="fas fa-times text-danger hoverable_text pointer mx-1 has_tooltip" title="حذف محصول از سبد" data-bs-placement="top" onClick={() => handleDeleteProduct(product.id)}></i>
                                                            {product.productName}
                                                            (قیمت واحد: {numberWithCommas(product.price)})
                                                            (گارانتی: {product.guarantee})
                                                            ({product.count} عدد)
                                                            <i className="fas fa-circle mx-1" style={{ color: product.color }}></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <div className='col-12'></div>
                                        {selectedProductsInfo.length > 0 ? (
                                            <>
                                                <div className="col-6">
                                                    <div className="input-group my-3 dir_ltr">
                                                        <span className="input-group-text justify-content-center w-75" >{numberWithCommas(selectedProductsInfo.map(p => p.count * p.price).reduce((a, b) => a + b))}</span>
                                                        <span className="input-group-text w-25 text-center"> جمع کل </span>
                                                    </div>
                                                </div>
                                                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                                                    <button type='button' className="btn btn-primary" onClick={() => handleConfirmAddCart(formik)}>ذخیره</button>
                                                </div>
                                            </>
                                        ) : (<h6 className='text-center text-primary'>محصولات خود را مشخص کنید</h6>)
                                        }
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </Modals >
        </>
    );
};

export default Editcart;