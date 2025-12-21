import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import Categoryatr from './Categoryatr';
import { getcategoryservice } from '../../src/services/category';
import { Alert } from '../../utills/Alert';
import { elements } from 'chart.js';
import Showinmenu from './additions/Showinmenu';
import Actions from './additions/Actions';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import jMoment from 'jalali-moment'
import { createdate } from '../../utills/createdate';
import Addcategory from './Addcategory';

const Categotytable = ({ numofpage }) => {
    const params = useParams()
    const location = useLocation()
    const [data, setdata] = useState([])
    const [forceRender, setForceRender] = useState(0)
    const handlegetcategories = async () => {
        try {
            const res = await getcategoryservice(params.categoryId)
            if (res.status == 200) {
                setdata(res.data.data)
            }

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        console.log(params);

        handlegetcategories()
    }, [params, forceRender])

    const additionalfield = [
        {
            title: "تاریخ",
            elements: (rowdata) => createdate(rowdata.create_at)
        },
        {
            title: "نمایش در منو",
            elements: (rowdata) => <Showinmenu rowdata={rowdata} />
        },
        {
            title: "عملیات",
            elements: (rowdata) => <Actions rowdata={rowdata} />
        }
    ]

    const datainfo = [
        { field: "id", title: "#" },
        { field: "title", title: "نام محصول" },
        { field: "parent_id", title: " والد" },
    ]
    const searchparams = {
        title: "جستجو",
        placeholder: "قسمتی ازعنوان را وارد کنید",
        searchfield: "title"
    }

    return (
        <>
            <Addcategory setForceRender={setForceRender} />
            {
                data.length > 0 ? (
                    <Table data={data} datainfo={datainfo} additionalfield={additionalfield} searchparams={searchparams} numofpage={numofpage} elements={elements} >

                    </Table>
                ) :
                    <h5 className='text-center text-red-500'>داده ای یافت نشد</h5>
            }
        </>
    );
};

export default Categotytable;