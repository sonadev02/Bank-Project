import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from './component/Dashboard';
import Layout from './component/Layout';
import Request from './component/Request';


import Report from './component/Report';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/reportt" element={<Report />} />
            <Route path="/request" element={<Request />} />
         
           
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;




