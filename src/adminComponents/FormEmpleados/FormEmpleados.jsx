import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEmployee } from '../../redux/features/empleadoSlice';
import axios from 'axios';
import styles from './FormEmpleados.module.css';
import { Upload, User, Briefcase, CreditCard, Hash } from 'lucide-react';

const FormEmpleados = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    nombre_completo: '',
    cargo: '',
    cedula_a: '',
    cedula_b: '',
    posicion: '',
    foto: '',
  });

  const [imageSelected, setImageSelected] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImageSelected(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setImageUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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

      await dispatch(createEmployee(empleadoData));

      setFormData({
        nombre_completo: '',
        cargo: '',
        cedula_a: '',
        cedula_b: '',
        posicion: '',
        foto: '',
      });
      setImageSelected(null);
      setImageUrl('');

      alert('Empleado creado correctamente');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error al crear el empleado:', error);
      alert('Error al crear el empleado');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Publicar empleado</h1>
      </div>
      <form className={styles.eform} onSubmit={handleSubmit}>
        <div className={styles.einputContainer}>
          <div className={styles.eformGroup}>
            <label>
              <User size={16} className={styles.inputIcon} />
              Nombre Completo:
            </label>
            <input
              type="text"
              name="nombre_completo"
              value={formData.nombre_completo}
              onChange={handleChange}
              required
              placeholder="Ingrese el nombre completo"
            />
          </div>
          <div className={styles.eformGroup}>
            <label>
              <Briefcase size={16} className={styles.inputIcon} />
              Cargo:
            </label>
            <input
              type="text"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              required
              placeholder="Ingrese el cargo"
            />
          </div>
          <div className={styles.formGroup}>
            <label>
              <CreditCard size={16} className={styles.inputIcon} />
              Cédula A:
            </label>
            <input
              type="text"
              name="cedula_a"
              value={formData.cedula_a}
              onChange={handleChange}
              placeholder="Ingrese la cédula A"
            />
          </div>
          <div className={styles.formGroup}>
            <label>
              <CreditCard size={16} className={styles.inputIcon} />
              Cédula B:
            </label>
            <input
              type="text"
              name="cedula_b"
              value={formData.cedula_b}
              onChange={handleChange}
              placeholder="Ingrese la cédula B"
            />
          </div>
          <div className={styles.formGroup}>
            <label>
              <Hash size={16} className={styles.inputIcon} />
              Posición:
            </label>
            <input
              type="number"
              name="posicion"
              value={formData.posicion}
              onChange={handleChange}
              placeholder="Ingrese la posición"
            />
          </div>
          <div className={styles.formGroup}>
            <label>
              <Upload size={16} className={styles.inputIcon} />
              Foto:
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className={styles.fileInput}
            />
          </div>
        </div>

        {imageUrl && (
          <div className={styles.imagePreview}>
            <h2>Vista previa:</h2>
            <img src={imageUrl} alt="Vista previa" className={styles.previewImage} />
          </div>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creando...' : 'Crear Empleado'}
        </button>
      </form>
    </div>
  );
};

export default FormEmpleados;