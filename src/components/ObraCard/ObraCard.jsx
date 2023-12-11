import React from 'react';
import styles from './ObraCard.module.css'; // Asegúrate de tener un archivo CSS para los estilos
import { Link } from 'react-router-dom';

const ObraCard = ({ obra }) => {
  const { id, nombre, imagenes } = obra;

  

  return (
    <div className={styles.obraCard}>
      <Link to={`/arquitectura/obras/${id}`} className={styles.link}>
        <img src={imagenes[0]} alt={`Imagen de ${nombre}`} className={styles.image} />

        <div className={styles.centeredText}>
        <p>{nombre}</p>
      </div>
      </Link>
    </div>
  );
};

export default ObraCard;

