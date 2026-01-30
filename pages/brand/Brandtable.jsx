import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import Addbrand from './Addbrand';
import { apiPath } from '../../src/services/httpservice';
import { deleteBrand, getAllBrands } from '../../src/services/brands';
import Action from './addishions/Action';
import { Confirm } from '../../utills/Alert';

const Brandtable = () => {
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(false)
    const [editBrand,setEditBrand] = useState(null)
    
    const datainfo = [
        { field: "id", title: "#" },
        {field:'original_name',title:'عنوان لاتین'},
        { field: "persian_name", title: "عنوان فارسی" },
        { field: "descriptions", title: "توضیحات" },
        {field:null, title: "لوگو",
            elements: (rowdata) =>
                rowdata.logo ? <img src={apiPath + '/' + rowdata.logo} width='40' /> : null},
            {field:null ,title: "عملیات",
            elements: (rowdata) => <Action rowdata={rowdata} setEditBrand={setEditBrand} handledeletebrand={handledeletebrand}/>}
    ]
    const searchparams = {
        title: "جستجو",
        placeholder: "قسمتی ازعنوان را وارد کنید",
        searchfield: "original_name"
    }
    
    const handlegetbrands = async () => {
        setloading(true)
        const res = await getAllBrands()
        res && setloading(false)
        if (res.status == 200) {
            setdata(res.data.data)
        }
    }
    const handledeletebrand = async(brand)=>{
        if(await Confirm('با موفقیت حذف شد',`برند ${brand.original_name}با موفقیت حذف شد`)){
            const res = await deleteBrand(brand.id)
            if(res.status == 200){
                setdata((last)=>last.filter((d)=>d.id != brand.id))
            }
        }
    }
useEffect(()=>{
    handlegetbrands()
},[])
    return (
        <>
            <Table datainfo={datainfo} searchparams={searchparams}  numofpage={3} data={data} loading={loading}>
                <Addbrand setdata={setdata} editBrand={editBrand}setEditBrand={setEditBrand}/>
            </Table>
        </>
    );
};

export default Brandtable;