import React, { useContext } from 'react';
import { Admincontext } from '../layout/assets/context/admincontext';
import Category from './category/Category';
import Product from './product/Product';

const Content = () => {
    const { showSidebar } = useContext(Admincontext)

    return (
        <div>
            <section id="content_section" className={`bg-light py-2 px-3 ${showSidebar ? "with_sidebar" : null}`}>
                {/* <Dashboard/> */}
                <Category />
                {/* <Product/> */}
            </section>
        </div>
    );
};

export default Content;