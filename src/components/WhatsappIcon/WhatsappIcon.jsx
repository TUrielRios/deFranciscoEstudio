import React from 'react';
import iconwpp from '../../imagenes/iconowpp.png'
import styles from './WhatsappIcon.module.css';

const WhatsappIcon = () => {
    // Codifica el mensaje para que sea válido en un URL

  return (
    <a href="https://wa.me/5491167913258?text=Hola, estoy interesado en comenzar un proyecto y me gustaría discutir algunos detalles con su equipo
    ¿Es posible organizar una reunión?"
     target="_blank"className={styles.whatsappIcon}>
      {/* Aquí puedes poner el icono de WhatsApp */}
      <img src={iconwpp} alt="WhatsApp" />
    </a>
  );
}

export default WhatsappIcon;
