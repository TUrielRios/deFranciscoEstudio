import React from 'react';
import { Fade } from 'react-awesome-reveal';
import styles from './QuintoContenedor.module.css';
import imagen1 from '../../imagenes/whyus2.jpg';
import imagen2 from '../../imagenes/whyus1.jpg';

const QuintoContenedor = () => {
  return (
    <Fade direction='left'>
      <div className={styles.container}>
      <div className={styles.rightContainer}>
          <Fade direction='left'>
            <h3 className={styles.encabezado}>¿Por qué elegirnos para tu próximo proyecto?</h3>
            <h1 className={styles.title}>de francisco arquitectos</h1>
            <h2 className={styles.subtitle}>Experiencia, Innovación y Compromiso</h2>
            <p className={styles.paragraph}>En de Francisco, nos enorgullece ofrecer más que solo servicios de arquitectura. Con más de 40 años de experiencia en la industria, hemos perfeccionado nuestro arte y nos hemos convertido en líderes reconocidos en el campo. Nuestro enfoque innovador combina la tradición con la tecnología de vanguardia, garantizando resultados que superan las expectativas en cada proyecto. Nos comprometemos a escuchar tus necesidades, trabajar estrechamente contigo en cada etapa del proceso y entregar soluciones arquitectónicas que reflejen tu visión y estilo únicos. Con nosotros, podés confiar en que tu proyecto estará en las manos más capacitadas y recibirás resultados excepcionales que transformarán tus ideas en realidad.</p>
            <button className={styles.contactUs}>¡Contactanos!</button>
          </Fade>
        </div>
        <div className={styles.leftContainer}>
          <Fade direction='down'>
            <img src={imagen1} alt="Imagen 1" className={styles.image1} />
          </Fade>
          <Fade direction='up'>
            <img src={imagen2} alt="Imagen 2" className={styles.image2} />
          </Fade>
        </div>

      </div>
    </Fade>
  );
};

export default QuintoContenedor;
