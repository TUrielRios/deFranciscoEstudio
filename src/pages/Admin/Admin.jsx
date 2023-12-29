import React from 'react';

import Uploader from "../../components/Form/Form";

import styles from './Admin.module.css';
import ListaDeObras from '../../components/ListaDeObras/ListaDeObras';

const Admin = () => {

    return(
        <div className={styles.container}>
        <h1 className={styles.title}>Panel de administración</h1>
        <Uploader />
        <section className={styles.listaDeObras}>
            <ListaDeObras />
        </section>
  
        </div>
    )
}
export default Admin;