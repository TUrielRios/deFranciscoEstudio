import React from 'react';
import styles from './ObraCard.module.css'; // Asegúrate de tener un archivo CSS para los estilos
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

const ObraCard = ({ obra }) => {
  const { id, nombre, año, imagenes, finalidades, superficie, lugar, estado } = obra;

  return (
    <div className={styles.obraCard}>
      <img src={imagenes[0]} alt={`Imagen de ${nombre}`} className={styles.image} />
      <div className={styles.details}>
        <h2>{nombre}</h2>
        <p>{año}</p>
        <p>{lugar}</p>
        <Link to={`/arquitectura/obras-terminadas/${id}`} className={styles.link}>
          <button>Más Detalle</button>
        </Link>
      </div>

    </div>
  );
};

export default ObraCard;

