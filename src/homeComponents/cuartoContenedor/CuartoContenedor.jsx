import React from 'react';
import { Fade } from 'react-reveal';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import styles from './CuartoContenedor.module.css';
import imagenAntes1 from '../../imagenes/antes1.jpg';
import imagenDespues1 from '../../imagenes/despues1.jpg';
import imagenAntes2 from '../../imagenes/antes2.jpg';
import imagenDespues2 from '../../imagenes/despues2.jpg';
import imagenAntes3 from '../../imagenes/antes3.jpg';
import imagenDespues3 from '../../imagenes/despues3.jpg';
import imagenAntes4 from '../../imagenes/antes4.jpg';
import imagenDespues4 from '../../imagenes/despues4.jpg';

const CuartoContenedor = () => {
  return (
    <div className={styles.container}>
      <Fade left>
        <div className={styles.infoContainer}>
          <h2 className={styles.title}>Render vs Realidad</h2>
          <h3 className={styles.subtitle}>¡Chusmeá un poco nuestros resultados, <br/> antes y después moviendo la flechita!</h3>
          <p className={styles.text}>
            Acá puedes ver nuestros procesos de remodelación, desde el render inicial hasta el acabado final.
          </p>
        </div>
      </Fade>
      <Fade right>
        <div className={styles.rightContainer}>
            <Fade top>
          <div className={styles.compareSlide}>
            <ReactCompareSlider
              itemOne={<ReactCompareSliderImage src={imagenAntes1} alt="Render" />}
              itemTwo={<ReactCompareSliderImage src={imagenDespues1} alt="Realidad" />}
            />
          </div>
          </Fade>
          <Fade right>
          <div className={styles.compareSlide}>
            <ReactCompareSlider
              itemOne={<ReactCompareSliderImage src={imagenAntes2} alt="Render" />}
              itemTwo={<ReactCompareSliderImage src={imagenDespues2} alt="Realidad" />}
            />
          </div>
          </Fade>
          <Fade bottom>
          <div className={styles.compareSlide}>
            <ReactCompareSlider
              itemOne={<ReactCompareSliderImage src={imagenAntes3} alt="Render" />}
              itemTwo={<ReactCompareSliderImage src={imagenDespues3} alt="Realidad" />}
            />
          </div>
          </Fade>
          <Fade bottom>
          <div className={styles.compareSlide}>
            <ReactCompareSlider
              itemOne={<ReactCompareSliderImage src={imagenAntes4} alt="Render" />}
              itemTwo={<ReactCompareSliderImage src={imagenDespues4} alt="Realidad" />}
            />
          </div>
          </Fade>
        </div>
      </Fade>
    </div>
  );
};

export default CuartoContenedor;
