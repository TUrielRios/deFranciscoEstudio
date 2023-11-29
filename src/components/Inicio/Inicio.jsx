// Inicio.js
import React from 'react';
import { FaArrowDown } from 'react-icons/fa';
import styles from './Inicio.module.css';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import fondo from '../../imagenes/fondoOriginal.png'
import Nosotros from '../Nosotros/Nosotros';
import Carrusel from '../Carrusel/Carrusel';
import Contacto from '../Contacto/Contacto';
import Footer from '../Footer/Footer';

const Inicio = () => {
  return (
    <div className={styles.inicioSection}>
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
      <Nosotros />
      <Carrusel/>
      <Contacto/>
      <Footer />
    </div>
    
  );
};

export default Inicio;