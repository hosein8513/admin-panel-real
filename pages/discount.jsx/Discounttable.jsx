import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { createdate } from '../../utills/createdate';
import Addbutton from '../../components/Addbutton';
import { Outlet } from 'react-router-dom';
import { getDiscount } from '../../src/services/discount';
import Action from './addition/Action';


const Discounttable = () => {
    const[data,setData] = useState([])
    const [loading,setloading] = useState(false)
    const [editCode,setEditCode] = useState(null)

    const dataInfo = [
        {field:'id',title:'#'},
        {field:'title',title:'عنوان'},
        {field:'code',title:'کد تخفیف'},
        {field:'percent',title:'درصد تخفیف'},
         {
      field: null,
      title: "تاریخ انقضا",
      elements: (rowData) => createdate(rowData.expire_at) ,
    },
    {
      field: null,
      title: "وضعیت",
      elements: (rowData) =>Number( rowData.is_active)===1 ? "فعال" : "غیرفعال",
    },
    {
      field: null,
      title: "مربوط به",
      elements: (rowData) => Number(rowData.for_all)===1 ? "همه" : "تعدادی از محصولات",
    },
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => <Action rowData={rowData}/>,
    },
    ]
     const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchfield: "title",
  };
  const handleGetDiscount = async ()=>{
    setloading(true)
    const res = await getDiscount()
    setloading(false)
    if(res.status == 200){
      setData(res.data.data)
    }
  }
  useEffect(()=>{
    handleGetDiscount()
  },[])
    return (
        <>
            <Table data={data} datainfo={dataInfo} numofpage={2} searchparams={searchParams} loading={loading}>
              <Addbutton href={'/discount/add-discount-code'}/>
              <Outlet context={{setData}}/>
            </Table>
        </>
    );
};

export default Discounttable;