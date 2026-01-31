import React, { useEffect, useState } from 'react';
import Action from './addition/Action';
import { Confirm } from '../../utills/Alert';
import { deleteDelivery, getDeliveries } from '../../src/services/delivery';
import Table from '../../components/Table';
import Addbutton from '../../components/Addbutton';
import { Outlet } from 'react-router-dom';

const Deliverytable = () => {
    const [data, setData] = useState([])
    const [loading, setloading] = useState(false)

    const dataInfo = [
        { field: 'id', title: '#' },
        { field: 'title', title: "عنوان" },
        { field: 'amount', title: 'هزینه' },
        { field: null, title: 'مدت ارسال', elements: (rowData) => rowData.time + ' ' + rowData.time_unit },
        { field: null, title: 'عملیات', elements: (rowData) => <Action rowData={rowData} handledeleteDelivery={handledeleteDelivery} /> }
    ]

    const searchparams = {
        title: "جستجو",
        placeholder: "قسمتی ازعنوان را وارد کنید",
        searchfield: "title"
    }
    const handledeleteDelivery = async (delivery) => {
        if (await Confirm('با موفقیت حذف شد', `ارسال ${delivery.title} با موفقیت حذف شد`)) {
            const res = await deleteDelivery(delivery.id)
            if (res.status == 200) {
                setData((last) => last.filter((d) => d.id != delivery.id))
            }
        }
    }

    const handleGetDelivery = async () => {
        setloading(true)
        const res = await getDeliveries()
        res && setloading(false)
        if (res.status == 200) {
            setData(res.data.data)
        }
    }

    useEffect(() => {
        handleGetDelivery()
    }, [])
    return (
        <Table data={data} loading={loading} datainfo={dataInfo} searchparams={searchparams} numofpage={5}>
            <Addbutton href={'/deliveries/add-delivery'} />
            <Outlet context={{setData}}/>
        </Table>
    );
};

export default Deliverytable;