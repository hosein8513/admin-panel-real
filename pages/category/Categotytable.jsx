import React from 'react';
import Table from '../../components/Table';
import Categoryatr from './Categoryatr';

const Categotytable = ({numofpage}) => {
     const additionalelements = () => {
return(
        <>
            <i className="fas fa-project-diagram text-info mx-1 hoverable_text pointer has_tooltip" title="زیرمجموعه" data-bs-toggle="tooltip" data-bs-placement="top"></i>
            <i className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip" title="ویرایش دسته" data-bs-toggle="modal" data-bs-placement="top" data-bs-target="#add_product_category_modal"></i>
            <Categoryatr/>
            <i className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip" title="حذف دسته" data-bs-toggle="tooltip" data-bs-placement="top"></i>
        </>
)
    }
    const additionalfield = {
        title: "عملیات",
        elements: () => additionalelements()
    }
    const data=[
        {id:1,title:"aaa",price:"12000"},
        {id:2,title:"bbb",price:"15000"},
        {id:3,title:"ccc",price:"16000"},
        {id:4,title:"ccc",price:"16000"},
        {id:5,title:"ccc",price:"16000"}
    ]
    const datainfo =[
        {field:"id",title:"#"},
        {field:"title",title:"نام محصول"},
        {field:"price",title:"قیمت محصول"}
    ]
    const searchparams ={
        title:"جستجو",
        placeholder:"قسمتی ازعنوان را وارد کنید",
        searchfield:"title"
    }
   
    return (
        <>
        
            <Table data={data} datainfo={datainfo}  additionalfield={additionalfield}  searchparams={searchparams} numofpage={numofpage}/>
        </>
    );
};

export default Categotytable;