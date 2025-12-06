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

                        <Sidebaritem title="داشبورد" icon=" fas fa-tachometer-alt" />
                        {/* <!-- =================================== --> */}
                        <Grouptitle title="فروشگاه" />

                        <Sidebaritem title="مدیریت گروه محصول" icon="fas fa-stream" />
                        <Sidebaritem title="مدیریت محصول" icon="fas fa-cube" />
                        <Sidebaritem title="مدیریت برند ها" icon=" fas fa-copyright" />
                        <Sidebaritem title="مدیریت گارانتی ها" icon=" fab fa-pagelines" />
                        <Sidebaritem title="مدیریت رنگ ها" icon="fas fa-palette" />
                        <Sidebaritem title="مدیریت تخفیف ها" icon="fas fa-percentage" />

                        {/* <!-- =================================== --> */}
                        <Grouptitle title="سفارشات و سبد" />
                        <Sidebaritem title="مدیریت سبد ها" icon="fas fa-shopping-basket" />

                        <Sidebaritem title="مدیریت سفارشات" icon="fas fa-luggage-cart" />
                        <Sidebaritem title="مدیریت نحوه ارسال" icon="fas fa-truck-loading" />



                        {/* <!-- =================================== --> */}
                        <Grouptitle title="کاربران و همکاران" />
                        <Sidebaritem title="مشاهده کاربران" icon="fas fa-users" />
                        <Sidebaritem title="نقش ها" icon="fas fa-user-tag" />
                        <Sidebaritem title="مجوز ها" icon="fas fa-shield-alt" />


                        {/* <!-- =================================== --> */}
                        <Grouptitle title="ارتباطات" />
                        <Sidebaritem title="سوال ها" icon=" fas fa-question-circle " />
                        <Sidebaritem title="نظرات" icon="fas fa-comment" />


                    </div>
                </div>
            </section>
        </div>
    );
};

export default Sidebar;