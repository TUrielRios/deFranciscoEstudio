import React from 'react';
import { Fade } from 'react-reveal';
import styles from './PrimerContenedor.module.css';
import imagen1 from '../../imagenes/primercontenedor0.jpg';
import imagen2 from '../../imagenes/primercontenedor2.jpg';

const PrimerContenedor = () => {
  return (
    <Fade left>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <Fade top>
            <img src={imagen1} alt="Imagen 1" className={styles.image1} />
          </Fade>
          <Fade bottom>
            <img src={imagen2} alt="Imagen 2" className={styles.image2} />
          </Fade>
        </div>
        <div className={styles.rightContainer}>
          <Fade right>
            <h3 className={styles.encabezado}>¿Quiénes Somos?</h3>
            <h1 className={styles.title}>de francisco arquitectos</h1>
            <h2 className={styles.subtitle}>Estudio de Arquitectura en <br/> Buenos Aires, Argentina</h2>
            <p className={styles.paragraph}>Somos un estudio de arquitectura con más de 40 años de experiencia en Buenos Aires, Argentina. Nos especializamos en [especificar áreas de especialización]. Nuestra misión es [insertar misión]. Ofrecemos servicios de [detallar servicios].</p>
            <button className={styles.leerMas}>Leer Más</button>
          </Fade>
        </div>
      </div>
    </Fade>
  );
};

export default PrimerContenedor;
