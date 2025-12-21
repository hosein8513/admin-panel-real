import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { getcategoryservice } from '../../src/services/category';
import { elements } from 'chart.js';
import Showinmenu from './additions/Showinmenu';
import Actions from './additions/Actions';
import {  useParams } from 'react-router-dom';
import { createdate } from '../../utills/createdate';
import Addcategory from './Addcategory';

const Categotytable = ({ numofpage }) => {
    const params = useParams()
    const [data, setdata] = useState([])
    const [loading,setloading] = useState(false)
    const [forceRender, setForceRender] = useState(0)
    const handlegetcategories = async () => {
        setloading(true)
        try {
            const res = await getcategoryservice(params.categoryId)
            if (res.status == 200) {
                setdata(res.data.data)
            }

        } catch (error) {
            console.log(error);

        }
        finally{
            setloading(false)
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


            <Table data={data} datainfo={datainfo} additionalfield={additionalfield} searchparams={searchparams} numofpage={numofpage} elements={elements} loading={loading}>

            </Table>

        </>
    );
};

export default Categotytable;