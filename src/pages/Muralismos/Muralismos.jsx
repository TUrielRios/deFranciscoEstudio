// Muralismos.jsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMurales, selectMuralesCargados } from '../../redux/features/muralesSlice';
import styles from './Muralismos.module.css'; 
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import WhatsappIcon from '../../components/WhatsappIcon/WhatsappIcon';

const Muralismos = () => {
  const dispatch = useDispatch();
  const muralesCargados = useSelector(selectMuralesCargados);
  const murales = useSelector((state) => state.murales.murales);

  useEffect(() => {
    // Llama a la acción fetchMurales al montar el componente si los murales no han sido cargados
      dispatch(fetchMurales());
  }, [dispatch]);

  if (!muralesCargados) {
    return <div>Cargando murales...</div>;
  }

  return (
      <>
        <div className={styles.muralismosContainer}>
        <Link className={styles.linkToTop} to="/">
          <button className={styles.btnVolver}>
            <FaArrowLeft />
          </button>
        </Link>
          <p className={styles.title}>
            Murales <br />
            de Francisco
          </p>
          <div className={styles.socialIcons}>
            <a href="https://www.instagram.com/muralesdefrancisco/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
          <div className={styles.muralesList}>
            {murales.map((mural) => (
              <div key={mural.id} className={styles.muralItem}>
                <h2 className={styles.muralT}>{mural.nombre}</h2>
                <div className={styles.imagenContainer}>
                  <img src={mural.imagenes[0]} alt={`Imagen de ${mural.nombre}`} className={styles.imagen} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <WhatsappIcon phoneNumber="+5491167913258" />
        <div className={styles.footer}>
          <Footer />
        </div>
      </>


  );
};

export default Muralismos;
