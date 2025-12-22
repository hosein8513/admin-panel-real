import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Showinfilter from '../additions/Showinfilter';
import Atraction from '../additions/Atraction';
import Backbutton from '../../../components/Backbutton';
import Table from '../../../components/Table';
import { addCtegoryAtr, getCategoryAtr } from '../../../src/services/categoryAtr';
import { Formik , Form} from 'formik';
import * as Yup from 'yup'
import Formikcontrol from '../../../components/form/Formikcontrol';
import SubmitButton from '../../../components/form/Submitbutton';
import { SuccessAlert } from '../../../utills/Alert';

const initialvalue = {
    title: '',
    unit: '',
    in_filter: ''
}

const onSubmit = async(values, action,id,setdata) => {
try{
    values={
        ...values,
        in_filter:values.in_filter?1:0
    }
    const res = await addCtegoryAtr(id,values)
    if(res.status == 201){
        SuccessAlert("ویژگی با موفقیت اضافه شد")
        setdata(old=>[...old,res.data.data])
    }
}catch(err){
    console.log(err);
    
}
}

const validationSchema = Yup.object({
    title: Yup.string().required('لطفا این قسمت را پر کنید').matches(/^[A-Za-z\u0600-\u06FF\s]+$/, 'فقط از حروف فارسی یا انگلیسی یا اعداد استفاده کنید'),
    unit: Yup.string().required('لطفا این قسمت را پر کنید').matches(/^[A-Za-z0-9\u0600-\u06FF\s]+$/, 'فقط از حروف فارسی یا انگلیسی یا اعداد استفاده کنید'),
    in_filter: Yup.boolean()

})

const Categoryatr = () => {
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(false)
    const location = useLocation()

    const handlegetatr = async () => {
        setloading(true)
        try {
            const res = await getCategoryAtr(location.state.Categorydata.id)
            if (res.status == 200) {
                setdata(res.data.data)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        handlegetatr()

    }, [])

    const datainfo = [
        { field: "id", title: "#" },
        { field: "title", title: "نام محصول" },
        { field: "unit", title: " واحد" },
    ]
    const searchparams = {
        title: "جستجو",
        placeholder: "قسمتی ازعنوان را وارد کنید",
        searchfield: "title"
    }

    const additionalfield = [
        {
            title: "نمایش در فیلتر",
            elements: (rowdata) => <Showinfilter rowdata={rowdata} />
        },
        {
            title: "عملیات",
            elements: (rowdata) => <Atraction rowdata={rowdata} />
        }
    ]

    return (
        <>
            <h4 className='text-center my-3'>مدیریت ویژگی های دسته بندی</h4>
            <h5 className='text-center my-3'>
                ویژگی های
                <span className='text-primary'>
                    {location.state.Categorydata.title}
                </span>
            </h5>
            <div className="container">
                <div className="row justify-content-center">
                    <Formik
                        initialValues={initialvalue}
                        onSubmit={(values, action) => onSubmit(values, action,location.state.Categorydata.id,setdata)}
                        validationSchema={validationSchema}
                    >
                        <Form>
                            <div className="row my-3">
                                <Formikcontrol
                                    control='input'
                                    type='text'
                                    name='title'
                                    label='عنوان'
                                    className='col-md-6 col-lg-4 my-1'
                                    placeholder='عنوان ویژگی جدید'
                                />
                                <Formikcontrol
                                    control='input'
                                    type='text'
                                    name='unit'
                                    label='واحد'
                                    className='col-md-6 col-lg-4 my-1'
                                    placeholder='واحد ویژگی جدید'
                                />
                                <div className='col-8 col-lg-2 my-1'>
                                     <Formikcontrol
                                    control='switch'
                                    name='in_filter'
                                    label='نمایش در فیلتر'
                                />
                                </div>
                               
                                <div className="col-4 col-lg-2 d-flex justify-content-center align-items-center my-1">
                                   <SubmitButton/>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                    <hr />
                    <Table data={data} datainfo={datainfo} additionalfield={additionalfield} searchparams={searchparams} numofpage={3} loading={loading}>
                        <Backbutton />
                    </Table>
                </div>
            </div>
        </>
    );
};

export default Categoryatr;