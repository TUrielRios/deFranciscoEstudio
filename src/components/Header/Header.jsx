import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../imagenes/logo.png'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} ${menuOpen ? styles.openMenu : ''}`}>
      <Link to="/" className={styles.logo} />
        <div className={styles.menuIcon} onClick={toggleMenu}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
        <div className={styles.navLinks}>

          <Link to="/" onClick={closeMenu}>
            Inicio
          </Link>
          <a href="/#nosotros" onClick={closeMenu}>
            Nosotros
          </a>
          <Link to="/arquitectura" onClick={closeMenu}>
            Arquitectura
          </Link>
          <Link to="/muralismo" onClick={closeMenu}>
            Muralismo
          </Link>
          <Link to="/contacto" onClick={closeMenu}>
            Contacto
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
