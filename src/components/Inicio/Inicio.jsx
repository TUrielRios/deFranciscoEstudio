// Inicio.js
import React, {useEffect} from 'react';
import { FaArrowDown } from 'react-icons/fa';
import styles from './Inicio.module.css';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import fondo from '../../imagenes/fondoOriginal.png'
import Nosotros from '../Nosotros/Nosotros';
import Carrusel from '../Carrusel/Carrusel';
import Contacto from '../Contacto/Contacto';
import Footer from '../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchEmployeesStart,
    fetchEmployeesSuccess,
    fetchEmployeesFailure,
} from '../../redux/features/empleadoSlice';
import logo from '../../imagenes/loader.gif'

const Inicio = () => {

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.employee);

  useEffect(() => {
    const apiUrl = 'https://estudio-backend-ti3p.vercel.app/empleados';

    const fetchData = async () => {
      dispatch(fetchEmployeesStart());

      try {
          const response = await fetch(apiUrl);
          const data = await response.json();
          console.log('Data:', data);  // Log the data
          dispatch(fetchEmployeesSuccess(data));
      } catch (error) {
          console.error('Error:', error);  // Log the error
          dispatch(fetchEmployeesFailure(error.message));
      }
  };

  fetchData();
  }, [dispatch]);

if (error) {
    return <p>Pequeño error, por favor recargue la página!{error}</p>;
}

  return (
    <>
    <div className={styles.inicioSection}>
      {loading ? (
        <div className={styles.containerLoading}>
          <img src={logo} alt="" />
          <p>Aguarde un momento, por favor...</p>
        </div>
      ) : (
        <>
        <div className={styles.main}>
          <div className={styles.backgroundImage}>
              {/* Coloca tu logo u otra imagen de fondo aquí */}
              <img src={fondo} alt="" />
            </div>
            <div className={styles.content}>
              <div className={styles.socialIcons}>
                <a href="https://www.facebook.com/people/Estudio-de-Francisco/100063657481777/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                <a href="https://www.tiktok.com/@arq.defrancisco" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
                <a href="https://www.instagram.com/arq.defrancisco/?hl=es-la" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              </div>
              <div className={styles.scrollDown}>
                <a href="#nosotros"><FaArrowDown /></a>
              </div>
            </div>
        </div>

          <Nosotros />
          <Carrusel />
          <Contacto />
  
          <div className={styles.footerContainerIn}>
            <Footer />
          </div>
        </>
      )}
    </div>
  </>
  

    
  );
};

export default Inicio;