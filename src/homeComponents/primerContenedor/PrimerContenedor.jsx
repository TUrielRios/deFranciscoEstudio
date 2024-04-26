import React from 'react';
import { Fade } from 'react-awesome-reveal'; // Importa Fade desde react-awesome-reveal
import styles from './PrimerContenedor.module.css';
import imagen1 from '../../imagenes/primercontenedor0.jpg';
import imagen2 from '../../imagenes/primercontenedor2.jpg';
import { Link } from 'react-router-dom';

const PrimerContenedor = () => {
  return (
    <Fade direction="left"> {/* Cambia de 'left' a 'right' */}
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <Fade direction="up"> {/* Cambia de 'top' a 'bottom' */}
            <img src={imagen1} alt="Imagen 1" className={styles.image1} />
          </Fade>
          <Fade direction="down"> {/* Cambia de 'bottom' a 'top' */}
            <img src={imagen2} alt="Imagen 2" className={styles.image2} />
          </Fade>
        </div>
        <div className={styles.rightContainer}>
          <Fade direction="right"> {/* Cambia de 'right' a 'left' */}
            <h3 className={styles.encabezado}>¿Quiénes Somos?</h3>
            <h1 className={styles.title}>de francisco arquitectos</h1>
            <h2 className={styles.subtitle}>Estudio de Arquitectura en <br/> Buenos Aires, Argentina</h2>
            <p className={styles.paragraph}>
            Somos un estudio de arquitectura con más de 40 años de actividad y experiencia en el rubro.
            Nos encontramos en Buenos Aires, Argentina. Pero desarrollamos proyectos para todo el país.
            Abarcamos proyectos de pequeña y mediana escala, tales como remodelaciones y reformas de viviendas unifamiliares, locales comerciales, oficinas y cualquier otro sueño que quieras hacer realidad.
            También tenemos mucha experiencia en proyectos de gran escala, como edificios de propiedad horizontal, plantas industriales, viviendas turísticas multifamiliares, entre otras. 
            Nuestra misión es crear el espacio deseado por cada cliente, pero siempre buscando exprimir las ventajas ocultas de cada sector. Ofrecemos servicios de proyecto, dirección y administración de obra.
              </p>
            <Link to="/nosotros">
              <button className={styles.leerMas}>Saber Más</button>
              </Link>
          </Fade>
        </div>
      </div>
    </Fade>
  );
};

export default PrimerContenedor;
