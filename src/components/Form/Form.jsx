"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { createObra } from "../../redux/features/obrasSlice"
import styles from "./Form.module.css"
import { Building2, Calendar, MapPin, Target, Square, SquareStack, Construction, ImagePlus } from "lucide-react"

export default function Form() {
  const dispatch = useDispatch()
  const [showAlert, setShowAlert] = useState(false)
  const [imagesSelected, setImagesSelected] = useState([])
  const [values, setValues] = useState({
    nombre: "",
    año: "",
    lugar: "",
    finalidades: "",
    superficie: "",
    metrosSemicubiertos: "",
    estado: "En Construcción",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleImagesChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setImagesSelected(selectedFiles)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const uploadedUrls = await Promise.all(
        imagesSelected.map(async (image) => {
          const formData = new FormData()
          formData.append("file", image)
          formData.append("upload_preset", "ukxezoje")
          const response = await fetch("https://api.cloudinary.com/v1_1/dcwg0evjm/image/upload", {
            method: "POST",
            body: formData,
          })
          const data = await response.json()
          return data.secure_url
        }),
      )

      const obraData = { ...values, imagenes: uploadedUrls }
      dispatch(createObra(obraData))
      setShowAlert(true)
      setValues({
        nombre: "",
        año: "",
        lugar: "",
        finalidades: "",
        superficie: "",
        metrosSemicubiertos: "",
        estado: "En Construcción",
      })
      setImagesSelected([])
      setTimeout(() => setShowAlert(false), 3000)
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Publicar Obra</h1>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <div className={styles.formGroup}>
            <label htmlFor="nombre">
              <Building2 size={16} className={styles.inputIcon} />
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={values.nombre}
              onChange={handleChange}
              required
              placeholder="Ingrese el nombre de la obra"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="año">
              <Calendar size={16} className={styles.inputIcon} />
              Año
            </label>
            <input
              type="number"
              id="año"
              name="año"
              value={values.año}
              onChange={handleChange}
              required
              placeholder="Ingrese el año"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lugar">
              <MapPin size={16} className={styles.inputIcon} />
              Lugar
            </label>
            <input
              type="text"
              id="lugar"
              name="lugar"
              value={values.lugar}
              onChange={handleChange}
              required
              placeholder="Ingrese la ubicación"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="finalidades">
              <Target size={16} className={styles.inputIcon} />
              Finalidades
            </label>
            <input
              type="text"
              id="finalidades"
              name="finalidades"
              value={values.finalidades}
              onChange={handleChange}
              required
              placeholder="Ingrese las finalidades"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="superficie">
              <Square size={16} className={styles.inputIcon} />
              Superficie
            </label>
            <input
              type="number"
              id="superficie"
              name="superficie"
              value={values.superficie}
              onChange={handleChange}
              required
              placeholder="Ingrese la superficie"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="metrosSemicubiertos">
              <SquareStack size={16} className={styles.inputIcon} />
              Metros semicubiertos
            </label>
            <input
              type="number"
              id="metrosSemicubiertos"
              name="metrosSemicubiertos"
              value={values.metrosSemicubiertos}
              onChange={handleChange}
              required
              placeholder="Ingrese los metros semicubiertos"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="estado">
              <Construction size={16} className={styles.inputIcon} />
              Estado
            </label>
            <select id="estado" name="estado" value={values.estado} onChange={handleChange} required>
              <option value="En Construcción">En Construcción</option>
              <option value="Terminado">Terminado</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="imagenes">
              <ImagePlus size={16} className={styles.inputIcon} />
              Imágenes
            </label>
            <input
              type="file"
              id="imagenes"
              name="imagenes"
              onChange={handleImagesChange}
              multiple
              accept="image/*"
              className={styles.fileInput}
            />
          </div>
        </div>

        {imagesSelected.length > 0 && (
          <div className={styles.imagePreview}>
            <h2>Imágenes Seleccionadas:</h2>
            <div className={styles.imageGrid}>
              {imagesSelected.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file) || "/placeholder.svg"}
                  alt={`Imagen ${index + 1}`}
                  className={styles.previewImage}
                />
              ))}
            </div>
          </div>
        )}

        <button className={styles.button} type="submit">
          Publicar Obra
        </button>

        {showAlert && (
          <div className={styles.alert}>
            <p>¡Formulario enviado correctamente!</p>
          </div>
        )}
      </form>
    </div>
  )
}

