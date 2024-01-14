// Nosotros.js
import React from 'react';
import { useSelector } from 'react-redux';

import styles from './Nosotros.module.css'; // Asegúrate de tener un módulo de estilos para Nosotros
import { useInView } from 'react-intersection-observer';
import { useSpring, animated, useTrail } from 'react-spring';
// Importa las acciones y el selector necesarios



const Nosotros = () => {

    const [ref, inView] = useInView()    
    const { employees } = useSelector((state) => state.employee);

  // Configuración de la animación principal
  const mainAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { tension: 170, friction: 20 },
  });

// Configuración de la animación de las letras
const trailAnimation = useTrail(employees?.length || 0, {
  opacity: inView ? 1 : 0,
  transform: inView ? 'translateY(0)' : 'translateY(20px)',
  config: { tension: 170, friction: 20 },
  delay: 300, // Ajusta el tiempo de retraso entre cada letra
});




  return (
    <animated.div id="nosotros" className={`${styles.nosotrosSection} ${styles.animated}`} style={mainAnimation} ref={ref}>
      <div className={styles.content}>
        <h1>Equipo De Francisco</h1>
        <p>
          Acompañamos y guiamos a nuestros clientes en todo el proceso de obra, desde la planificación, la factibilidad, los croquis
          preliminares, proyecto, dirección, conducción y administración. Contamos con experiencia y formación profesional en dibujo técnico,
          artístico, perspectivista, diseño gráfico, muralista, maquetista, renders y animaciones 3D.
        </p>
        <section className={styles.empleadoContainer}>
          {employees && employees.length > 0 && trailAnimation.map((props, index) => (
            <animated.article key={employees[index].id} className={`${styles.empleadoItem}`} style={props}>
              <img src={employees[index].foto} alt="Empleado" />
              <span className={styles.nombreCompleto}>{employees[index].nombre_completo}</span>
              <br />
              <span className={styles.cargo}>{employees[index].cargo}</span>
              <br />
              {employees[index].cedula_a && <span className={styles.cedulaA}>Cédula A: {employees[index].cedula_a}</span>}
              <br />
              {employees[index].cedula_b && <span className={styles.cedulaB}> Cédula B: {employees[index].cedula_b}</span>}
            </animated.article>
          ))}
        </section>
      </div>
    </animated.div>
  );
};

export default Nosotros;
