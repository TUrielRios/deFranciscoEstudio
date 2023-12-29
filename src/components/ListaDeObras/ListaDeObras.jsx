// ListaDeObras.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchObras, selectObrasCargadas, selectObrasTerminadas, selectObrasEnConstruccion, selectLoading, deleteObra, updateObra } from '../../redux/features/obrasSlice';
import styles from './ListaDeObras.module.css';
import axios from 'axios';

const ListaDeObras = () => {
  const dispatch = useDispatch();
  const obrasCargadas = useSelector(selectObrasCargadas);
  const obrasTerminadas = useSelector(selectObrasTerminadas);
  const obrasEnConstruccion = useSelector(selectObrasEnConstruccion);
  const loading = useSelector(selectLoading);

  const [editingObra, setEditingObra] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedYear, setEditedYear] = useState('');
  const [editedSuperf, setEditedSuperf] = useState('');
  const [editedFinalidades, setEditedFinalidades] = useState('');
  const [editedPlace, setEditedPlace] = useState('');
  const [editedEstado, setEditedEstado] = useState('');
  const [editedImages, setEditedImages] = useState([]); // Nuevo estado para las imágenes
  const [removedImages, setRemovedImages] = useState([]); // Nuevo estado para las imágenes eliminadas
  const [newImages, setNewImages] = useState([]);


  useEffect(() => {
    if (!obrasCargadas) {
      dispatch(fetchObras());
    }
  }, [dispatch, obrasCargadas]);

  const handleDeleteClick = (obraId) => {
    // Llama a la acción de Redux para eliminar la obra
    dispatch(deleteObra(obraId));
    alert("Elimiinado correctamente")
    setTimeout(() => {
        window.location.reload();
      }, 1000);
  };

  const handleEditClick = (obra) => {
    setEditingObra(obra);
    setEditedName(obra.nombre);
    setEditedYear(obra.año);
    setEditedSuperf(obra.superficie);
    setEditedFinalidades(obra.finalidades);
    setEditedPlace(obra.lugar);
    setEditedEstado(obra.estado);
    setEditedImages([...obra.imagenes]); // Copia las imágenes existentes al iniciar la edición
    setRemovedImages([]); // Reinicia el array de imágenes eliminadas
  };

  const handleImagesChange = (e) => {
    // Manejar cambios en las imágenes durante la edición
    const selectedFiles = Array.from(e.target.files);
    setNewImages(selectedFiles);
  };

  const handleSaveClick = async () => {
    try {
      // Sube las nuevas imágenes a Cloudinary
      const uploadedUrls = await Promise.all(
        newImages.map(async (image) => {
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

      // Combina las imágenes existentes con las nuevas y elimina duplicados
      const updatedImages = [...editedImages, ...uploadedUrls].filter(
        (value, index, self) => self.indexOf(value) === index
      );

      dispatch(
        updateObra({
          ...editingObra,
          nombre: editedName,
          año: editedYear,
          superficie: editedSuperf,
          finalidades: editedFinalidades,
          lugar: editedPlace,
          estado: editedEstado,
          imagenes: updatedImages,
        })
      );

      setEditingObra(null);
      alert('Editado correctamente');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error al editar la obra:', error);
    }
  };

  if (loading) {
    return <p className={styles['loading-message']}>Cargando obras...</p>;
  }

  return (
    <div className={styles['lista-de-obras']}>
      <div className={styles['obras-section']}>
        <h2 className={styles.subtitle}>Obras Terminadas</h2>
        <ul className={styles['obras-list']}>
          {obrasTerminadas.map((obra) => (
            <li key={obra.id} className={styles['obras-list-item']}>
              {editingObra === obra ? (
                <>
                  <input
                    type="text"
                    placeholder='nombre'
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className={styles.editInput}
                  />
                    <input
                    type="text"
                    placeholder='año'
                    value={editedYear}
                    onChange={(e) => setEditedYear(e.target.value)}
                    className={styles.editInput}
                  />
                                    <input
                    type="text"
                    placeholder='lugar'
                    value={editedPlace}
                    onChange={(e) => setEditedPlace(e.target.value)}
                    className={styles.editInput}
                  />
                                    <input
                    type="text"
                    placeholder='finalidades'
                    value={editedFinalidades}
                    onChange={(e) => setEditedFinalidades(e.target.value)}
                    className={styles.editInput}
                  />
                                    <input
                    type="text"
                    placeholder='superficie'
                    value={editedSuperf}
                    onChange={(e) => setEditedSuperf(e.target.value)}
                    className={styles.editInput}
                  />
                                    <input
                    type="text"
                    placeholder='estado'
                    value={editedEstado}
                    onChange={(e) => setEditedEstado(e.target.value)}
                    className={styles.editInput}
                  />
                                  <input
                  type="file"
                  multiple
                  onChange={handleImagesChange}
                  className={styles.editInput}
                />



                  <button onClick={handleSaveClick} className={styles.saveButton}>
                    Guardar
                  </button>
                </>
              ) : (
                <>
                  <h3>{obra.nombre}</h3>
                  <img src={obra.imagenes[0]} alt="" className={styles.imagenes} />
                  <p>{obra.año}</p>
                    <p>{obra.lugar}</p>
                    <p>{obra.finalidades}</p>
                    <p>{obra.superficie}</p>
                    <p>{obra.estado}</p>
                  <button onClick={() => handleEditClick(obra)} className={styles.editButton}>
                    Editar
                  </button>
                  <button onClick={() => handleDeleteClick(obra.id)} className={styles.deleteButton}>
                    X
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles['obras-section']}>
        <h2 className={styles.subtitle}>Obras en Construcción</h2>
        <ul className={styles['obras-list']}>
          {obrasEnConstruccion.map((obra) => (
            <li key={obra.id} className={styles['obras-list-item']}>
              {editingObra === obra ? (
                <>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className={styles.editInput}
                  />
                                      <input
                    type="text"
                    value={editedYear}
                    onChange={(e) => setEditedYear(e.target.value)}
                    className={styles.editInput}
                  />
                                    <input
                    type="text"
                    value={editedPlace}
                    onChange={(e) => setEditedPlace(e.target.value)}
                    className={styles.editInput}
                  />
                                    <input
                    type="text"
                    value={editedFinalidades}
                    onChange={(e) => setEditedFinalidades(e.target.value)}
                    className={styles.editInput}
                  />
                                    <input
                    type="text"
                    value={editedSuperf}
                    onChange={(e) => setEditedSuperf(e.target.value)}
                    className={styles.editInput}
                  />
                                    <input
                    type="text"
                    value={editedEstado}
                    onChange={(e) => setEditedEstado(e.target.value)}
                    className={styles.editInput}
                  />
                                                    <input
                  type="file"
                  multiple
                  onChange={handleImagesChange}
                  className={styles.editInput}
                />


                  <button onClick={handleSaveClick} className={styles.saveButton}>
                    Guardar
                  </button>
                </>
              ) : (
                <>
                  <h3>{obra.nombre}</h3>
                  <img src={obra.imagenes[0]} alt="" className={styles.imagenes} />
                    <p>{obra.año}</p>
                    <p>{obra.lugar}</p>
                    <p>{obra.finalidades}</p>
                    <p>{obra.superficie}</p>
                    <p>{obra.estado}</p>
                  <button onClick={() => handleEditClick(obra)} className={styles.editButton}>
                    Editar
                  </button>
                  <button onClick={() => handleDeleteClick(obra.id)} className={styles.deleteButton}>
                    X
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListaDeObras;
