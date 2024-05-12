import React from 'react';
import { useSelector } from 'react-redux';

import styles from './Nosotros.module.css';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated, useTrail } from 'react-spring';
import Carrusel from '../Carrusel/Carrusel';
import Contacto from '../Contacto/Contacto'
import Footer from '../Footer/Footer'

const Nosotros = () => {
  const [ref, inView] = useInView();
  const { employees } = useSelector((state) => state.employee);

  // Ordenar empleados por la posición
  const sortedEmployees = employees ? [...employees].sort((a, b) => a.posicion - b.posicion) : [];

  // Configuración de la animación principal
  const mainAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { tension: 170, friction: 20 },
  });

  // Configuración de la animación de las letras
  const trailAnimation = useTrail(sortedEmployees.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    config: { tension: 170, friction: 20 },
    delay: 300,
  });

  return (
    <div className={styles.mainContainerNos}>
        <animated.div id="nosotros" className={`${styles.nosotrosSection} ${styles.animated}`} style={mainAnimation} ref={ref}>
      <div className={styles.content}>
        <h1>Equipo De Francisco</h1>
        <p>
          Acompañamos y guiamos a nuestros clientes en todo el proceso de obra, desde la planificación, la factibilidad, los croquis
          preliminares, proyecto, dirección, conducción y administración. Contamos con experiencia y formación profesional en dibujo técnico,
          artístico, perspectivista, diseño gráfico, muralista, maquetista, renders y animaciones 3D.
        </p>
        <section className={styles.empleadoContainer}>
          {sortedEmployees.length > 0 &&
            trailAnimation.map((props, index) => (
              <animated.article key={sortedEmployees[index].id} className={`${styles.empleadoItem}`} style={props}>
                <img src={sortedEmployees[index].foto} alt="Empleado" />
                <span className={styles.nombreCompleto}>{sortedEmployees[index].nombre_completo}</span>
                <br />
                <span className={styles.cargo}>{sortedEmployees[index].cargo}</span>
                <br />
                {sortedEmployees[index].cedula_a && (
                  <span className={styles.cedulaA}>Cédula A: {sortedEmployees[index].cedula_a}</span>
                )}
                <br />
                {sortedEmployees[index].cedula_b && (
                  <span className={styles.cedulaB}> Cédula B: {sortedEmployees[index].cedula_b}</span>
                )}
              </animated.article>
            ))}
        </section>
      </div>
    </animated.div>
      <Carrusel/>
      <Contacto />
      <div className={styles.footerNos}>
      <Footer />
      </div>
      
    </div>
    

  );
};

export default Nosotros;
