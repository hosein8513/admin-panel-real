import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Showinfilter from '../additions/Showinfilter';
import Atraction from '../additions/Atraction';
import Backbutton from '../../../components/Backbutton';
import Table from '../../../components/Table';
import { deleteCategoryAtr, getCategoryAtr } from '../../../src/services/categoryAtr';
import { Confirm, SuccessAlert } from '../../../utills/Alert';
import Addatr from './Addatr';



const Categoryatr = () => {
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(false)
    const location = useLocation()
    const [editAtr, setEditAtr] = useState(null)
    const [reIni, setReIni] = useState(null)
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

    const handledeleteatr = async (atr) => {



        try {
            
            if (await Confirm("عملیات با موفقیت انجام شد", `ویژگی ${atr.title}با موفقیت حذف شد`)){
                const res = await deleteCategoryAtr(atr.id)
            if (res.status == 200) {
                setdata((last) => [...last].filter(d => d.id != atr.id))
            }}
        } catch (error) {
            console.log(error.message);

        }
    }

    useEffect(() => {
        handlegetatr()

    }, [])
    useEffect(() => {
        if (editAtr) setReIni({
            title: editAtr.title,
            unit: editAtr.unit,
            in_filter: editAtr.in_filter ? true : false

        })
        else {
            setReIni(null)
        }
    }, [editAtr])

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
            elements: (rowdata) => <Atraction rowdata={rowdata} editAtr={editAtr} setEditAtr={setEditAtr} handledeleteatr={handledeleteatr} />
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
                    <Addatr
                        reIni={reIni}
                        editAtr={editAtr}
                        setdata={setdata}
                        setEditAtr={setEditAtr}
                        location={location}
                    />
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