import React from 'react';
import { ErrorMessage, FastField, Field, Form, Formik } from 'formik';
import * as Yup from "yup"
import Authform from '../../components/Authform';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert } from '../../utills/Alert';

const Login = () => {
    const navigate = useNavigate()
    const initialValue = {
        phone: '',
        password: '',
        remember: false
    }
    const onSubmit = (value,navigate) => {
        axios.post('https://ecomadminapi.azhadev.ir/api/auth/login', {
            ...value,
            remember: value.remember ? 1 : 0

        }).then(res => {
            console.log(res);
            if (res.status == 200) {
                localStorage.setItem('localtoken', JSON.stringify(res.data))
                navigate('/')
            }else{
              Alert(res.data.message,"متاسفیم")  
            }
        }).catch(error=>{
            Alert("لطفا اتصال خود را بررسی کنید","خطا")
        })

    }
    const validationSchema = Yup.object({
        phone: Yup.string()
            .required("وارد کردن تلفن اجباری است")
            .matches(/^\d+$/, "تلفن باید فقط عدد باشد"),
        password: Yup.string().required("نوشتن رمز عبور اجباری است"),
        remember: Yup.boolean()

    })
    return (


        <div className="w-8/12 min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-indigo-200 p-6" dir="rtl">
            <Formik
                onSubmit={value=>onSubmit(value,navigate)}
                validationSchema={validationSchema}
                initialValues={initialValue}
                validateOnBlur={true}
                validateOnChange={true}
            >
                {formik => (
                    <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-1">خوش آمدید</h2>
                        <p className="text-sm text-gray-500 mb-6">با حساب خود وارد شوید</p>

                        <Form className="space-y-4 w-full">
                            <Authform
                                formik={formik}
                                name="phone"
                                type="text"
                                control="input"
                                label="تلفن"

                            />

                            <Authform
                                formik={formik}
                                name="password"
                                type="password"
                                control="input"
                                label="رمز عبور"
                            />
                            <Authform
                                formik={formik}
                                name="remember"
                                type="checkbox"
                                control="checkbox"
                                label="مرا به خاطر بسپار"
                            />

                            <div className="flex items-center justify-between">
                                <a href="#" className="text-sm text-indigo-600 hover:underline">رمز عبور را فراموش کرده‌اید؟</a>
                            </div>

                            <div className='p-4'>
                                <button type="submit" className="w-full py-2 rounded-3 text-center bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition">
                                    ورود
                                </button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>

    );
};




export default Login;