import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { getPermitions } from '../../src/services/users';

const Permitiontable = () => {
    const [data,setData] = useState([])
    const [loading,setloading] = useState(false)
    const datainfo =[
        {field:'id',title:'#'},
        {field:'title',title:'عنوان'},
        {field:'description',title:'توضیحات'},
        {field:'category',title:'عنوان دسته'},
    ]
     const searchparams = {
        title: "جستجو",
        placeholder: "قسمتی ازعنوان را وارد کنید",
        searchfield: "description"
    }
    const handleGetPermitions = async()=>{
        setloading(true)
        const res = await getPermitions()
        res && setloading(false)
        if(res.status == 200){
            setData(res.data.data)
        }
    }
    useEffect(()=>{
        handleGetPermitions()
    },[])
    return (
        <>
            <Table
            data={data}
            datainfo={datainfo}
            numofpage={7}
            searchparams={searchparams}
            loading={loading}
            ></Table>
        </>
    );
};

export default Permitiontable;