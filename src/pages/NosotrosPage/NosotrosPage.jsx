import React from "react";
import Nosotros from '../../components/Nosotros/Nosotros'
import styles from './NosotrosPage.module.css'




const NosotrosPage = () => {
    return(
        <div className={styles.bodyNosotros}>
            <Nosotros />
        </div>
    )
}
export default NosotrosPage;