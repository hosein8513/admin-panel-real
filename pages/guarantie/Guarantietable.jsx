import React, { useEffect, useState } from 'react';
import Action from './adition/Action';
import Table from '../../components/Table';
import { deleteGuarantie, getGuarantie } from '../../src/services/guarantie';
import Addguarantie from './Addguarantie';
import { Confirm } from '../../utills/Alert';

const Guarantietable = () => {
     const [data, setdata] = useState([])
        const [loading, setloading] = useState(false)
        const [editGuaratie,setEditGuarantie] = useState(null)
    const datainfo = [
        { field: "id", title: "#" },
        {field:'title',title:'عنوان گارانتی'},
        { field: "descriptions", title: "توضیحات" },
        {field:'length',title:'مدت گارانتی(به ماه)'},
        {field:'length_unit',title:'واحد گارانتی'}
    ]
    const searchparams = {
        title: "جستجو",
        placeholder: "قسمتی ازعنوان را وارد کنید",
        searchfield: "title"
    }
    const additionalfield = [
        {
            title: "عملیات",
            elements: (rowdata) => <Action rowdata={rowdata} setEditGuarantie={setEditGuarantie} handledeleteguarantie={handledeleteguarantie}/>
        }
    ]
 const handlegetguarantie = async () => {
        setloading(true)
        const res = await getGuarantie()
        res && setloading(false)
        if (res.status == 200) {
            setdata(res.data.data)
        }
    }
     const handledeleteguarantie = async(guarantie)=>{
            if(await Confirm('با موفقیت حذف شد',`گارانتی ${guarantie.title}با موفقیت حذف شد`)){
                const res = await deleteGuarantie(guarantie.id)
                if(res.status == 200){
                    setdata((last)=>last.filter((d)=>d.id != guarantie.id))
                }
            }
        }
    useEffect(()=>{
        handlegetguarantie()
    },[])

    return (
        <>
         <Table datainfo={datainfo} searchparams={searchparams} additionalfield={additionalfield} numofpage={3} data={data} loading={loading}>
            <Addguarantie setdata={setdata} editGuaratie={editGuaratie}
            setEditGuarantie={setEditGuarantie}/>
         </Table>
        </>
    );
};

export default Guarantietable;