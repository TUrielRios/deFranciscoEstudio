import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectObrasTerminadas, fetchObras, selectObrasCargadas, selectObrasEnConstruccion } from '../../redux/features/obrasSlice';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Detail.module.css';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import WhatsappIcon from '../../components/WhatsappIcon/WhatsappIcon';

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const obrasTerminadas = useSelector(selectObrasTerminadas);
  const obrasEnConstruccion = useSelector(selectObrasEnConstruccion);
  const obrasCargadas = useSelector(selectObrasCargadas);

  useEffect(() => {
    // Call the fetchObras action if the works have not been loaded
    if (!obrasCargadas) {
      dispatch(fetchObras());
    }
  }, [dispatch, obrasCargadas]);

  const obraTerminada = obrasTerminadas.find((obra) => obra.id === parseInt(id, 10));
  const obraEnConstruccion = obrasEnConstruccion.find((obra) => obra.id === parseInt(id, 10));

  const obra = obraTerminada || obraEnConstruccion;

  if (!obrasCargadas) {
    return <div>Cargando...</div>; // Another option is to show a spinner or loading message
  }

  if (!obra) {
    return <div className={styles.error}>Obra no encontrada</div>;
  }

  const { nombre, año, lugar, imagenes, finalidades, superficie, estado, metrosSemicubiertos } = obra;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.detailMainContainer}>
      <div className={styles.detailContainer}>
        {/* Add more details here as needed */}
        <Slider {...sliderSettings} className={styles.slider}>
          {imagenes.map((imagen, index) => (
            <div key={index} className={styles.slide}>
              <img src={imagen} alt={`Imagen ${index + 1}`} className={styles.image} />
            </div>
          ))}
        </Slider>
        <div className={styles.dataContainer}>
          <h2 className={styles.title}>{nombre}</h2>
          <p>{año}</p>
          <p>{lugar}</p>
          <p>{finalidades}</p>
          <p>{superficie} m² cubiertos</p>
          {metrosSemicubiertos ? 
            <p>{metrosSemicubiertos} m² </p>
          :
            <p>{metrosSemicubiertos}</p>
          }
          <Link className={styles.link} to={estado === 'Terminado' ? "/arquitectura/obras-terminadas" : "/arquitectura/obras-en-construcción"}>
            <button className={styles.btnVolver}>
              <FaArrowLeft />
            </button>
          </Link>
        </div>

        {/* Add more content as needed */}
      </div>
      <WhatsappIcon phoneNumber="+5491167913258" />
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Detail;
