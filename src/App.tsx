import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { SideMenuLayout } from './layout/sideMenuLayout';
import { PageTop } from './pages/top';
import { PageDid } from './pages/did'

function App() {
  return <BrowserRouter>
    <Routes>
      <Route element={<SideMenuLayout />}>
        <Route index element={<PageTop />} />
        <Route path='did' element={<PageDid />} />
      </Route>
    </Routes>
  </BrowserRouter>;
  // return <PersistentDrawerLeft
  //   menu={<Sidemenu/>}
  //   main={<PageTop/>}
  // />;
}

export default App;
