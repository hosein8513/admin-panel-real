import React, { useEffect, useState } from 'react';
import Action from './addition/Action';
import { Confirm } from '../../utills/Alert';
import Table from '../../components/Table';
import Addrole from './Addrole';
import Addbutton from '../../components/Addbutton';
import { Outlet } from 'react-router-dom';
import { deleteRoles, getRoles } from '../../src/services/users';

const Roletable = () => {
    const [data, setData] = useState([])
    const [loading, setloading] = useState(false)
    const datainfo = [
        { field: 'id', title: '#' },
        { field: 'title', title: 'عنوان' },
        { field: 'description', title: 'توضیحات' },
        {
            field: null, title: 'عملیات', elements: (rowdata) =>  <Action rowdata={rowdata} handledeleteRole={handledeleteRole} /> 
        }
    ]
    const searchparams = {
        title: "جستجو",
        placeholder: "قسمتی ازعنوان را وارد کنید",
        searchfield: "title"
    }
    const handlegetRole = async () => {
        setloading(true)
        const res = await getRoles()
        res && setloading(false)
        if (res.status == 200) {
            setData(res.data.data)
        }
    }
    const handledeleteRole = async (role) => {
        if (await Confirm('با موفقیت حذف شد', `نقش ${role.title}  با موفقیت حذف شد`)) {
            const res = await deleteRoles(role.id)
            if (res.status == 200) {
                setData((last) => last.filter((d) => d.id != role.id))
            }
        }
    }
    useEffect(() => {
        handlegetRole()
    }, [])
    return (
        <>
            <Table
                data={data}
                loading={loading}
                searchparams={searchparams}
                numofpage={7}
                datainfo={datainfo}
            >
                <Addbutton href={'/roles/add-role'} />
                <Outlet context={{ setData }} />
            </Table>
        </>
    );
};

export default Roletable;