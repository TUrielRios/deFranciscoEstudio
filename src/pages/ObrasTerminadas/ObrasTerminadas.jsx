// ObrasTerminadas.jsx

import React, {useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { selectObrasTerminadas, fetchObras } from '../../redux/features/obrasSlice';
import ObraCard from '../../components/ObraCard/ObraCard'; // Asumiendo que tienes un componente ObraCard para mostrar cada obra
import styles from './ObrasTerminadas.module.css';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';

const ObrasTerminadas = () => {
  const obrasTerminadas = useSelector(selectObrasTerminadas);
  const dispatch = useDispatch();

  useEffect(() => {
    // Llama a la acción fetchObras al montar el componente
    dispatch(fetchObras());
  }, [dispatch]);

  return (
    <div >
        <h2 className={styles.title}>Obras terminadas</h2>
        <div className={styles.obrasTerminadasContainer}>
            {obrasTerminadas.map((obra) => (
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

        <div className={styles.footerContainerOT}>
        <Footer />
        </div>           
    </div>
  );
};

export default ObrasTerminadas;
