import React, { useContext } from 'react';
import { Admincontext } from '../../assets/context/admincontext';
import Avatar from './avatar';
import Grouptitle from './Grouptitle';
import Sidebaritem from './Sidebaritem';

const Sidebar = () => {
    const { showSidebar } = useContext(Admincontext)
    return (
        <div>
            <section id="sidebar_section">
                <div className={`mini_sidebar collapsedd bg-dark h-100 ${showSidebar ? "expanded" : null}`}>
                    <div className="p-0 m-0">
                        <Avatar name="قاسم بساکی" imagepath="/assets/images/avatar/user2.jpg" />

                        <Sidebaritem targetpath="/" title="داشبورد" icon=" fas fa-tachometer-alt" />
                        {/* <!-- =================================== --> */}
                        <Grouptitle title="فروشگاه" />

                        <Sidebaritem targetpath="/categories" title="مدیریت گروه محصول" icon="fas fa-stream" />
                        <Sidebaritem targetpath="/products" title="مدیریت محصول" icon="fas fa-cube" />
                        <Sidebaritem targetpath="/brand" title="مدیریت برند ها" icon=" fas fa-copyright" />
                        <Sidebaritem targetpath="/guaratie" title="مدیریت گارانتی ها" icon=" fab fa-pagelines" />
                        <Sidebaritem targetpath="/colors" title="مدیریت رنگ ها" icon="fas fa-palette" />
                        <Sidebaritem targetpath="/discount" title="مدیریت تخفیف ها" icon="fas fa-percentage" />

                        {/* <!-- =================================== --> */}
                        <Grouptitle title="سفارشات و سبد" />
                        <Sidebaritem targetpath="/cart" title="مدیریت سبد ها" icon="fas fa-shopping-basket" />

                        <Sidebaritem targetpath="/order" title="مدیریت سفارشات" icon="fas fa-luggage-cart" />
                        <Sidebaritem targetpath="/delivery" title="مدیریت نحوه ارسال" icon="fas fa-truck-loading" />



                        {/* <!-- =================================== --> */}
                        <Grouptitle title="کاربران و همکاران" />
                        <Sidebaritem targetpath="/users" title="مشاهده کاربران" icon="fas fa-users" />
                        <Sidebaritem targetpath="/roles" title="نقش ها" icon="fas fa-user-tag" />
                        <Sidebaritem targetpath="/permissions" title="مجوز ها" icon="fas fa-shield-alt" />


                        {/* <!-- =================================== --> */}
                        <Grouptitle title="ارتباطات" />
                        <Sidebaritem targetpath="/questions" title="سوال ها" icon=" fas fa-question-circle " />
                        <Sidebaritem targetpath="/comments" title="نظرات" icon="fas fa-comment" />


                    </div>
                </div>
            </section>
        </div>
    );
};

export default Sidebar;