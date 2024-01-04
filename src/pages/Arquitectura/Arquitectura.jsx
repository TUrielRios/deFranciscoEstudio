import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchObras} from '../../redux/features/obrasSlice';
import styles from './Arquitectura.module.css';
import { useNavigate } from "react-router-dom";
import Footer from '../../components/Footer/Footer'

const Arquitectura = () => {
  const dispatch = useDispatch();


  const history = useNavigate();

  const handleLocationClick = (location) => {
    history(`/arquitectura/${location}`);
  };

  useEffect(() => {
    dispatch(fetchObras());
  }, [dispatch]);

  return (
    <>
      <div className={styles.exploreContainer}>
        <div className={styles.locationContainer} onClick={() => handleLocationClick('obras-terminadas')}>
          <h1 className={styles.locationTitle}>Obras terminadas</h1>
          <img className={styles.image}  src="https://static.wixstatic.com/media/c36ba4_5d78d56a770f4b2bbdaed5c9a832ffce~mv2.jpg/v1/fill/w_559,h_389,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/c36ba4_5d78d56a770f4b2bbdaed5c9a832ffce~mv2.jpg" alt="" />

        </div>

        <div className={styles.locationContainer} onClick={() => handleLocationClick('obras-en-construcción')}>
          <h1 className={styles.locationTitle}>Obras en construcción</h1>
          <img className={styles.image} src="https://static.wixstatic.com/media/c36ba4_784047eb5b0a445a80145f075e7e199a~mv2.jpg/v1/fill/w_569,h_389,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/c36ba4_784047eb5b0a445a80145f075e7e199a~mv2.jpg" alt="" />
        </div>
      </div>
      <div className={styles.footer}>
          <Footer />
      </div>   
    </>

  );
};

export default Arquitectura;
