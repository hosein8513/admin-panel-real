import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import Addcolor from './Addcolor';
import { deleteColor, getColor } from '../../src/services/color';
import { Confirm } from '../../utills/Alert';
import Action from './addition/Action';

const Colortable = () => {
    const [data, setdata] = useState([])
        const [loading, setloading] = useState(false)
        const [editColor,setEditcolor] = useState(null)
    const datainfo = [
       {field:'id',title:'#'},
       {field:'title',title:'عنوان رنگ'},
       {field:'code',title:'کد رنگ'}
    ]
    const searchparams = {
        title: "جستجو",
        placeholder: "قسمتی ازعنوان را وارد کنید",
        searchfield: "title"
    }
    const additionalfield = [
        {
            title: "عملیات",
            elements: (rowdata) => <Action rowdata={rowdata} setEditcolor={setEditcolor} handledeletecolor={handledeletecolor}/>
        }
    ]
 const handlegetcolor = async () => {
        setloading(true)
        const res = await getColor()
        res && setloading(false)
        if (res.status == 200) {
            setdata(res.data.data)
        }
    }
     const handledeletecolor = async(color)=>{
            if(await Confirm('با موفقیت حذف شد',`رنگ ${color.title} با موفقیت حذف شد`)){
                const res = await deleteColor(color.id)
                if(res.status == 200){
                    setdata((last)=>last.filter((d)=>d.id != color.id))
                }
            }
        }
    useEffect(()=>{
        handlegetcolor()
    },[])
    return (
        <>
          <Table datainfo={datainfo} searchparams={searchparams} additionalfield={additionalfield} numofpage={3} data={data} loading={loading}>
            <Addcolor setdata={setdata} editColor={editColor} setEditcolor={setEditcolor}/>
          </Table>
        </>
    );
};

export default Colortable;