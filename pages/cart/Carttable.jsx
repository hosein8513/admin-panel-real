import React, { useEffect, useState } from 'react';
import {deleteCart, getCarts} from '../../src/services/cart'
import { Confirm } from '../../utills/Alert';
import Tabledata from '../../components/form/Tabledata';
import Addbutton from '../../components/Addbutton';
import { Outlet } from 'react-router-dom';
import Action from './addition/Action';

const Carttable = () => {
  const [data,setData] = useState([])
  const [loading,setloading] = useState(false)
   const [searchChar, setSearchChar] = useState("") 
    const [currentPage, setCurrentPage] = useState(1) 
    const [countOnPage, setCountOnPage] = useState(10) 
    const [pageCount, setPageCount] = useState(0)

  const dataInfo =[
     { field: "id", title: "#" },
      { field: "user_id", title: "آی دی کاربر" },
      {
        field: null,
        title: "نام کاربر",
        elements: (rowData) => `${rowData.user.first_name || ""} ${rowData.user.last_name || ""}`,
      },
      {
        field: null,
        title: "موبایل کاربر",
        elements: (rowData) => rowData.user.phone,
      },
      {
        field: null,
        title: "تعداد کالاها",
        elements: (rowData) => rowData.items.length,
      },
      {
        field: null,
        title: "عملیات",
        elements: (rowData) => <Action rowData={rowData} handleDeleteCart={handleDeleteCart}/>,
      },
  ]

     const searchParams = {
      title: "جستجو",
      placeholder: "قسمتی از شماره تماس کاربر را وارد کنید",
    };

     const handleGetCarts = async (page=currentPage, count=countOnPage, char=searchChar)=>{
      setloading(true)
      const res = await getCarts(page, count, char)
      setloading(false)
      if (res.status === 200) {
        setData(res.data.data.data)
        setPageCount(res.data.last_page)
      }
    }

      const handleSearch = (char)=>{
      setSearchChar(char)
      handleGetCarts(1, countOnPage, char)
    }

     const handleDeleteCart = async (cart)=>{
      if (await Confirm('با موفقیت حذف شد',`سبد خرید  ${cart.user_id}با موفقیت حذف شد`)) {
        const res = await deleteCart(cart.id);
        if (res.status === 200) {
          handleGetCarts(currentPage, countOnPage, searchChar)
        }
      }
    }

    useEffect(()=>{
      handleGetCarts(currentPage,countOnPage,searchChar)
    },[currentPage])
    return (
        <Tabledata
        tableData={data}
        dataInfo={dataInfo}
        searchParams={searchParams}
        loading={loading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
        handleSearch={handleSearch}
        >
        <Addbutton href={'/cart/add-cart'}/>
        <Outlet context={{handleGetCarts}}/>
        </Tabledata>
    );
};

export default Carttable;