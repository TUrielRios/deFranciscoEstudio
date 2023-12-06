import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectObrasTerminadas, fetchObras, selectObrasCargadas } from '../../redux/features/obrasSlice';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Detail.module.css';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';



const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const obrasTerminadas = useSelector(selectObrasTerminadas);
  const obrasCargadas = useSelector(selectObrasCargadas);

  useEffect(() => {
    // Llama a la acción fetchObras si las obras no han sido cargadas
    if (!obrasCargadas) {
      dispatch(fetchObras());
    }
  }, [dispatch, obrasCargadas]);

  const obra = obrasTerminadas.find((obra) => obra.id === parseInt(id, 10));

  if (!obrasCargadas) {
    return <div>Cargando...</div>; // Otra opción es mostrar un spinner o mensaje de carga
  }

  if (!obra) {
    return <div className={styles.error}>Obras no encontradas</div>;
  }

  const { nombre, año, lugar, imagenes, finalidades, superficie } = obra;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
        <div className={styles.detailContainer}>
        {/* Agrega aquí más detalles según sea necesario */}
        <Slider {...sliderSettings} className={styles.slider}>
            {imagenes.map((imagen, index) => (
            <div key={index} className={styles.slide}>
                    <img
                    src={imagen}
                    alt={`Imagen ${index + 1}`}
                    className={styles.image}
                    />
            </div>
            ))}
        </Slider>
        <div className={styles.dataContainer}>
        <h2 className={styles.title}>{nombre}</h2>
            <p>{año}</p>
            <p>{lugar}</p>
            <p>{finalidades}</p>
            <p>{superficie}</p>
            <Link className={styles.link} to="/arquitectura/obras-terminadas">
            <button className={styles.btnVolver}>
            <FaArrowLeft />
            </button>
            </Link>
        </div>

        {/* Agrega más contenido según sea necesario */}
        
        </div>
        <div className={styles.footer}>
        <Footer />
        </div>       
    </>

  );
};

export default Detail;
