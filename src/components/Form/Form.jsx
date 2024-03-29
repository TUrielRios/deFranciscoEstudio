import { Image } from 'cloudinary-react';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createObra } from '../../redux/features/obrasSlice';
import styles from './Form.module.css'; // Importa los estilos

const Form = () => {
  const dispatch = useDispatch();

  const [showAlert, setShowAlert] = useState(false);

  const [imagesSelected, setImagesSelected] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [values, setValues] = useState({
    nombre: '',
    año: '',
    lugar: '',
    finalidades: '',
    superficie: '',
    metrosSemicubiertos: '',
    estado: 'En Construcción', // Valor predeterminado
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleImagesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImagesSelected(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const uploadedUrls = await Promise.all(
        imagesSelected.map(async (image) => {
          const formData = new FormData();
          formData.append('file', image);
          formData.append('upload_preset', 'ukxezoje');
  
          const response = await axios.post(
            'https://api.cloudinary.com/v1_1/dcwg0evjm/image/upload',
            formData
          );
  
          return response.data.secure_url;
        })
      );
  
      // Aquí puedes realizar alguna validación antes de enviar los datos
      const obraData = {
        ...values,
        imagenes: uploadedUrls,
      };
  
      // Despachar la acción para crear la obra en el estado global (Redux)
      dispatch(createObra(obraData));
  
      setShowAlert(true);
      console.log('Formulario enviado correctamente');
  
      // Restablecer el formulario a su estado inicial
      setValues({
        nombre: '',
        año: '',
        lugar: '',
        finalidades: '',
        superficie: '',
        metrosSemicubiertos: '',
        estado: 'En Construcción', // Valor predeterminado
      });
      setImagesSelected([]);
      setUploadedImageUrls([]);
  
      // Opción 1: Después de enviar el formulario, desactiva la alerta después de unos segundos
      setTimeout(() => {
        setShowAlert(false);
      }, 3000); // 3000 milisegundos = 3 segundos
  
      // Opción 2: Desactiva la alerta cuando el usuario hace clic en el botón "Cerrar"
      // setShowAlert(false);
  
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div className={styles.container}>

      <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Publicar Obra</h1>
        <div className={styles.inputContainer}>
        <label>
          Nombre : 
          <input type="text" name="nombre" value={values.nombre} onChange={handleChange} />
        </label>
        <label>
          Año:
          <input type="text" name="año" value={values.año} onChange={handleChange} />
        </label>
        <label>
          Lugar:
          <input type="text" name="lugar" value={values.lugar} onChange={handleChange} />
        </label>
        <label>
          Finalidades:
          <input type="text" name="finalidades" value={values.finalidades} onChange={handleChange} />
        </label>
        <label>
          Superficie:
          <input type="text" name="superficie" value={values.superficie} onChange={handleChange} />
        </label>
        <label>
          Metros semicubiertos:
          <input type="text" name="metrosSemicubiertos" value={values.metrosSemicubiertos} onChange={handleChange} />
        </label>
        <label>
          Estado:
          <select
            name="estado"
            value={values.estado}
            onChange={handleChange}
            className={styles.selectField} // Aplica la clase de estilo aquí
          >
            <option value="">-</option>
            <option value="En Construcción">En Construcción</option>
            <option value="Terminado">Terminado</option>
          </select>
        </label>
        <label>
          Imágenes: 
          <input type="file" multiple onChange={handleImagesChange} />
        </label>
        </div>
       

        {/* Sección para previsualizar las imágenes */}
        {imagesSelected.length > 0 && (
          <div className={styles.imagePreview}>
            <h2>Imágenes Seleccionadas:</h2>
            {imagesSelected.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Imagen ${index + 1}`}
                className={styles.previewImage}
              />
            ))}
          </div>
        )}

        {uploadedImageUrls.length > 0 && (
          <div className={styles.imagePreview}>
            <h2>Imágenes Cargadas:</h2>
            {uploadedImageUrls.map((url, index) => (
              <Image key={index} cloudName="dhiss395i" publicId={url} width="300" height="200" />
            ))}
          </div>
        )}

        <button className={styles.publicBtn} type="submit">Publicar</button>
        {showAlert && (
          <div className={styles.alert}>
            <p>¡Formulario enviado correctamente!</p>
            <button onClick={() => setShowAlert(false)}>Cerrar</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
