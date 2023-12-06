// Nosotros.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchEmployeesStart,
    fetchEmployeesSuccess,
    fetchEmployeesFailure,
} from '../../redux/features/empleadoSlice';
import styles from './Nosotros.module.css'; // Asegúrate de tener un módulo de estilos para Nosotros
import { useInView } from 'react-intersection-observer';
import { useSpring, animated, useTrail } from 'react-spring';
// Importa las acciones y el selector necesarios



const Nosotros = () => {

    const [ref, inView] = useInView()    
    const dispatch = useDispatch();
    const { employees, loading, error } = useSelector((state) => state.employee);

  // Configuración de la animación principal
  const mainAnimation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { tension: 170, friction: 20 },
  });

// Configuración de la animación de las letras
const trailAnimation = useTrail(employees?.length || 0, {
  opacity: inView ? 1 : 0,
  transform: inView ? 'translateY(0)' : 'translateY(20px)',
  config: { tension: 170, friction: 20 },
  delay: 300, // Ajusta el tiempo de retraso entre cada letra
});

  useEffect(() => {
    const apiUrl = 'https://estudio-backend-ti3p.vercel.app/empleados';

  const fetchData = async () => {
    dispatch(fetchEmployeesStart());

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        dispatch(fetchEmployeesSuccess(data));
    } catch (error) {
        dispatch(fetchEmployeesFailure(error.message));
    }
};

fetchData();
}, [dispatch]);

if (loading) {
    return <p>Cargando...</p>;
}

if (error) {
    return <p>Error al cargar empleados: {error}</p>;
}


  return (
    <animated.div id="nosotros" className={`${styles.nosotrosSection} ${styles.animated}`} style={mainAnimation} ref={ref}>
      <div className={styles.content}>
        <h1>Equipo De Francisco</h1>
        <p>
          Acompañamos y guiamos a nuestros clientes en todo el proceso de obra, desde la planificación, la factibilidad, los croquis
          preliminares, proyecto, dirección, conducción y administración. Contamos con experiencia y formación profesional en dibujo técnico,
          artístico, perspectivista, diseño gráfico, muralista, maquetista, renders y animaciones 3D.
        </p>
        <section className={styles.empleadoContainer}>
          {employees && employees.length > 0 && trailAnimation.map((props, index) => (
            <animated.article key={employees[index].id} className={`${styles.empleadoItem}`} style={props}>
              <img src={employees[index].foto} alt="Empleado" />
              <span>{employees[index].nombre_completo}</span>
              <br />
              <span>{employees[index].cargo}</span>
              <br />
              {employees[index].cedula_a && <span>Cédula A: {employees[index].cedula_a}</span>}
              <br />
              {employees[index].cedula_b && <span>Cédula B: {employees[index].cedula_b}</span>}
            </animated.article>
          ))}
        </section>
      </div>
    </animated.div>
  );
};

export default Nosotros;
