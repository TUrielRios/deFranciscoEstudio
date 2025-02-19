"use client"

import { useState } from "react"
import styles from "./ChangePassword.module.css"
import { Lock } from "lucide-react"

const ChangePassword = () => {
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("https://estudio-backend-ti3p.vercel.app/data", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        setErrorMessage("")
        alert("Contraseña cambiada correctamente ;)")
        setPassword("")
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.error || "Error al cambiar la contraseña")
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error)
      setErrorMessage("Error al cambiar la contraseña")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Cambiar Contraseña</h1>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <div className={styles.formGroup}>
            <label htmlFor="password">
              <Lock size={16} className={styles.inputIcon} />
              Nueva Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Ingrese la nueva contraseña"
            />
          </div>
        </div>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? "Cambiando..." : "Cambiar Contraseña"}
        </button>
      </form>
    </div>
  )
}

export default ChangePassword

