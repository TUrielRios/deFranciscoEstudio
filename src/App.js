import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Arquitectura from './pages/Arquitectura/Arquitectura';
import Landing from './pages/Landing/Landing';
import { Route, Routes, useLocation } from 'react-router-dom';
import ObrasTerminadas from './pages/ObrasTerminadas/ObrasTerminadas';
import AllObras from './pages/AllObras/AllObras';
import Detail from './pages/DetailObra/DetailObra';
import Muralismos from './pages/Muralismos/Muralismos';
import ObrasEnConstruccion from './pages/ObrasEnConstruccion/ObrasEnConstruccion';
import Admin from './pages/Admin/Admin';
import Header2 from './components/Header2/Header2';
import ContactoPage from './pages/ContactoPage/ContactoPage';
import Error404 from './components/Error404/Error404';

function App() {
  const location = useLocation();
  const [showHeader2, setShowHeader2] = useState(false);

  // Use useEffect to update the state when the location changes
  useEffect(() => {
    // Check if the current location is not the home page
    setShowHeader2(location.pathname !== '/');
  }, [location.pathname]);

  return (
    <div className='App'>
      {showHeader2 ? <Header2 /> : <Header />}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/arquitectura" element={<Arquitectura />} />
        <Route exact path="/arquitectura/obras-terminadas" element={<ObrasTerminadas />} />
        <Route exact path="/arquitectura/obras-en-construcción" element={<ObrasEnConstruccion />} />
        <Route exact path="/arquitectura/copia-de-polyfilm" element={<AllObras />} />
        <Route exact path="/arquitectura/obras/:id" element={<Detail />} />
        <Route exact path="/muralismo" element={<Muralismos />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/contacto" element={<ContactoPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
