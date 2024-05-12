import React from 'react';
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import styles from './TercerContenedor.module.css';
import imagenConstruccion from '../../imagenes/enconstruccion.jpg';
import imagenTerminadas from '../../imagenes/terminadas.jpg';
import imagenMuralismos from '../../imagenes/muralismovertical.png';
import imagenConstruccionMobile from '../../imagenes/enconstruccionmobile.jpg';
import imagenTerminadasMobile from '../../imagenes/menu0.jpg';
import imagenMuralismosMobile from '../../imagenes/muralismo.jpg';

const TercerContenedor = () => {
  return (
    <div className={styles.container}>
      {/* Obras en Construcción */}
      <Fade direction='left'>
        <Link to="/arquitectura/obras-en-construcción" className={styles.item}>
          <img src={window.innerWidth <= 768 ? imagenConstruccionMobile : imagenConstruccion} alt="Obras en Construcción" />
          <h3 className={styles.title}>Obras en Construcción</h3>
        </Link>
      </Fade>

      {/* Obras Terminadas */}
      <Fade direction='down'>
        <Link to="/arquitectura/obras-terminadas" className={styles.item}>
          <img src={window.innerWidth <= 768 ? imagenTerminadasMobile : imagenTerminadas} alt="Obras Terminadas" />
          <h3 className={styles.title}>Obras Terminadas</h3>
        </Link>
      </Fade>

      {/* Muralismos */}
      <Fade direction='right'>
        <Link to="/muralismo" className={styles.item}>
          <img src={window.innerWidth <= 768 ? imagenMuralismosMobile : imagenMuralismos} alt="Muralismos" />
          <h3 className={styles.title}>Muralismos</h3>
        </Link>
      </Fade>
    </div>
  );
};

export default TercerContenedor;
