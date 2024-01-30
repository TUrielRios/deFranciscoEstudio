import React, {useState} from 'react';
import Form from "../../components/Form/Form";
import styles from './Admin.module.css';
import ListaDeObras from '../../components/ListaDeObras/ListaDeObras';
import ListaDeEmpleados from '../../adminComponents/ListaDeEmpleados/ListaDeEmpleados';
import FormEmpleados from '../../adminComponents/FormEmpleados/FormEmpleados';
import { useNavigate } from 'react-router-dom';
import ChangePassword from '../../adminComponents/ChangePassword/ChangePassword';

const Admin = () => {

    
  const [selectedSection, setSelectedSection] = useState('form');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);


    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('https://estudio-backend-ti3p.vercel.app/data');
    
            if (response.ok) {
                const data = await response.json();
    
                const contraseña = data[0].password;
    
                if (password === contraseña) {
                    console.log('Contraseña correcta. Iniciando sesión.');
                    setError('');
                    setIsLoggedIn(true);
                    navigate('/admin');
                } else {
                    console.log('Contraseña incorrecta.');
                    setError('Contraseña incorrecta');
                    alert('Contraseña incorrecta')
                    setPassword('')
                }
            } else {
                console.error('Error de la solicitud:', response.status, response.statusText);
                setError('Error al obtener la contraseña');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setError('Error de red');
        }
    };
    
    const handleForgotPasswordSubmit = async () => {
        try {
          const response = await fetch('https://estudio-backend-ti3p.vercel.app/recover-pass', {
            method: 'POST',
          });
    
          if (response.ok) {
            console.log('Correo electrónico de restablecimiento enviado con éxito');
            alert("Correo de recuperación enviado con éxito")
          } else {
            console.error('Error al enviar el correo electrónico de restablecimiento');
          }
        } catch (error) {
          console.error('Error al enviar el correo electrónico de restablecimiento', error);
        }
      };

      const renderSection = () => {
        switch (selectedSection) {
          case 'form':
            return <Form />;
          case 'obras':
            return <ListaDeObras />;
          case 'empleados':
            return <ListaDeEmpleados />;
          case 'formEmpleados':
            return <FormEmpleados />;
          case 'changePassword':
            return <ChangePassword />;
          default:
            return null;
        }
      };

    return(
        <div>
            {isLoggedIn ? (
        <div className={styles.mainContainer}>
          <h1 className={styles.title}>Panel de administración</h1>
          <div className={styles.formCreateContainer}>
            <select
              className={styles.menuDropdown}
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="form">Publicar Obra</option>
              <option value="obras">Lista de Obras</option>
              <option value="empleados">Lista de Empleados</option>
              <option value="formEmpleados">Publicar Empleados</option>
              <option value="changePassword">Cambiar Contraseña</option>
            </select>
          </div>
          <section className={styles.contentSection}>{renderSection()}</section>
        </div> ) 
                :
                <div className={styles.mainFormContainer}>
                {!showForgotPassword ? (
                  <form onSubmit={handlePasswordSubmit} className={styles['form-container']}>
                    <label htmlFor="password" className={styles['form-label']}>
                      Contraseña:
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles['form-input']}
                      />
                    </label>
                    <button type="submit" className={styles['form-button']}>
                      Ingresar
                    </button>
                    <p className={styles['forgot-password-link']} onClick={handleForgotPasswordSubmit}>
                        Olvidé mi contraseña
                    </p>
                    {error && <p className={styles['form-error']}>{error}</p>}
                  </form>
                ) : (
                    <p className={styles['back-to-login-link']} onClick={() => setShowForgotPassword(false)}>
                        Volver al inicio de sesión
                    </p>
                )}
              </div>
                        }
                </div>
        
    )
}
export default Admin;