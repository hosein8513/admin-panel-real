import React, { useContext } from 'react';
import { Admincontext } from '../../assets/context/admincontext';
import Avatar from './avatar';
import Grouptitle from './Grouptitle';
import Sidebaritem from './Sidebaritem';
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const { showSidebar } = useContext(Admincontext)
    const user = useSelector(state => state.userReducer.data)

    return (
        <div>
            <section id="sidebar_section">
                <div className={`mini_sidebar collapsedd bg-dark h-100 ${showSidebar ? "expanded" : null}`}>
                    <div className="p-0 m-0">
                        <Avatar name={user?.first_name ?? user?.user_name ?? 'کاربر'} imagepath={user?.image || '/assets/images/user(7).png'} />

                        <Sidebaritem targetpath="/" title="داشبورد" icon=" fas fa-tachometer-alt" pTitle="read_" />
                        {/* <!-- =================================== --> */}
                        <Grouptitle title="فروشگاه" pTitles={[
                            "read_categories", "read_products", "read_brands", "read_guaranties", "read_colors", "read_discounts"
                        ]} />

                        <Sidebaritem targetpath="/categories" title="مدیریت گروه محصول" icon="fas fa-stream"  pTitle="read_categories"/>
                        <Sidebaritem targetpath="/products" title="مدیریت محصول" icon="fas fa-cube"  pTitle="read_products" />
                        <Sidebaritem targetpath="/brand" title="مدیریت برند ها" icon=" fas fa-copyright" pTitle="read_brands" />
                        <Sidebaritem targetpath="/guaratie" title="مدیریت گارانتی ها" icon=" fab fa-pagelines"  pTitle="read_guaranties" />
                        <Sidebaritem targetpath="/colors" title="مدیریت رنگ ها" icon="fas fa-palette" pTitle="read_colors" />
                        <Sidebaritem targetpath="/discount" title="مدیریت تخفیف ها" icon="fas fa-percentage"  pTitle="read_discounts" />

                        {/* <!-- =================================== --> */}
                        <Grouptitle title="سفارشات و سبد" pTitles={["read_carts",  "read_orders",  "read_deliveries"]}/>
                        <Sidebaritem targetpath="/cart" title="مدیریت سبد ها" icon="fas fa-shopping-basket" pTitle="read_carts"/>

                        <Sidebaritem targetpath="/order" title="مدیریت سفارشات" icon="fas fa-luggage-cart"  pTitle="read_orders"/>
                        <Sidebaritem targetpath="/delivery" title="مدیریت نحوه ارسال" icon="fas fa-truck-loading"  pTitle="read_deliveries"/>



                        {/* <!-- =================================== --> */}
                        <Grouptitle title="کاربران و همکاران"  pTitles={["read_users",  "read_roles",  "read_permissions"]}/>
                        <Sidebaritem targetpath="/users" title="مشاهده کاربران" icon="fas fa-users"  pTitle="read_users"/>
                        <Sidebaritem targetpath="/roles" title="نقش ها" icon="fas fa-user-tag"  pTitle="read_roles"/>
                        <Sidebaritem targetpath="/permissions" title="مجوز ها" icon="fas fa-shield-alt"  pTitle="read_permissions" />


                        {/* <!-- =================================== --> */}
                        <Grouptitle title="ارتباطات"  pTitles={["read_questions",  "read_comments"]}/>
                        <Sidebaritem targetpath="/questions" title="سوال ها" icon=" fas fa-question-circle " pTitle="read_questions" />
                        <Sidebaritem targetpath="/comments" title="نظرات" icon="fas fa-comment" pTitle="read_comments" />


                    </div>
                </div>
            </section>
        </div>
    );
};

export default Sidebar;