import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { deleteCategory, getcategoryservice } from '../../src/services/category';
import { elements } from 'chart.js';
import Showinmenu from './additions/Showinmenu';
import Actions from './additions/Actions';
import { Outlet, useParams } from 'react-router-dom';
import { createdate } from '../../utills/createdate';
import Addcategory from './Addcategory';
import { Confirm } from '../../utills/Alert';

const Categotytable = ({ numofpage }) => {
    const params = useParams()
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(false)
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
        finally {
            setloading(false)
        }
    }

    const handleDeleteCategory =async (rowdata) => {
       if(await Confirm("حذف شد", `دسته بندی ${rowdata.title} با موفقیت حذف شد!`)){ 
       const res = await deleteCategory(rowdata.id)
       if(res.status == 200){
        setdata(data.filter(d=>d.id != rowdata.id))}
    }
    }
    useEffect(() => {
        handlegetcategories()
    }, [params, forceRender])


    const datainfo = [
        { field: "id", title: "#" },
        { field: "title", title: "نام محصول" },
        { field: "parent_id", title: " والد" },
        {field:null, title: "تاریخ",
            elements: (rowdata) => createdate(rowdata.create_at)},
        {field:null, title: "نمایش در منو",
            elements: (rowdata) => <Showinmenu rowdata={rowdata} />},
        {field:null, title: "عملیات",
            elements: (rowdata) => <Actions rowdata={rowdata} handleDeleteCategory={handleDeleteCategory} />},
    ]
    const searchparams = {
        title: "جستجو",
        placeholder: "قسمتی ازعنوان را وارد کنید",
        searchfield: "title"
    }

    return (
        <>
            <Outlet />


            <Table data={data} datainfo={datainfo}  searchparams={searchparams} numofpage={numofpage} elements={elements} loading={loading}>

                <Addcategory setForceRender={setForceRender} />
            </Table>

        </>
    );
};

export default Categotytable;