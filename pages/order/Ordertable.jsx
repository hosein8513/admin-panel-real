import React, { useEffect, useState } from 'react';
import Orderdetails from './Orderdetails';
import { numberWithCommas } from '../../utills/numbers';
import { Confirm } from '../../utills/Alert';
import Tabledata from '../../components/form/Tabledata';
import Addbutton from '../../components/Addbutton';
import { Outlet } from 'react-router-dom';
import Action from './addition/Action';
import { deleteOrder, getOrders } from '../../src/services/orders'
import { createdate } from '../../utills/createdate';

const Ordertable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchChar, setSearchChar] = useState("")
  const [currentPage, setCurrentPage] = useState(1) // صفحه حال حاضر
  const [countOnPage, setCountOnPage] = useState(10) // تعداد محصول در هر صفحه
  const [pageCount, setPageCount] = useState(0) // تعداد کل صفحات

  const dataInfo = [
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
    { field: "cart_id", title: "کد سبد" },
    {
      field: null,
      title: "تاریخ پرداخت",
      elements: (rowData) => createdate(rowData.pay_at) || ''
    },
    {
      field: null,
      title: "مبلغ پرداختی",
      elements: (rowData) => numberWithCommas(rowData.pay_amount),
    },
    {
      field: null,
      title: "عملیات",
      elements: (rowData) => <Action rowData={rowData} handleDeleteOrder={handleDeleteOrder} />,
    },
  ];

  const searchParams = {
    title: "جستجو",
    placeholder: "قسمتی از شماره تماس کاربر را وارد کنید",
  };

  const handleGetOrders = async (page = currentPage, count = countOnPage, char = searchChar) => {
    setLoading(true)
    const res = await getOrders(page, count, char)
    setLoading(false)
    if (res.status === 200) {
      setData(res.data.data.data)
      setPageCount(res.data.last_page)
    }
  }

  const handleSearch = (char) => {
    setSearchChar(char)
    handleGetOrders(1, countOnPage, char)
  }

  const handleDeleteOrder = async (order) => {
    if (await Confirm('با موفقیت حذف شد', `سبد ${order.id}با موفقیت حذف شد`)) {
      const res = await deleteOrder(order.id);
      if (res.status === 200) {
        setData((last) => last.filter((d) => d.id != order.id))
      }
    }
  }


  useEffect(() => {
    handleGetOrders()
  }, [currentPage])
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
      <Addbutton href={'/order/add-order'} />
      <Outlet context={{ handleGetOrders }} />
    </Tabledata>
  );
};

export default Ordertable;