import React, { useState } from 'react';
import styles from './ChangePassword.module.css'

const ChangePassword = () => {

  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Realizar la solicitud para cambiar la contraseña al servidor
    try {
      const response = await fetch('https://estudio-backend-ti3p.vercel.app/data', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password
        }),
      });

      if (response.ok) {
        // Contraseña cambiada exitosamente
        setErrorMessage('');
        alert('Contraseña cambiada correctamente ;)')
        setPassword('')
        // Puedes redirigir a otra página o mostrar un mensaje de éxito según tus necesidades
      } else {
        // Manejar errores de la solicitud, por ejemplo, contraseña actual incorrecta
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Error al cambiar la contraseña');
        alert('Error')
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      setErrorMessage('Error al cambiar la contraseña');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">Nueva Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}
        <button type="submit">Cambiar Contraseña</button>
      </form>
    </div>
  );
};

export default ChangePassword;
