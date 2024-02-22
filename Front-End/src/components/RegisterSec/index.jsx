import { Link } from "react-router-dom"
import Logo from '../../assets/Contacts.svg'
import FormRegister from "./ReForm"
import styles from './style.module.scss'


function RegisterSec() {


    return (

        <>
        <main className="container register2">
            <article>
                <img src={Logo} alt="" className={styles.contact} />

                <Link to='/'>
                    <button className="backBtn">Voltar</button>
                </Link>
            </article>

            <section className={styles.div}>
                <div>
                    <h3 className="text title">Crie sua conta</h3>
                    <p className="text dont">Rapido e grátis , vamos nessa</p>
                </div>

                <FormRegister />
            </section>
        </main>
        </>
    )
}
export default RegisterSec
