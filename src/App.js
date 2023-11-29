import './App.css';
import Header from './components/Header/Header';
import Landing from './pages/Landing/Landing';
import { Route,Routes } from 'react-router-dom';


function App() {
  return (
      <div className='App'>
            <Header/>
            <Routes>
        <Route exact path="/" element={<Landing />} />
      </Routes>
      </div>

  );
}

export default App;
