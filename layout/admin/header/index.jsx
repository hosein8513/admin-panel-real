import React, { useContext } from 'react';
import { Admincontext } from '../../assets/context/admincontext';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navber = () => {
    const { setshowsidebar } = useContext(Admincontext)
    const user = useSelector(state => state.userReducer.data)
    return (
        <nav className="navbar fixed-top navbar-dark bg-secondary top_navbar py-0">
            <div className="container-fluid h-100 pe-0">
                {/* right */}
                <div className="right_content h-100 py-1 bg-dark">
                    <a className="navbar-brand h-100" href="/">
                        <img src="/assets/images/logo.png" className="h-100" />
                    </a>
                    <div className="form-check form-switch mx-4 d-none d-md-block">
                        <input id="handle_toggle_sidemenu" className="form-check-input pointer" type="checkbox"
                            onChange={(e) => setshowsidebar(e.target.checked)}
                        />
                    </div>
                </div>

                {/* left */}
                <div className="left_content d-flex flex-row-reverse">
                    <i className="fas fa-grip-vertical fa-2x me-3 pointer" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></i>
                    <ul className="dropdown-menu mini_menu" aria-labelledby="dropdownMenuButton1">
                        <li className="my-2"><a className="dropdown-item d-block text-center">{user?.first_name ?? user?.user_name ?? 'کاربر'}
                        </a></li>
                        <li className="my-2 d-flex justify-content-center align-items-center px-2">
                            <i className="fas fa-tachometer-alt"></i>
                            <a className="dropdown-item" href="#">داشبورد</a>
                        </li>
                        <li className="my-2 d-flex justify-content-center align-items-center px-2">
                            <i className="fas fa-paper-plane"></i>
                            <a className="dropdown-item" href="#">تیکت ها</a>
                        </li>
                        <li className="my-2 d-flex justify-content-center align-items-center px-2">
                            <i className="fas fa-envelope"></i>
                            <a className="dropdown-item" href="#">پیام ها</a>
                        </li>
                        <hr />
                        <li className="d-flex justify-content-center align-items-center px-2">
                            <i className="fas fa-power-off"></i>
                            <Link to={'/logout'} className="dropdown-item">خروج</Link>
                        </li>
                    </ul>
                    <i className="far fa-bell fa-2x mx-3 pointer position-relative">
                        <span className="alarm_count">4</span>
                    </i>
                    <i className="fas fa-search fa-2x mx-3 pointer"></i>
                </div>

            </div>
        </nav>
    );
};

export default Navber;