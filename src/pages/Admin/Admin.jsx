import React, {useState} from 'react';
import Uploader from "../../components/Form/Form";
import styles from './Admin.module.css';
import ListaDeObras from '../../components/ListaDeObras/ListaDeObras';
import ListaDeEmpleados from '../../adminComponents/ListaDeEmpleados/ListaDeEmpleados';
import FormEmpleados from '../../adminComponents/FormEmpleados/FormEmpleados';
import { useNavigate } from 'react-router-dom';

const Admin = () => {

    
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    let [isLoggedIn, setIsLoggedIn] = useState(false);

    

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('https://estudio-backend-ti3p.vercel.app/data');
    
            if (response.ok) {
                const data = await response.json();
                console.log('Data from API:', data);
                console.log("password", data[0].password)
    
                const contraseña = data[0].password;
    
                if (password === contraseña) {
                    console.log('Contraseña correcta. Iniciando sesión.');
                    setError('');
                    setIsLoggedIn(true);
                    navigate('/admin');
                } else {
                    console.log('Contraseña incorrecta.');
                    setError('Contraseña incorrecta');
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
    



    return(
        <div>
            {isLoggedIn ?
                <div className={styles.mainContainer}>
                    <h1 className={styles.title}>Panel de administración</h1>
                    <div className={styles.formCreateContainer}>
                        <Uploader />
                    </div>

                    <section className={styles.listaDeObras}>
                        <ListaDeObras />
                    </section>
                    <section className={styles.listaDeEmpleados}>
                        <ListaDeEmpleados />
                    </section>
                    <section>
                        <FormEmpleados />
                    </section>
            
                </div> 
                :
                <form onSubmit={handlePasswordSubmit}>
            <label>
                Contraseña:
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button type="submit">Ingresar</button>
            {error && <p>{error}</p>}
            </form>
                }
        </div>
        
    )
}
export default Admin;