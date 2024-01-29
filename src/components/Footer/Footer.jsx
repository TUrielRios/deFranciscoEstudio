// Footer.js
import React from 'react';
import styles from './Footer.module.css'; // Asegúrate de tener un módulo de estilos para el footer
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../../imagenes/fondoOriginal.png'

const Footer = () => {
  const emailAddress = 'defranciscoestudio@gmail.com';

  return (
    <div className={styles.footerContainer}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo de la empresa" />
      </div>
      <div className={styles.contactInfo}>
        <div className={styles.contactTel}>
          <FaPhone />
          <p>+54 9 11 3439-2837 / +54 9 11 6791-3258</p>
        </div>
        <div>
          <FaEnvelope />
          {/* Agrega el enlace mailto al correo electrónico */}
          <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
        </div>
        <div>
          <FaMapMarkerAlt />
          <p>Buenos Aires, Argentina</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
