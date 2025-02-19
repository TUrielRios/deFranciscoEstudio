import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchObras, selectObrasCargadas, selectObrasTerminadas, selectObrasEnConstruccion, selectLoading, deleteObra, updateObra } from '../../redux/features/obrasSlice';
import styles from './ListaDeObras.module.css';
import axios from 'axios';
import { Edit2, Trash2, Save, X } from 'lucide-react';

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
  const [editedMetrosS, setEditedMetrosS] = useState('');
  const [editedFinalidades, setEditedFinalidades] = useState('');
  const [editedPlace, setEditedPlace] = useState('');
  const [editedEstado, setEditedEstado] = useState('');
  const [editedImages, setEditedImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    if (!obrasCargadas) {
      dispatch(fetchObras());
    }
  }, [dispatch, obrasCargadas]);

  const handleDeleteClick = (obraId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta obra?')) {
      dispatch(deleteObra(obraId));
      alert("Eliminado correctamente");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const handleEditClick = (obra) => {
    setEditingObra(obra);
    setEditedName(obra.nombre);
    setEditedYear(obra.año);
    setEditedSuperf(obra.superficie);
    setEditedMetrosS(obra.metrosSemicubiertos);
    setEditedFinalidades(obra.finalidades);
    setEditedPlace(obra.lugar);
    setEditedEstado(obra.estado);
    setEditedImages([...obra.imagenes]);
    setNewImages([]);
  };

  const handleCancelEdit = () => {
    setEditingObra(null);
    setNewImages([]);
  };

  const handleImagesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setNewImages(selectedFiles);
    setEditedImages([]);
  };

  const handleSaveClick = async () => {
    try {
      let updatedImages = editedImages;

      if (newImages.length > 0) {
        const uploadedUrls = await Promise.all(
          newImages.map(async (image) => {
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

        updatedImages = [...editedImages, ...uploadedUrls].filter(
          (value, index, self) => self.indexOf(value) === index
        );
      }

      dispatch(
        updateObra({
          ...editingObra,
          nombre: editedName,
          año: editedYear,
          superficie: editedSuperf,
          metrosSemicubiertos: editedMetrosS,
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

  const renderObrasList = (obras, title) => (
    <div className={styles['obras-section']}>
      <h2 className={styles.subtitle}>{title}</h2>
      <ul className={styles['obras-list']}>
        {obras.map((obra) => (
          <li key={obra.id} className={styles['obras-list-item']}>
            {editingObra === obra ? (
              <div className={styles.editForm}>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className={styles.editInput}
                />
                <input
                  type="text"
                  placeholder="Año"
                  value={editedYear}
                  onChange={(e) => setEditedYear(e.target.value)}
                  className={styles.editInput}
                />
                <input
                  type="text"
                  placeholder="Lugar"
                  value={editedPlace}
                  onChange={(e) => setEditedPlace(e.target.value)}
                  className={styles.editInput}
                />
                <input
                  type="text"
                  placeholder="Finalidades"
                  value={editedFinalidades}
                  onChange={(e) => setEditedFinalidades(e.target.value)}
                  className={styles.editInput}
                />
                <input
                  type="text"
                  placeholder="Superficie"
                  value={editedSuperf}
                  onChange={(e) => setEditedSuperf(e.target.value)}
                  className={styles.editInput}
                />
                <input
                  type="text"
                  placeholder="Metros semicubiertos"
                  value={editedMetrosS}
                  onChange={(e) => setEditedMetrosS(e.target.value)}
                  className={styles.editInput}
                />
                <input
                  type="text"
                  placeholder="Estado"
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
                <div className={styles.editActions}>
                  <button onClick={handleSaveClick} className={styles.saveButton}>
                    <Save size={16} /> Guardar
                  </button>
                  <button onClick={handleCancelEdit} className={styles.cancelButton}>
                    <X size={16} /> Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.obraContent}>
                <div className={styles.obraHeader}>
                  <h3>{obra.nombre}</h3>
                  <div className={styles.obraActions}>
                    <button onClick={() => handleEditClick(obra)} className={styles.editButton}>
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDeleteClick(obra.id)} className={styles.deleteButton}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <img src={obra.imagenes[0]} alt="" className={styles.imagenes} />
                <div className={styles.obraDetails}>
                  <p><strong>Año:</strong> {obra.año}</p>
                  <p><strong>Lugar:</strong> {obra.lugar}</p>
                  <p><strong>Finalidades:</strong> {obra.finalidades}</p>
                  <p><strong>Superficie:</strong> {obra.superficie} m² cubiertos</p>
                  {obra.metrosSemicubiertos && (
                    <p><strong>Semicubiertos:</strong> {obra.metrosSemicubiertos} m²</p>
                  )}
                  <p><strong>Estado:</strong> {obra.estado}</p>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p className={styles['loading-message']}>Cargando obras...</p>
      </div>
    );
  }

  return (
    <div className={styles.listaDeObras}>
      {renderObrasList(obrasTerminadas, "Obras Terminadas")}
      {renderObrasList(obrasEnConstruccion, "Obras en Construcción")}
    </div>
  );
};

export default ListaDeObras;