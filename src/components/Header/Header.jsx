import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { Fade } from 'react-awesome-reveal'; // Importa Fade desde react-awesome-reveal

// Importa tus imágenes aquí
import imagenInicio from '../../imagenes/menu0.jpg'
import imagenNosotros from '../../imagenes/menu1.jpg';
import imagenArquitectura from '../../imagenes/menu2.jpg';
import imagenMuralismo from '../../imagenes/muralismo.jpg';
import imagenContacto from '../../imagenes/menu4.jpg';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }
  }, [menuOpen]);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} ${menuOpen ? styles.openMenu : ''}`}>

        <div className={styles.menuIcon} onClick={toggleMenu}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
        <div className={styles.navLinks}>
          {menuOpen ? (
            <>
              <Fade>
                <div className={styles.menuContainer}>

                <Fade direction="right">
                    <div className={styles.tab}>
                      <Link to="/" onClick={closeMenu}>
                        <div className={styles.tabContent}>
                          <img src={imagenInicio} alt="Inicio" />
                          <span>Inicio</span>
                          <div className={styles.overlay}></div>
                        </div>
                      </Link>
                    </div>
                  </Fade>

                  <Fade direction="left">
                    <div className={styles.tab}>
                      <Link to="/nosotros" onClick={closeMenu}>
                        <div className={styles.tabContent}>
                          <img src={imagenNosotros} alt="Nosotros" />
                          <span>Nosotros</span>
                          <div className={styles.overlay}></div>
                        </div>
                      </Link>
                    </div>
                  </Fade>

                  <Fade direction="right">
                    <div className={styles.tab}>
                      <Link to="/arquitectura" onClick={closeMenu}>
                        <div className={styles.tabContent}>
                          <img src={imagenArquitectura} alt="Arquitectura" />
                          <span>Arquitectura</span>
                          <div className={styles.overlay}></div>
                        </div>
                      </Link>
                    </div>
                  </Fade>
                  <Fade direction="right">
                    <div className={styles.tab}>
                      <Link to="/muralismo" onClick={closeMenu}>
                        <div className={styles.tabContent}>
                          <img src={imagenMuralismo} alt="Muralismo" />
                          <span>Muralismo</span>
                          <div className={styles.overlay}></div>
                        </div>
                      </Link>
                    </div>
                  </Fade>

                  <Fade direction="right">
                  <div className={styles.tab}>
                    <Link to="/contacto" onClick={closeMenu}>
                      <div className={styles.tabContent}>
                        <img src={imagenContacto} alt="Contacto" />
                        <span>Contacto</span>
                        <div className={styles.overlay}></div>
                      </div>
                    </Link>
                  </div>
                  </Fade>
                </div>
              </Fade>
            </>
          ) : (
            <>
              <Link to="/" onClick={closeMenu}>
                Inicio
              </Link>
              <Link to="/nosotros" onClick={closeMenu}>
                Nosotros
              </Link>
              <Link to="/arquitectura" onClick={closeMenu}>
                Arquitectura
              </Link>
              <Link to="/muralismo" onClick={closeMenu}>
                Muralismo
              </Link>
              <Link to="/contacto" onClick={closeMenu}>
                Contacto
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

