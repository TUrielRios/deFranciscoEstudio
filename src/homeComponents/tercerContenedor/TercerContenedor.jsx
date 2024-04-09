import React from 'react';
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import styles from './TercerContenedor.module.css';
import imagenConstruccion from '../../imagenes/enconstruccion.jpg';
import imagenTerminadas from '../../imagenes/terminadas.jpg';
import imagenMuralismos from '../../imagenes/muralismovertical.png';

const TercerContenedor = () => {
  return (
    <div className={styles.container}>
      <Fade direction='left'>
        <Link to="/arquitectura/obras-en-construcción" className={styles.item}>
          <img src={imagenConstruccion} alt="Obras en Construcción" />
          <h3 className={styles.title}>Obras en Construcción</h3>
        </Link>
      </Fade>
      <Fade direction='down'>
        <Link to="/arquitectura/obras-terminadas" className={styles.item}>
          <img src={imagenTerminadas} alt="Obras Terminadas" />
          <h3 className={styles.title}>Obras Terminadas</h3>
        </Link>
      </Fade>
      <Fade direction='right'>
        <Link to="/muralismo" className={styles.item}>
          <img src={imagenMuralismos} alt="Muralismos" />
          <h3 className={styles.title}>Muralismos</h3>
        </Link>
      </Fade>
    </div>
  );
};

export default TercerContenedor;
