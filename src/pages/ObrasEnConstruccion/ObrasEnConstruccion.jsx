// ObrasEnConstruccion.jsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectObrasEnConstruccion, fetchObras, selectObrasCargadas } from '../../redux/features/obrasSlice';
import ObraCard from '../../components/ObraCard/ObraCard';
import styles from './ObrasEnConstruccion.module.css';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import WhatsappIcon from '../../components/WhatsappIcon/WhatsappIcon';

const ObrasEnConstruccion = () => {
    const obrasEnConstruccion = useSelector(selectObrasEnConstruccion);
    const obrasCargadas = useSelector(selectObrasCargadas);
    const dispatch = useDispatch();

    useEffect(() => {
        // Call the fetchObras action only if the obras have not been loaded
        if (!obrasCargadas) {
            dispatch(fetchObras());
        }
    }, [dispatch, obrasCargadas]);

      // Ordena las obras terminadas en orden inverso según el id
  const obrasEnConstruccionInverso = [...obrasEnConstruccion].reverse();

    return (
        <>
            <div className={styles.container}>
            <h2 className={styles.title}>Obras en Construcción</h2>
            {obrasCargadas ? (
                <div className={styles.obrasEnConstruccionContainer}>
                    {obrasEnConstruccionInverso.map((obra) => (
                        <ObraCard key={obra.id} obra={obra} />
                    ))}
                </div>
            ) : (
                <div>Cargando...</div>
            )}
            <Link className={styles.link} to="/arquitectura/">
                <button className={styles.btnVolver}>Volver</button>
            </Link>
        </div>
        <WhatsappIcon phoneNumber="+5491167913258" />
        <div className={styles.footer}>
                <Footer />
        </div>
        </>

    );
};

export default ObrasEnConstruccion;
