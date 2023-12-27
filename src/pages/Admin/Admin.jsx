import React from 'react';

import Uploader from "../../components/Form/Form";

import styles from './Admin.module.css';

const Admin = () => {

    return(
        <div className={styles.container}>
        <h1 className={styles.title}>Panel de administración</h1>
        <Uploader />
  
        </div>
    )
}
export default Admin;