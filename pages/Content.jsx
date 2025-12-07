import React, { useContext } from 'react';
import { Admincontext } from '../layout/assets/context/admincontext';
import Category from './category/Category';
import Product from './product/Product';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';

const Content = () => {
    const { showSidebar } = useContext(Admincontext)

    return (
        <div>
            <section id="content_section" className={`bg-light py-2 px-3 ${showSidebar ? "with_sidebar" : null}`}>
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/categories' element={<Category />} />
                    <Route path='/products' element={<Product />} />
                    <Route path='*' element={<Dashboard />} />

                </Routes>
            </section>
        </div>
    );
};

export default Content;