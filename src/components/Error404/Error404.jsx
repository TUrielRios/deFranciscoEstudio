import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para enlaces internos de React Router
import styles from './Error404.module.css'; // Importa los estilos CSS Modules

const Error404 = () => {
  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>Página no encontrada putito</h1>
      <p className={styles.errorMessage}>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/" className={styles.backButton}>Volver al inicio</Link>
    </div>
  );
}

export default Error404;
