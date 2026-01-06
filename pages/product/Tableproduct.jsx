import React, { useEffect, useState } from 'react';
import Tabledata from '../../components/form/Tabledata';
import { Confirm } from '../../utills/Alert';
import Addprodect from './Addprodect';
import { deleteProduct, getProduct } from '../../src/services/product';
import Action from './aditions/Action';
import { Link } from 'react-router-dom';
import Addbutton from '../../components/Addbutton';

const Tableproduct = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchChar, setSearchChar] = useState("")
    const [currentPage, setCurrentPage] = useState(1) // صفحه حال حاضر
    const [countOnPage, setCountOnPage] = useState(5) // تعداد محصول در هر صفحه
    const [pageCount, setPageCount] = useState(5) // تعداد کل صفحات

    const dataInfo = [
        { field: "id", title: "#" },
        {
            field: null,
            title: "گروه محصول",
            elements: (rowData) => rowData.categories[0]?.title ?? '',
        },
        {
            field: null,
            title: "توضیحات محصول",
            elements: (rowData) => <span dangerouslySetInnerHTML={{ __html: rowData.descriptions }}></span>,
        },
        { field: "title", title: "عنوان" },
        { field: "price", title: "قیمت" },
        { field: "stock", title: "موجودی" },
        {
            field: null,
            title: "عملیات",
            elements: (rowData) => <Action rowData={rowData} handleDeleteProduct={handleDeleteProduct} />,
        },
    ];
    const searchParams = {
        title: "جستجو",
        placeholder: "قسمتی از عنوان را وارد کنید",
    };

    const handleGetProducts = async (page, count, char) => {
        setLoading(true)
        const res = await getProduct(page, count, char)
        res && setLoading(false)
        if (res.status === 200) {
            setData(res.data.data)
            setPageCount(res.data.last_page)
        }
    }

    const handleSearch = (char) => {
        setSearchChar(char)
        handleGetProducts(1, countOnPage, char)
    }

    const handleDeleteProduct = async (product) => {
        if (await Confirm('عملیات با موفقیت انجام شد', `محصول ${product.title}با موفقیت حذف شد`)) {
            const res = await deleteProduct(product.id);
            if (res.status === 200) {
                handleGetProducts(currentPage, countOnPage, searchChar)
            }
        }
    }

    useEffect(() => {
        handleGetProducts(currentPage, countOnPage, searchChar)
    }, [currentPage])

    return (
        <>
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
                <Addbutton href={'/products/add_product'}/>
            </Tabledata>
        </>
    );
};

export default Tableproduct;