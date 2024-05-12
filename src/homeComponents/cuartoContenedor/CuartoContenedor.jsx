import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import styles from './CuartoContenedor.module.css';
import imagenAntes1 from '../../imagenes/croquis1.jpg';
import imagenDespues1 from '../../imagenes/resultado1.jpg';
import imagenAntes2 from '../../imagenes/antes2.jpg';
import imagenDespues2 from '../../imagenes/despues2.jpg';
import imagenAntes3 from '../../imagenes/antes1.jpg';
import imagenDespues3 from '../../imagenes/despues1.jpg';
import imagenAntes4 from '../../imagenes/antes5.jpg';
import imagenDespues4 from '../../imagenes/despues5.jpg';

const CuartoContenedor = () => {
  return (
    <div className={styles.container}>
      <Fade direction='left'>
      <div className={styles.infoContainer}>
        <h2 className={styles.title}>Antes y después</h2>
        <h3 className={styles.subtitle}>Observá cómo cada proyecto<br/>cobra vida moviendo la flecha</h3>
        <p className={styles.text}>
          Explorá nuestras transformaciones arquitectónicas, desde el render inicial hasta el resultado final.
        </p>
      </div>


      </Fade>
      <Fade direction='right'>
        <div className={styles.rightContainer}>
            <Fade direction='up'>
          <div className={styles.compareSlide}>
            <ReactCompareSlider
              itemOne={<ReactCompareSliderImage src={imagenAntes1} alt="Render" />}
              itemTwo={<ReactCompareSliderImage src={imagenDespues1} alt="Realidad" />}
              onlyHandleDraggable={true}
            />
          </div>
          </Fade>
          <Fade direction='right'>
          <div className={styles.compareSlide}>
            <ReactCompareSlider
              itemOne={<ReactCompareSliderImage src={imagenAntes2} alt="Render" />}
              itemTwo={<ReactCompareSliderImage src={imagenDespues2} alt="Realidad" />}
              onlyHandleDraggable={true}
            />
          </div>
          </Fade>
          <Fade direction='down'>
          <div className={styles.compareSlide}>
            <ReactCompareSlider
              itemOne={<ReactCompareSliderImage src={imagenAntes3} alt="Render" />}
              itemTwo={<ReactCompareSliderImage src={imagenDespues3} alt="Realidad" />}
              onlyHandleDraggable={true}
            />
          </div>
          </Fade>
          <Fade direction='down'>
          <div className={styles.compareSlide}>
            <ReactCompareSlider
              itemOne={<ReactCompareSliderImage src={imagenAntes4} alt="Render" />}
              itemTwo={<ReactCompareSliderImage src={imagenDespues4} alt="Realidad" />}
              onlyHandleDraggable={true}
            />
          </div>
          </Fade>
        </div>
      </Fade>
    </div>
  );
};

export default CuartoContenedor;
