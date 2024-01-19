import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Carrusel.module.css';
import logo1 from '../../imagenes/contratistas/1.png';
import logo2 from '../../imagenes/contratistas/2.png';
import logo3 from '../../imagenes/contratistas/3.png';
import logo4 from '../../imagenes/contratistas/4.png';
import logo5 from '../../imagenes/contratistas/5.png';
import logo6 from '../../imagenes/contratistas/6.png';
import logo7 from '../../imagenes/contratistas/7.png';
import logo8 from '../../imagenes/contratistas/8.png';
import logo9 from '../../imagenes/contratistas/9.png';
import logo10 from '../../imagenes/contratistas/10.png';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated, useTrail } from 'react-spring';

const Carrusel = () => {
  // Lista de URLs de imágenes de los contratistas
  const [ref, inView] = useInView();

  const contractorLogos = [
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo6,
    logo7,
    logo8,
    logo9,
    logo10
  ];

  // Configuración del carrusel
  const settings = {
    dots: false,
    infinite: true,
    speed: 10000,
    slidesToShow: 5, // Puedes ajustar la cantidad de logos visibles a la vez
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 0, // Controla la velocidad de reproducción
    arrows: false
  };

    // Configuración de la animación principal
    const mainAnimation = useSpring({
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(50px)',
      config: { tension: 170, friction: 20 },
    });
  
    // Configuración de la animación de las imágenes del carrusel
    const trailAnimation = useTrail(contractorLogos.length, {
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(20px)',
      config: { tension: 170, friction: 20 },
      delay: 300,
    });
  
    return (
      <animated.div id="carrusel-container" className={`${styles.container} ${styles.animated}`} style={mainAnimation} ref={ref}>
        <h1 className={styles.title}>Contratistas y proveedores con los que trabajamos</h1>
        <Slider {...settings} className={`${styles.slider} ${styles.animated}`}>
          {contractorLogos.map((logo, index) => (
            <animated.div key={index} style={trailAnimation[index]}>
              <img src={logo} alt={`Contratista ${index + 1}`} />
            </animated.div>
          ))}
        </Slider>
      </animated.div>
    );
  };
  
  export default Carrusel;



/* import React from 'react';
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

export default Carrusel; */