"use client"

import { useState } from "react"
import Form from "../../components/Form/Form"
import styles from "./Admin.module.css"
import ListaDeObras from "../../components/ListaDeObras/ListaDeObras"
import ListaDeEmpleados from "../../adminComponents/ListaDeEmpleados/ListaDeEmpleados"
import FormEmpleados from "../../adminComponents/FormEmpleados/FormEmpleados"
import ChangePassword from "../../adminComponents/ChangePassword/ChangePassword"
import { Home, BookOpen, Users, UserPlus, Lock, LogOut, Search, Bell } from "lucide-react"

export default function Admin() {
  const [selectedSection, setSelectedSection] = useState("form")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("https://estudio-backend-ti3p.vercel.app/data")
      if (response.ok) {
        const data = await response.json()
        const contraseña = data[0].password
        if (password === contraseña) {
          setError("")
          setIsLoggedIn(true)
        } else {
          setError("Contraseña incorrecta")
          alert("Contraseña incorrecta")
          setPassword("")
        }
      } else {
        setError("Error al obtener la contraseña")
      }
    } catch (error) {
      setError("Error de red")
    }
  }

  const handleForgotPasswordSubmit = async () => {
    try {
      const response = await fetch("https://estudio-backend-ti3p.vercel.app/recover-pass", {
        method: "POST",
      })
      if (response.ok) {
        alert("Correo de recuperación enviado con éxito")
      } else {
        console.error("Error al enviar el correo electrónico de restablecimiento")
      }
    } catch (error) {
      console.error("Error al enviar el correo electrónico de restablecimiento", error)
    }
  }

  const renderSection = () => {
    switch (selectedSection) {
      case "form":
        return <Form />
      case "obras":
        return <ListaDeObras />
      case "empleados":
        return <ListaDeEmpleados />
      case "formEmpleados":
        return <FormEmpleados />
      case "changePassword":
        return <ChangePassword />
      default:
        return null
    }
  }

  const menuItems = [
    { id: "form", icon: Home, label: "Publicar Obra" },
    { id: "obras", icon: BookOpen, label: "Lista de Obras" },
    { id: "empleados", icon: Users, label: "Lista de Empleados" },
    { id: "formEmpleados", icon: UserPlus, label: "Publicar Empleados" },
    { id: "changePassword", icon: Lock, label: "Cambiar Contraseña" },
  ]

  if (!isLoggedIn) {
    return (
      <div className={styles.mainFormContainer}>
        <form onSubmit={handlePasswordSubmit} className={styles.loginForm}>
          <h2 className={styles.loginTitle}>Iniciar sesión</h2>
          <div className={styles.inputGroup}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Ingrese su contraseña"
            />
          </div>
          <button type="submit" className={styles.loginButton}>
            Ingresar
          </button>
          <button type="button" onClick={handleForgotPasswordSubmit} className={styles.forgotPasswordButton}>
            Olvidé mi contraseña
          </button>
          {error && <p className={styles.errorMessage}>{error}</p>}
        </form>
      </div>
    )
  }

  return (
    <div className={styles.biggerContainer}>
<div className={styles.layout}>
      <aside className={styles.sidebar}>
        <nav className={styles.nav}>
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setSelectedSection(item.id)}
                className={`${styles.navButton} ${selectedSection === item.id ? styles.active : ""}`}
                title={item.label}
              >
                <Icon size={20} />
              </button>
            )
          })}
        </nav>
        <button className={styles.logoutButton} onClick={() => setIsLoggedIn(false)} title="Cerrar sesión">
          <LogOut size={20} />
        </button>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.greeting}>¡Hola Admin!</h1>
            <p className={styles.subgreeting}>Es bueno verte de nuevo.</p>
          </div>
          <div className={styles.headerRight}>
            <button className={styles.iconButton}>
              <Search size={20} />
            </button>
            <button className={styles.iconButton}>
              <Bell size={20} />
            </button>
            <div className={styles.avatar}>Administrador</div>
          </div>
        </header>

        <div className={styles.content}>{renderSection()}</div>
      </main>
    </div>
    </div>
    
  )
}

