import React from 'react';
import { Fade } from 'react-reveal';
import { FaBuilding, FaHome, FaProjectDiagram, FaLeaf } from 'react-icons/fa';
import styles from './SegundoContenedor.module.css';

const Servicios = [
  {
    title: "Diseño Arquitectónico",
    description: "Desarrollamos proyectos de diseño arquitectónico que reflejen la visión y necesidades de nuestros clientes, combinando funcionalidad, estética y sostenibilidad.",
    icon: <FaBuilding />
  },
  {
    title: "Diseño Interior",
    description: "Creamos espacios interiores innovadores y funcionales que complementan la arquitectura circundante, priorizando el confort y la experiencia del usuario.",
    icon: <FaHome />
  },
  {
    title: "Gestión de Proyectos",
    description: "Ofrecemos servicios de gestión integral de proyectos, desde la planificación y supervisión hasta la coordinación de equipos y recursos, garantizando resultados exitosos.",
    icon: <FaProjectDiagram />
  },
  {
    title: "Sostenibilidad",
    description: "Brindamos asesoramiento en estrategias y soluciones sostenibles para proyectos arquitectónicos, promoviendo el respeto por el medio ambiente y la eficiencia energética.",
    icon: <FaLeaf />
  }
];

const SegundoContenedor = () => {
  return (
    <Fade>
      <div className={styles.container}>
        <Fade top>
            <h3 className={styles.encabezado}>¿Qué hacemos?</h3>
          <h2 className={styles.title}>Contamos con lo necesario para tu proyecto</h2>
        </Fade>
        <div className={styles.serviciosContainer}>
          {Servicios.map((servicio, index) => (
            <Fade key={index} bottom delay={index * 200}>
              <div className={styles.servicioCard}>
                <div className={styles.icon}>{servicio.icon}</div>
                <div className={styles.content}>
                  <h3 className={styles.servicioTitle}>{servicio.title}</h3>
                  <p className={styles.servicioDescription}>{servicio.description}</p>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </Fade>
  );
};

export default SegundoContenedor;
