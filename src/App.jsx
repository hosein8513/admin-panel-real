import React from 'react';
import Index from '../layout/admin';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Authlayout from '../layout/auth/Authlayout';

const App = () => {
  const location = useLocation()
  return (
    <div>
      {location.pathname.includes("/auth")?<Authlayout/>:
<Index/>
}
    </div>
  );
};

export default App;