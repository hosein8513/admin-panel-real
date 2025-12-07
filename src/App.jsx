import React from 'react';
import Index from '../layout/admin';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Index/>
      </BrowserRouter>
    </div>
  );
};

export default App;