import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Showinfilter from '../additions/Showinfilter';
import Atraction from '../additions/Atraction';
import Backbutton from '../../../components/Backbutton';
import Table from '../../../components/Table';
import { getCategoryAtr } from '../../../src/services/categoryAtr';

const Categoryatr = () => {
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(false)
    const location = useLocation()

const handlegetatr = async ()=>{
    setloading(true)
    try{
        const res = await getCategoryAtr(location.state.Categorydata.id)
        if(res.status == 200){
            setdata(res.data.data)
        }
    }catch(error){
        console.log(error);
    }finally{
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
                    <div className="row my-3">
                        <div className="col-12 col-md-6 col-lg-4 my-1">
                            <input type="text" className="form-control" placeholder="عنوان ویژگی جدید" />
                        </div>
                        <div className="col-12 col-md-6 col-lg-4 my-1">
                            <input type="text" className="form-control" placeholder="واحد ویژگی جدید" />
                        </div>
                        <div className="col-8 col-lg-2 my-1">
                            <div className="form-check form-switch d-flex justify-content-center align-items-center p-0 h-100">
                                <label className="form-check-label pointer" htmlFor="flexSwitchCheckDefault">نمایش در فیلتر</label>
                                <input className="form-check-input pointer mx-3" type="checkbox" id="flexSwitchCheckDefault" />
                            </div>
                        </div>
                        <div className="col-4 col-lg-2 d-flex justify-content-center align-items-center my-1">
                            <i className="fas fa-check text-light bg-success rounded-circle p-2 mx-1 hoverable_text hoverable pointer has_tooltip hoverable_text" title="ثبت ویژگی" data-bs-toggle="tooltip" data-bs-placement="top"></i>
                        </div>
                    </div>
                    <hr />
                    <Table data={data} datainfo={datainfo} additionalfield={additionalfield} searchparams={searchparams} numofpage={3} loading={loading}>
                        <Backbutton/>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default Categoryatr;