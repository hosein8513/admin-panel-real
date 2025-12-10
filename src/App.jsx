import React from 'react';
import Index from '../layout/admin';
import { BrowserRouter } from 'react-router-dom';
import Authlayout from '../layout/auth/Authlayout';

const App = () => {
  return (
    <div>
      <Authlayout/>
      {/* <Index/> */}
    </div>
  );
};

export default App;