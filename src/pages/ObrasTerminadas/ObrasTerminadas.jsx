import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectObrasTerminadas, fetchObras } from '../../redux/features/obrasSlice';
import ObraCard from '../../components/ObraCard/ObraCard';
import styles from './ObrasTerminadas.module.css';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';

const ObrasTerminadas = () => {
  const obrasTerminadas = useSelector(selectObrasTerminadas);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchObras());
  }, [dispatch]);

  // Ordena las obras terminadas en orden inverso según el id
  const obrasTerminadasInverso = [...obrasTerminadas].reverse();

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Obras terminadas</h2>
        <div className={styles.obrasTerminadasContainer}>
          {obrasTerminadasInverso.map((obra) => (
            <ObraCard key={obra.id} obra={obra} />
          ))}
        </div>
        <div className={styles.btnContainer}>
          <Link to="/arquitectura/copia-de-polyfilm" className={styles.link}>
            <button className={styles.polyfilmbtn}>Ver todas las obras</button>
          </Link>
          <Link className={styles.link} to="/arquitectura/">
            <button className={styles.btnVolver}>Volver</button>
          </Link>
        </div>
      </div>

      <div className={styles.footerContainerOT}>
        <Footer />
      </div>
    </>
  );
};

export default ObrasTerminadas;
