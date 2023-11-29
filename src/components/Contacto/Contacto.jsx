// Contacto.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Importa la hoja de estilo de Leaflet
import styles from './Contacto.module.css';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';
import logoMap from '../../imagenes/logo.png'
import L from 'leaflet';

const Contacto = () => {

    const [ref, inView] = useInView() 

      // Configuración de la animación principal
    const mainAnimation = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(50px)',
        config: { tension: 170, friction: 20 },
    });

    const customIcon = new L.Icon({
        iconUrl: "https://icones.pro/wp-content/uploads/2021/02/icone-de-broche-de-localisation-rouge.png",
        iconSize: [50, 50], // ajusta el tamaño según tus necesidades
        iconAnchor: [25, 50], // ajusta la posición del icono según tus necesidades
      });

    const position = [-34.55650338614781, -58.445041305230696];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar el formulario, puedes implementarla según tus necesidades
    };

    return (
        <animated.div id="contacto" className={`${styles.contactoContainer} ${styles.animated}`} style={mainAnimation} ref={ref}>
        <h1>¡Contactanos!</h1>
        <div className={styles.mapContainer}>
            <MapContainer center={position} zoom={15} style={{ width: '100%', height: '400px' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={customIcon} >

                <Popup>
                    <div className={styles.popupContent}>
                        <img src={logoMap} alt="Logo de ubicación" className={styles.popupLogo} />
                        <p className={styles.popupText}>Estudio De Francisco</p>
                    </div>
                </Popup>
            </Marker>
            </MapContainer>
        </div>
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <label>
                Nombre:
                <input type="text" name="nombre" />
                </label>
                <label>
                Correo Electrónico:
                <input type="email" name="email" />
                </label>
                <label>
                Mensaje:
                <textarea name="mensaje" />
                </label>
                <button type="submit">Enviar</button>
            </form>
            </div>
        </animated.div>
    );
};

export default Contacto;
