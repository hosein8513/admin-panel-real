import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import Addbrand from './Addbrand';
import Actions from '../category/additions/Actions';
import { apiPath } from '../../src/services/httpservice';
import { getAllBrands } from '../../src/services/brands';

const Brandtable = () => {
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(false)
    const datainfo = [
        { field: "id", title: "#" },
        {field:'original_name',title:'عنوان لاتین'},
        { field: "persian_name", title: "عنوان فارسی" },
        { field: "descriptions", title: "توضیحات" },
    ]
    const searchparams = {
        title: "جستجو",
        placeholder: "قسمتی ازعنوان را وارد کنید",
        searchfield: "original_name"
    }
    const additionalfield = [
        {
            title: "لوگو",
            elements: (rowdata) =>
                rowdata.logo ? <img src={apiPath + '/' + rowdata.logo} width='40' /> : null
        },
        {
            title: "عملیات",
            elements: (rowdata) => <Actions rowdata={rowdata} />
        }
    ]
    const handlegetbrands = async () => {
        setloading(true)
        const res = await getAllBrands()
        res && setloading(false)
        if (res.status == 200) {
            setdata(res.data.data)
        }
    }
useEffect(()=>{
    handlegetbrands()
},[])
    return (
        <>
            <Table datainfo={datainfo} searchparams={searchparams} additionalfield={additionalfield} numofpage={3} data={data} loading={loading}>
                <Addbrand setdata={setdata} />
            </Table>
        </>
    );
};

export default Brandtable;