// Contacto.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Importa la hoja de estilo de Leaflet
import styles from './ContactoPage.module.css';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';
import logoMap from '../../imagenes/logo.png'
import L from 'leaflet';
import { useState } from 'react';
import Footer from '../../components/Footer/Footer';

const ContactoPage = () => {

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

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [enviado, setEnviado] = useState(false); // Nuevo estado para rastrear si el mensaje se envió

  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('https://estudio-backend-ti3p.vercel.app/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre, email, mensaje }),
        });
  
        if (response.ok) {
          console.log('Mensaje enviado con éxito');
          // Puedes hacer algo aquí, como mostrar un mensaje de éxito al usuario.
          setEnviado(true)

                  // Restablecer los valores de los campos después de enviar el mensaje
        setNombre('');
        setEmail('');
        setMensaje('');

        // Ocultar el mensaje de éxito después de unos segundos (opcional)
        setTimeout(() => setEnviado(false), 3000);
        } else {
          console.error('Error al enviar el mensaje');
          // Puedes hacer algo aquí, como mostrar un mensaje de error al usuario.
        }
      } catch (error) {
        console.error('Error de red:', error);
        // Puedes hacer algo aquí, como mostrar un mensaje de error al usuario.
      }
    };
    return (
      <div className={styles.contactPageContainer}>

            <h1 className={styles.titleC}>¡Contactanos!</h1>
            <animated.div id="contacto" className={`${styles.contactoContainer} ${styles.animated}`} style={mainAnimation} ref={ref}>
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
                <p className={styles.address}>
                    Dirección: Echeverría 1328, CABA, Argentina
                </p>
            </div>
            <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
            <label>
              Nombre:
              <input type="text" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </label>
            <label>
              Correo electrónico:
              <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
              Mensaje:
              <textarea name="mensaje" value={mensaje} onChange={(e) => setMensaje(e.target.value)} required />
            </label>
            <button type="submit">Enviar</button>
          </form>
          {/* Mostrar mensaje de éxito si el correo electrónico se envió */}
          {enviado && (
                      <span style={{ display:"flex", justifyContent: "center", alignItems: "center", color: 'green', marginTop: '10px' }}>
              ¡Mensaje enviado con éxito!
            </span>
          )}

                </div>

        </animated.div>
        <div className={styles.footerContainerCP}>
                  <Footer/>
                </div>
      </div>

    );
};

export default ContactoPage;
