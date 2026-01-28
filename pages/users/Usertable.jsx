import React, { useEffect, useState } from 'react';
import Action from './addition/Action';
import { deleteUsers, getUsers } from '../../src/services/users';
import { Confirm } from '../../utills/Alert';
import Tabledata from '../../components/form/Tabledata';
import Addbutton from '../../components/Addbutton';

const Usertable = () => {
    const [data, setData] = useState([])
    const [loading, setloading] = useState(false)
    const [search, setsearch] = useState('')
    const [currentpage, setcurrentpage] = useState(1)
    const [countofpage, setcountofpage] = useState(7)
    const [pagecount, setcount] = useState(0)

    const datainfo = [
        { field: 'id', title: '#' },
        { field: 'user_name', title: 'نام کاربری' },
        { field: 'first_name', title: 'نام' },
        { field: 'last_name', title: 'نام خانوادگی' },
        { field: 'phone', title: 'شماره تلفن' },
        { field: 'email', title: 'ایمیل' },
        {
            field: null, title: 'جنسیت',
            elements: (rowdata) => rowdata.gemder == 1 ? 'اقا' : "خانم"
        }, {
            field: null, title: 'عملیات',
            elements: (rowdata) => <Action rowdata={rowdata} handleDeleteUsers={handleDeleteUsers}/>
        }
    ]
    const searchparams = {
        title: "جستجو",
        placeholder: "قسمتی ازعنوان را وارد کنید",
        searchfield: "user_name"
    }
    const handlegetUsers = async (page, count, char) => {
        setloading(true)
        const res = await getUsers(page, count, char)
        res && setloading(false)
        if (res.status == 200) {
            setData(res.data.data.data)
            setcount(res.data.last_page)
        }
    }

    const handlSearch = (char) => {
        setsearch(char)
        handlegetUsers(1, countofpage, char)
    }

    const handleDeleteUsers = async (user) => {
        if (await Confirm('با موفقیت حذف شد', `گارانتی ${user.title}با موفقیت حذف شد`)) {
            const res = await deleteUsers(user.id)
            if (res.status == 200) {
                setData((last) => last.filter((d) => d.id != user.id))
            }
        }
    }

    useEffect(() => {
        handlegetUsers(currentpage, countofpage, search)
    }, [currentpage])
    return (
        <Tabledata
            tableData={data}
            dataInfo={datainfo}
            searchParams={searchparams}
            loading={loading}
            currentPage={currentpage}
            setCurrentPage={setcurrentpage}
            pageCount={pagecount}
            handleSearch={handlSearch}
        >
            <Addbutton href={'/users/add-user'} />
        </Tabledata>
    );
};

export default Usertable;