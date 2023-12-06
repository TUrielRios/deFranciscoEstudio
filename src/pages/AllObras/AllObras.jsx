import React from "react";
import styles from './AllObras.module.css'
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

const AllObras = () => {
    return(
        <>
            <div className={styles.containerF}>
                <p>
                    Nuestro estudio cuenta con más de 40 años de trayectoria. Son muchas las personas, 
                    familias y empresas que confían en nosotros para convertir sus sueños en proyectos y sus proyectos en realidad.
                </p>
                <img src="https://static.wixstatic.com/media/c36ba4_6d93b9cb7cee4f88815bc5827b923f80~mv2.jpg/v1/fill/w_530,h_750,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c36ba4_6d93b9cb7cee4f88815bc5827b923f80~mv2.jpg" alt="o" />
                <img src="https://static.wixstatic.com/media/c36ba4_8d1579be65d14fe99f92a22ccc002615~mv2.jpg/v1/fill/w_529,h_749,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c36ba4_8d1579be65d14fe99f92a22ccc002615~mv2.jpg" alt="o" />
                <img src="https://static.wixstatic.com/media/c36ba4_20ce2a678153495ea4b45e2167c391b4~mv2.jpg/v1/fill/w_530,h_750,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c36ba4_20ce2a678153495ea4b45e2167c391b4~mv2.jpg" alt="o" />
                <img src="https://static.wixstatic.com/media/c36ba4_5c1d1093e25f461c8038def1ce13f04a~mv2.jpg/v1/fill/w_530,h_750,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c36ba4_5c1d1093e25f461c8038def1ce13f04a~mv2.jpg" alt="o" />
                <img src="https://static.wixstatic.com/media/c36ba4_027c85b2e98546958484798d42ede33e~mv2.jpg/v1/fill/w_530,h_750,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c36ba4_027c85b2e98546958484798d42ede33e~mv2.jpg" alt="o" />
                <img src="https://static.wixstatic.com/media/c36ba4_e092fd4cd24941e7b64ec54f7d9cc148~mv2.jpg/v1/fill/w_530,h_750,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c36ba4_e092fd4cd24941e7b64ec54f7d9cc148~mv2.jpg" alt="o" />
                <img src="https://static.wixstatic.com/media/c36ba4_70dfbb49b7be4e70a08f9ba99f23fe18~mv2.jpg/v1/fill/w_530,h_750,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c36ba4_70dfbb49b7be4e70a08f9ba99f23fe18~mv2.jpg" alt="o" />
                <img src="https://static.wixstatic.com/media/c36ba4_3c634157e792407785edbfb3eaaf4480~mv2.jpg/v1/fill/w_530,h_750,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c36ba4_3c634157e792407785edbfb3eaaf4480~mv2.jpg" alt="o" />
                <img src="https://static.wixstatic.com/media/c36ba4_1f3e054c4fd34f3192550b389374d538~mv2.jpg/v1/fill/w_530,h_750,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c36ba4_1f3e054c4fd34f3192550b389374d538~mv2.jpg" alt="o" />
            </div>
            <Link className={styles.link} to="/arquitectura/obras-terminadas">
            <button className={styles.btnVolver}>Volver</button>
            </Link>


            <div className={styles.footer}> 
            <Footer />
            </div>
        </>
         
    )
}
export default AllObras;