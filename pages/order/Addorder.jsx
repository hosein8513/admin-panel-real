import { useEffect, useState } from 'react';
import Modals from '../../components/Modals';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { getDeliveries } from '../../src/services/delivery';
import { getSingleCart } from '../../src/services/cart';
import { Alert } from '../../utills/Alert';
import { getOneDiscount } from '../../src/services/discount';
import { getSingleOrder } from '../../src/services/orders';
import { createdate } from '../../utills/createdate';
import { initialValues, onSubmit, validationSchema } from './core';
import Formikcontrol from '../../components/form/Formikcontrol';
import { numberWithCommas } from '../../utills/numbers';
import SubmitButton from '../../components/form/Submitbutton';
import { Form, Formik } from 'formik';

const AddOrder = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const selectedOrderId = location.state?.orderId
    const {handleGetOrders} = useOutletContext()
    const [reInitialValues, setReInitialValues] = useState(null)
    const [discountPercent, setDiscountPercent] = useState(0)
    const [allDeliveries, setAllDeliveries] = useState([])
    const [selectedCartItemsInfo, setSelectedCartItemsInfo] = useState([])

    const getAllDeliveries = async ()=>{
        const res = await getDeliveries();
        if (res.status === 200)  setAllDeliveries(res.data.data.map(d=>({id:d.id, value:d.title + "-" + d.amount})));
    }

    const handleGetCartsInfo = async (cartId)=>{
        if (!cartId) return setSelectedCartItemsInfo([])
        const res = await getSingleCart(cartId);
        console.log(res.data);
        if (res.status === 200) {
            console.log(res);
            let products = []
            const cart = res.data.data
            if(cart.is_ordered) {
                setSelectedCartItemsInfo([])
                return Alert('خطا', 'این سبد در سفارش دیگری قرار دارد', 'warning')
            }
            for (const item of cart.items) {
                products.push({
                    id: item.id,
                    product: item.product,
                    guarantee: item.guarantee,
                    color: item.color,
                    count: item.count,
                })
            }
            setSelectedCartItemsInfo(products)
        }
    }

    const handleDiscountInfo = async (discountId)=>{
        if (!discountId) return setDiscountPercent(0)
        const res = await getOneDiscount(discountId)
        if (res.status === 200) setDiscountPercent(res.data.data.percent)
    }

    const getSelectedOrderInfo = async ()=>{
        const res = await getSingleOrder(selectedOrderId)
        if (res.status == 200) {
            const order = res.data.data
            setReInitialValues({
                cart_id: order.cart_id,
                discount_id: order.discount_id || "",
                delivery_id: order.delivery_id,
                address: order.address,
                phone: order.phone,
                email: order.email ||"",
                pay_at: order.pay_at ? createdate(order.pay_at) : "",
                pay_card_number: order.pay_card_number ||"",
                pay_bank: order.pay_bank ||"",
            })
            let products = []
            const cart = order.cart
            console.log(order);
            for (const item of cart.items) {
                products.push({
                    id: item.id,
                    product: item.product,
                    guarantee: item.guarantee,
                    color: item.color,
                    count: item.count,
                    unit_price: item.unit_price
                })
            }
            setSelectedCartItemsInfo(products)
        }
    }


    useEffect(()=>{
        getAllDeliveries()
        selectedOrderId && getSelectedOrderInfo()
    },[])
    
    return (
        <>
            <Modals
            className="show d-block"
            id={"add_order_modal"}
            title={selectedOrderId ? "جزئیات سفارش" :"افزودن سفارش"}
            fullscreen={true}
            closeFunction={()=>navigate(-1)}
            >
                <div className="container">
                    <Formik
                    initialValues={reInitialValues || initialValues}
                    onSubmit={(values, actions)=>onSubmit(values, actions, navigate, handleGetOrders)}
                    validationSchema={validationSchema}
                    enableReinitialize
                    >
                        {formik=>{
                            return (
                                <Form>
                                    <div className="row my-1 justify-content-center">
                                        <Formikcontrol
                                        className="col-12 col-md-4 col-lg-2 my-1"
                                        control="input"
                                        type="number"
                                        name="cart_id"
                                        placeholder="کد سبد"
                                        onBlur={(e)=>handleGetCartsInfo(e.target.value)}
                                        />
                                        <Formikcontrol
                                        className="col-12 col-md-4 col-lg-2 my-1 mini_date_box"
                                        control="date"
                                        formik={formik}
                                        name="pay_at"
                                        placeholder="تاریخ پرداخت"
                                        initialDate={undefined }
                                        yearsLimit={{from: 10, to:0}}
                                        />

                                        <div className="col-12 col-md-4 col-lg-2 my-1">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            value={`مبلغ سبد: ${ selectedCartItemsInfo.length > 0 ? numberWithCommas(selectedCartItemsInfo.map(p=>p.count*(p.unit_price || p.product.price)).reduce((a, b)=>a+b)) : 0}`} 
                                            disabled />
                                        </div>

                                        <Formikcontrol
                                        className="col-12 col-md-4 col-lg-2 my-1"
                                        control="input"
                                        type="number"
                                        name="discount_id"
                                        placeholder="آی دی تخفیف"
                                        onBlur={(e)=>handleDiscountInfo(e.target.value)}
                                        />

                                        <div className="col-12 col-md-4 col-lg-2 my-1">
                                            <input type="text" className="form-control" value={"درصد تخفیف: "+discountPercent} disabled />
                                        </div>


                                        <div className="col-12"></div>
                                        <Formikcontrol
                                        className="col-12 col-md-10 my-1"
                                        control="input"
                                        type="text"
                                        name="address"
                                        placeholder="آدرس"
                                        />
                                        <div className="col-12"></div>

                                        <Formikcontrol
                                        className="col-12 col-md-4 col-lg-2 my-1"
                                        control="select"
                                        options={allDeliveries}
                                        name="delivery_id"
                                        firstItem="روش ارسال"
                                        />

                                        <Formikcontrol
                                        className="col-12 col-md-4 col-lg-2 my-1"
                                        control="input"
                                        type="text"
                                        name="phone"
                                        placeholder="شماره تماس"
                                        />

                                        <Formikcontrol
                                        className="col-12 col-md-4 col-lg-2 my-1"
                                        control="input"
                                        type="text"
                                        name="email"
                                        placeholder="ایمیل"
                                        />

                                        <Formikcontrol
                                        className="col-12 col-md-4 col-lg-2 my-1"
                                        control="input"
                                        type="nomber"
                                        name="pay_card_number"
                                        placeholder="شماره کارت"
                                        />

                                        <Formikcontrol
                                        className="col-12 col-md-4 col-lg-2 my-1"
                                        control="input"
                                        type="text"
                                        name="pay_bank"
                                        placeholder="نام بانک"
                                        />

                                        <hr className="mt-3" />
                                    </div>

                                    <div className='row'>
                                        {
                                            selectedCartItemsInfo.map(item=>(
                                                <div className="col-12 col-md-6 col-lg-4" key={item.id}>
                                                    <div className="input-group my-3 dir_ltr">
                                                        <span className="input-group-text text-end font_08 w-100 text_truncate">
                                                            {item.product.title}
                                                            (قیمت واحد: {numberWithCommas(item.unit_price || item.product.price)})
                                                            (گارانتی: {item.guarantee?.title})
                                                            ({item.count} عدد)
                                                            <i className="fas fa-circle mx-1" style={{ color: item.color?.code }}></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>

                                    {
                                        (selectedCartItemsInfo.length > 0 && !selectedOrderId) && (
                                            <div className="btn_box text-center col-12 mt-4">
                                                <SubmitButton />
                                            </div>
                                        )
                                    }

                                </Form>
                            )
                        }}
                    </Formik>
                </div>


            </Modals>

        </>

    );
}

export default AddOrder;