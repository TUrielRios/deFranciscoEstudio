import './App.css';
import Header from './components/Header/Header';
import Arquitectura from './pages/Arquitectura/Arquitectura';
import Landing from './pages/Landing/Landing';
import { Route,Routes } from 'react-router-dom';
import ObrasTerminadas from './pages/ObrasTerminadas/ObrasTerminadas';
import AllObras from './pages/AllObras/AllObras';
import Detail from './pages/DetailObra/DetailObra';


function App() {
  return (
      <div className='App'>
        <Header/>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/arquitectura" element={<Arquitectura />} />
          <Route exact path="/arquitectura/obras-terminadas" element={<ObrasTerminadas />} />
          <Route exact path="/arquitectura/copia-de-polyfilm" element={<AllObras />} />
          <Route exact path="/arquitectura/obras-terminadas/:id" element={<Detail />} />

      </Routes>
      </div>

  );
}

export default App;
