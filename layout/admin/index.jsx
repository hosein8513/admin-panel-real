import React, { useEffect } from 'react';
import Navbar from "./header/index";
import Sidebar from "./sidebar/index";
import Admincontextcontainer, { Admincontext } from '../assets/context/admincontext';
import Dashboard from '../../pages/dashboard/Dashboard';
import Category from '../../pages/category/Category';
import Content from '../../pages/Content';
const Index = () => {
  useEffect(() => {
    // import('../assets/js/first');
  }, [])
  return (
    <Admincontextcontainer>
      <div>

        <Content />

        <Navbar />

        <Sidebar />
      </div>
    </Admincontextcontainer>
  );
};

export default Index;