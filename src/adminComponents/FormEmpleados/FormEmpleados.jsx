// frontend/components/FormEmpleados.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEmployee } from '../../redux/features/empleadoSlice';
import axios from 'axios';
import styles from './FormEmpleados.module.css';

const FormEmpleados = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    nombre_completo: '',
    cargo: '',
    cedula_a: '',
    cedula_b: '',
    foto: '', // Puedes implementar la lógica para subir imágenes si es necesario
  });

  const [imageSelected, setImageSelected] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImageSelected(selectedFile);

    // Crear una URL de objeto local para previsualizar la imagen
    const url = URL.createObjectURL(selectedFile);
    setImageUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = '';

      if (imageSelected) {
        const formData = new FormData();
        formData.append('file', imageSelected);
        formData.append('upload_preset', 'vxfhdafl');

        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dhiss395i/image/upload',
          formData
        );

        imageUrl = response.data.secure_url;
      }

      const empleadoData = {
        ...formData,
        foto: imageUrl,
      };

      dispatch(createEmployee(empleadoData));

      // Restablecer el formulario a su estado inicial
      setFormData({
        nombre_completo: '',
        cargo: '',
        cedula_a: '',
        cedula_b: '',
        foto: '',
      });
      setImageSelected(null);
      setImageUrl('');

      console.log('Empleado creado correctamente');

      // Mostrar mensaje y recargar la página después de un breve retraso
      alert('Empleado creado correctamente');
      setTimeout(() => {
        window.location.reload();
      }, 2000); // 2000 milisegundos = 2 segundos
    } catch (error) {
      console.error('Error al crear el empleado:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Publicar empleado</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Nombre Completo:
          <input
            type="text"
            name="nombre_completo"
            value={formData.nombre_completo}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Cargo:
          <input type="text" name="cargo" value={formData.cargo} onChange={handleChange} required />
        </label>
        <label>
          Cédula A:
          <input type="text" name="cedula_a" value={formData.cedula_a} onChange={handleChange} />
        </label>
        <label>
          Cédula B:
          <input type="text" name="cedula_b" value={formData.cedula_b} onChange={handleChange} />
        </label>
        <label>
          Foto:
          <input type="file" onChange={handleImageChange} />
        </label>
        {imageUrl && (
          <div className={styles.imagePreview}>
            <h2>Imagen Previsualizada:</h2>
            <img src={imageUrl} alt="Imagen Previsualizada" className={styles.previewImage} />
          </div>
        )}
        <button type="submit" className={styles.button}>
          Crear Empleado
        </button>
      </form>
    </div>
  );
};

export default FormEmpleados;
