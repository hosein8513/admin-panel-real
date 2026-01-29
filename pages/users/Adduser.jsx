import React, { useEffect, useState } from 'react';
import Modals from '../../components/Modals';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { initailValues, onSubmit, validationSchema } from './core';
import Formikcontrol from '../../components/form/Formikcontrol';
import SubmitButton from '../../components/form/Submitbutton';
import { getRoles, getSingleUser } from '../../src/services/users';
import { createdate } from '../../utills/createdate';

const Adduser = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const userId = location.state?.userId
    const {setData} = useOutletContext()
    const[editUser,setEditUser] = useState(null)
    const[allRoles,setAllRoles] = useState([])
    const[selectedRoles,setSelectedRoles] = useState([])
    const [reIni,setReIni] = useState(null)

    const handleGetRoles = async() =>{
        const res = await getRoles()
        if(res.status == 200){
            setAllRoles(res.data.data.map(r=>{return{id:r.id,value:r.title}}))
        }
    }

    const handleGetUserData = async()=>{
        const res = await getSingleUser(userId)
        if(res.status == 200){
            setEditUser(res.data.data)
        }

    }

    useEffect(()=>{
        handleGetRoles()
        if(userId){
            handleGetUserData()
        }
    },[])

    useEffect(()=>{
        if(editUser){
            setSelectedRoles(editUser.roles.map(r=>{return{id:r.id,value:r.title}}))
            const roles_id = editUser.roles.map(p=>p.id)
            setReIni({birth_date:editUser.birth_date?createdate(editUser.birth_date,'jD/jM/jYYYY'):'',
                roles_id,
                password:'',
                user_name:editUser.user_name || '',
                first_name:editUser.first_name || '',
                last_name:editUser.last_name || '',
                phone:editUser.phone || '',
                email:editUser.email || '',
                gender:editUser.gender || 1
            })
        }
    },[editUser])
    return (
        <>

            <Modals
                className='show d-block'
                fullscreen={true}
                id={"add_user_modal"}
                title={"افزودن کاربر"}
                closeFunction={() => navigate(-1)}
            >
                <Formik
                    initialValues={reIni||initailValues}
                    onSubmit={(values, actions) => onSubmit(values, actions,setData,userId)}
                    validationSchema={validationSchema}
                    enableReinitialize>
                    {formik => (
                        <div className="container">
                            <Form>
                                <div className="row justify-content-center">
                                    <Formikcontrol
                                        className='col-md-8'
                                        control='input'
                                        type='text'
                                        name='user_name'
                                        label='نام کاربری'
                                        placeholder='فقط از حروف فارسی یا لاتین استفاده کنید'
                                    />
                                    <Formikcontrol
                                        className="col-md-8"
                                        control="input"
                                        type="text"
                                        name="first_name"
                                        label="نام "
                                        placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                                    />
                                    <Formikcontrol
                                        className="col-md-8"
                                        control="input"
                                        type="text"
                                        name="last_name"
                                        label="نام خانوادگی"
                                        placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                                    />

                                    <Formikcontrol
                                        className="col-md-8"
                                        control="input"
                                        type="text"
                                        name="phone"
                                        label="شماره موبایل"
                                        placeholder="فقط از اعداد استفاده کنید"
                                    />

                                    <Formikcontrol
                                        className="col-md-8"
                                        control="input"
                                        type="text"
                                        name="email"
                                        label="ایمیل"
                                        placeholder="فقط فرمت ایمیل (email@yourhost.com)"
                                    />

                                    <Formikcontrol
                                        className="col-md-8"
                                        control="input"
                                        type="text"
                                        name="password"
                                        label="کلمه عبور"
                                        placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                                    />

                                    <Formikcontrol
                                        className="col-md-8"
                                        control="date"
                                        formik={formik}
                                        name="birth_date"
                                        label="تاریخ تولد"
                                        initialDate={editUser?editUser.birth_date:undefined}
                                        yearsLimit={{ from: 100, to: -10 }}
                                    />

                                    <Formikcontrol
                                        className="col-md-6 col-lg-8"
                                        control="select"
                                        options={[{ id: 1, value: "مرد" }, { id: 0, value: "زن" }]}
                                        name="gender"
                                        label="جنسیت"
                                    />

                                    <Formikcontrol
                                        label="نقش ها"
                                        className="col-md-6 col-lg-8"
                                        control="searchableselect"
                                        options={allRoles}
                                        name="roles_id"
                                        firstItem="لطفا نقش های مورد نظر را انتخاب کنید"
                                        resultType="array"
                                        initialItems={selectedRoles}
                                    />

                                    <div className="btn_box text-center col-12 mt-4">
                                        <SubmitButton />
                                    </div>

                                </div>
                            </Form>
                        </div>
                    )}

                </Formik>
            </Modals>
        </>
    );
};

export default Adduser;
