// Footer.js
import React from 'react';
import styles from './Footer.module.css'; // Asegúrate de tener un módulo de estilos para el footer
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../../imagenes/fondoOriginal.png'

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
              <div className={styles.logoContainer}>
        <img src={logo} alt="Logo de la empresa" />
      </div>
      <div className={styles.contactInfo}>
        <div>
          <FaPhone />
          <p>+54 9 11 3439-2837</p>
        </div>
        <div>
          <FaEnvelope />
          <p>defranciscoestudio@gmail.com</p>
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
