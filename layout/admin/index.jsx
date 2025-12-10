import React from 'react';
import Navbar from "./header/index";
import Sidebar from "./sidebar/index";
import Admincontextcontainer, { Admincontext } from '../assets/context/admincontext';
import Dashboard from '../../pages/dashboard/Dashboard';
import Category from '../../pages/category/Category';
import Content from '../../pages/Content';
import { Navigate } from 'react-router-dom';
import { useIslogin } from '../../src/hooks/Authhook';
const Index = () => {
 const [loading,login] = useIslogin()
  return (
    <Admincontextcontainer>
     {
      loading?(
        <h1 className='p-4 text-center animate-pulse text-gray-600'>لطفا صبر کنید...</h1>
      ):login?(
        <div>

          <Content />
     
          <Navbar />
     
          <Sidebar />
       

        </div>
      ):(
        <Navigate to={'/auth/login'}/>
      )
     }

    </Admincontextcontainer>
  );
};

export default Index;