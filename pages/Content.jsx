import React, { useContext } from 'react';
import { Admincontext } from '../layout/assets/context/admincontext';
import Category from './category/Category';
import Product from './product/Product';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Colors from './colors/Colors';
import Guarantie from './guarantie/Guarantie';
import Brand from './brand/Brand';
import Discount from './discount.jsx/Discount';
import Cart from './cart/Cart';
import Order from './order/Order';
import Delivery from './delivery/Delivery';
import Users from './users/Users';
import Roles from './roles/Roles';
import Permitions from './permition/Permitions';
import Questions from './questions/Questions';
import Comments from './comments/Comments';
import Logout from './auth/Logout';
import Categorychild from './category/Categorychild';

const Content = () => {
    const { showSidebar } = useContext(Admincontext)

    return (
        <div>
            <section id="content_section" className={`bg-light py-2 px-3 ${showSidebar ? "with_sidebar" : null}`}>
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/categories' element={<Category />}>
                    <Route path=':categoryId' element={<Categorychild/>}/>
                    </Route>
                    <Route path='/products' element={<Product />} />
                    <Route path='*' element={<Dashboard />} />
                    <Route path='/colors' element={<Colors />} />
                    <Route path='/guaratie' element={<Guarantie/>}/>
                    <Route path='/brand' element={<Brand/>}/>
                    <Route path='/discount' element={<Discount/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/order' element={<Order/>}/>
                    <Route path='/delivery' element={<Delivery/>}/>
                    <Route path='/users' element={<Users/>}/>
                    <Route path='/roles' element={<Roles/>}/>
                    <Route path='/permissions' element={<Permitions/>}/>
                    <Route path='/questions' element={<Questions/>}/>
                    <Route path='/comments' element={<Comments/>}/>
                    <Route path='/logout' element={<Logout/>}/>
                </Routes>
            </section>
        </div>
    );
};

export default Content;