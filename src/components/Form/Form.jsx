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
          formData.append('upload_preset', 'vxfhdafl');

          const response = await axios.post(
            'https://api.cloudinary.com/v1_1/dhiss395i/image/upload',
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
        estado: 'En Construcción', // Valor predeterminado
      });
      setImagesSelected([]);
      setUploadedImageUrls([]);

          // Recargar la página después de un breve retraso (puedes ajustar el tiempo según tus necesidades)
    setTimeout(() => {
      window.location.reload();
    }, 2000); // 2000 milisegundos = 2 segundos

    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div className={styles.container}>

      <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Publicar Obra</h1>
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

/*import { Image } from 'cloudinary-react';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createObra } from '../../redux/features/obrasSlice';

const Form = () => {
  const dispatch = useDispatch();

  const [imageSelected, setImageSelected] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [values, setValues] = useState({
    nombre: '',
    año: '',
    lugar: '',
    imagenes: "", // Cambiado a un array para permitir múltiples imágenes
    finalidades: '',
    superficie: '',
    estado: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar alguna validación antes de enviar los datos
    // También puedes enviar la URL de la imagen en lugar de la imagen completa si prefieres
    const obraData = {
      ...values,
      imagenes: [uploadedImageUrl], // Cambiado a un array para permitir múltiples imágenes
    };

    dispatch(createObra(obraData));
  };

  const uploadImage = () => {
    const formData = new FormData();
    formData.append('file', imageSelected);
    formData.append('upload_preset', 'vxfhdafl');

    axios
      .post('https://api.cloudinary.com/v1_1/dhiss395i/image/upload', formData)
      .then((res) => {
        console.log(res.data.secure_url);
        setUploadedImageUrl(res.data.secure_url);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
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
          Estado:
          <input type="text" name="estado" value={values.estado} onChange={handleChange} />
        </label>

        <input type="file" onChange={(e) => setImageSelected(e.target.files[0])} />
        <button onClick={uploadImage}>Upload</button>
        {uploadedImageUrl && <Image cloudName="dhiss395i" publicId={uploadedImageUrl} width="300" height="200" />}

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default Form;
*/