// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; // Asegúrate de tener un módulo de estilos para el encabezado
//import logo from '../../imagenes/logo.png'

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>  </Link>
        <div className={styles.navLinks}>
          <Link to="/">Inicio</Link>
          <a href="/#nosotros">Nosotros</a>
          <Link to="/arquitectura">Arquitectura</Link>
          <Link to="/muralismo">Muralismo</Link>
          <a href="/#contacto">Contacto</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
