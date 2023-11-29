// Nosotros.js
import React from 'react';
import styles from './Nosotros.module.css'; // Asegúrate de tener un módulo de estilos para Nosotros
import { useInView } from 'react-intersection-observer';
import { useSpring, animated, useTrail } from 'react-spring';

const Nosotros = () => {

    const [ref, inView] = useInView()    

    const empleados = [
        {
            id : 1,
            nombre : "Daniel de Francisco",
            foto : "https://static.wixstatic.com/media/4281f1_2beacf418b04498b91e0b511c67c0d3e~mv2.png/v1/fill/w_250,h_250,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/10730833_872580229487366_315352230862814.png",
            cargo: "Arquitecto Urbanista UB",
            extra : "C.P.A.U n° 12987",
            extra1 : "C.A.P.B.A n° 11762"
        },
        {
            id : 2,
            nombre : "Nahuel Ricny",
            foto : "https://static.wixstatic.com/media/4281f1_515523a2f7224c078e98a62df6b611f4~mv2.png/v1/fill/w_250,h_251,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/unnamed_edited_edited.png",
            cargo: "Maestro mayor de obra",
        },
        {
            id : 3,
            nombre : "Guadalupe de Francisco",
            foto : "https://static.wixstatic.com/media/4281f1_fac1cab9fccb4f9e80cf0fa6a4629cc4~mv2.png/v1/fill/w_241,h_250,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/guadi_edited.png",
            cargo: "Arquitecta UBA",
            extra: "C.P.A.U n° 33330"
        },
        {
            id : 4,
            nombre : "Bianca Beccaria",
            foto : "https://static.wixstatic.com/media/4281f1_c1daeddcc1224a13a5eac41bd762d2d6~mv2.png/v1/fill/w_250,h_250,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/bianca_edited.png",
            cargo: "Arquitecta UBA",
        },
        {
            id : 5,
            nombre : "Anabella de Francisco",
            cargo: "Técnica superior en Bellas Artes",
            foto : "https://static.wixstatic.com/media/4281f1_e5291daf75f140a2b4fd78264cb2886b~mv2.png/v1/fill/w_250,h_256,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/anu_edited.png"
        },
        {
            id : 6,
            nombre : "Claudio Ferraro",
            cargo: "Contador público",
            foto : "https://static.wixstatic.com/media/4281f1_0486c01a54db433f969aaf8e9f761e61~mv2.png/v1/fill/w_250,h_256,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/_edited.png"
        }
    ]

  // Configuración de la animación principal
  const mainAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { tension: 170, friction: 20 },
  });

  // Configuración de la animación de las letras
  const trailAnimation = useTrail(empleados.length, {
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
          {trailAnimation.map((props, index) => (
            <animated.article key={empleados[index].id} className={`${styles.empleadoItem}`} style={props}>
              <img src={empleados[index].foto} alt="" />
              <span>{empleados[index].nombre}</span>
              <br />
              <span>{empleados[index].cargo}</span>
              <br />
              <span>{empleados[index].extra}</span>
              <br />
              <span>{empleados[index].extra1}</span>
            </animated.article>
          ))}
        </section>
      </div>
    </animated.div>
  );
};

export default Nosotros;
