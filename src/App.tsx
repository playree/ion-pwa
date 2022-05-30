import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { SideMenuLayout } from './layout/sideMenuLayout';
import { PageTop } from './pages/top';
import { PageQr } from './pages/qr';
import { PageDid } from './pages/did'
import { PageSettings } from './pages/settings'

const App = () => {
  return <BrowserRouter>
    <Routes>
      <Route element={<SideMenuLayout />}>
        <Route index element={<PageTop />} />
        <Route path='qr' element={<PageQr />} />
        <Route path='did' element={<PageDid />} />

        <Route path='settings' element={<PageSettings />} />
      </Route>
    </Routes>
  </BrowserRouter>;
}

export default App;
