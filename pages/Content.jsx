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
import Categoryatr from './category/atr/Categoryatr';
import Addprodect from './product/Addprodect';
import SetAttr from './product/attr/SetAttr';
import Gallery from './product/gallery/Gallery';
import Adddiscount from './discount.jsx/Adddiscount';
import Addrole from './roles/Addrole';
import Adduser from './users/Adduser';
import { useHasPermission } from '../src/hooks/permissionsHook';
import PerComponent from '../components/form/PerComponent';


const Content = () => {
    const { showSidebar } = useContext(Admincontext)
    const categoryPermission = useHasPermission('read_categories')
    const discountPermission = useHasPermission('read_discounts')
    const userPermission = useHasPermission('read_users')
    const rolePermission = useHasPermission('read_roles')

    return (
        <div>
            <section id="content_section" className={`bg-light py-2 px-3 ${showSidebar ? "with_sidebar" : null}`}>
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    {categoryPermission && (<Route path='/categories' element={<Category />}>
                        <Route path=':categoryId' element={<Categorychild />} />
                    </Route>)}

                    <Route path='/categories/:categoryId/attributes' element={<PerComponent component={<Categoryatr />} title={'read_category_attr'} />} />
                    <Route path='/products' element={<PerComponent component={<Product />} title={'read_products'} />} />
                    <Route path='/products/add_product' element={<PerComponent component={<Addprodect />} title={'create-product'} />} />
                    <Route path='/colors' element={<PerComponent component={<Colors />} title={'read_colors'}/>} />
                    <Route path='/guaratie' element={<PerComponent component={<Guarantie />} title={'read_guatanties'}/>} />
                    <Route path='/brand' element={<PerComponent component={<Brand />} title={'read_brands'}/>} />
                    <Route path='/products/gallery' element={<PerComponent component={<Gallery />} title={'create_product_image'}/>} />
                    <Route path='/products/set-attr' element={<PerComponent component={<SetAttr />} title={'create_product_attr'}/>} />
                   {discountPermission&&( <Route path='/discount' element={<Discount />} >
                        <Route path='/discount/add-discount-code' element={<PerComponent component={<Adddiscount />} title={'create_discount'}/>} />
                    </Route>)}
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/order' element={<Order />} />
                    <Route path='/delivery' element={<Delivery />} />
                  {userPermission&&(  <Route path='/users' element={<Users />}>
                        <Route path='/users/add-user' element={<PerComponent component={<Adduser />}title={'create_user'}/>} />
                    </Route>)}
                   {rolePermission&&( <Route path='/roles' element={<Roles />}>
                        <Route path='add-role' element={<PerComponent component={<Addrole />}title={'create_role'}/>} />
                    </Route>)}
                    <Route path='/permissions' element={<PerComponent component={<Permitions />} title={'read_permissions'}/>} />
                    <Route path='/questions' element={<Questions />} />
                    <Route path='/comments' element={<Comments />} />
                    <Route path='/logout' element={<Logout />} />

                    <Route path='*' element={<Dashboard />} />
                </Routes>
            </section>
        </div>
    );
};

export default Content;