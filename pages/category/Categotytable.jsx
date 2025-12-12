import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import Categoryatr from './Categoryatr';
import { getcategoryservice } from '../../src/services/category';
import { Alert } from '../../utills/Alert';
import { elements } from 'chart.js';
import Showinmenu from './additions/Showinmenu';
import Actions from './additions/Actions';

const Categotytable = ({numofpage}) => {
    const [data,setdata] = useState([])
    const handlegetcategories = async ()=>{
        try{
            const res = await getcategoryservice(25)
            if(res.status ==200){
                setdata(res.data.data)
            }else{
                Alert(res.data.message,"مشکلی رخ داده")
            }
        }catch{
            Alert("لطفا اتصال خود را بررسی کنید","خطا")
        }
    }
    useEffect(()=>{
        handlegetcategories()
    },[])
    
    const additionalfield = [
        {
            title:"نمایش در منو",
            elements:(rowdata)=><Showinmenu rowdata={rowdata}/>
        },
     {
        title: "عملیات",
        elements: (rowdata) => <Actions rowdata={rowdata}/>
     }
    ]
   
    const datainfo =[
        {field:"id",title:"#"},
        {field:"title",title:"نام محصول"},
        {field:"parent_id",title:" والد"},
        {field:"created_at",title:"تاریخ"}
    ]
    const searchparams ={
        title:"جستجو",
        placeholder:"قسمتی ازعنوان را وارد کنید",
        searchfield:"title"
    }
   
    return (
        <>
        
            <Table data={data} datainfo={datainfo}  additionalfield={additionalfield}  searchparams={searchparams} numofpage={numofpage} elements={elements}/>
        </>
    );
};

export default Categotytable;