import React from 'react';
import { useSpring, animated, config } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import styles from './Carrusel.module.css';
import logos from '../../imagenes/LOGOSDONE.png';

const Carrusel = () => {

  const [ref, inView] = useInView()   

  const mainAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { tension: 170, friction: 20 },
  });

  const carruselAnimation = useSpring({
    from: { transform: 'translateX(0%)' },
    to: { transform: 'translateX(-100%)' },
    reset: true,
    reverse: true,
    onRest: () => {
      // Invertir la animación para crear un bucle infinito
      carruselAnimation.reverse();
    },
    config: { ...config.slow, clamp: true },
  });

  return (
    <animated.div id="carrusel" className={`${styles.carruselContainer} ${styles.animated}`} style={mainAnimation} ref={ref}>
      <h1 className={styles.title}>Contratistas y proveedores con quienes trabajamos</h1>
      <div className={styles.logoImageContainer}>
        <animated.div style={{ ...carruselAnimation, display: 'flex' }}>
          <img src={logos} alt="Logos" className={`${styles.logoImage} ${styles.logoImageDuplicate}`}/>
          <img src={logos} alt="Logos" className={`${styles.logoImage} ${styles.logoImageDuplicate}`} />
        </animated.div>
      </div>
    </animated.div>
  );
};

export default Carrusel;
