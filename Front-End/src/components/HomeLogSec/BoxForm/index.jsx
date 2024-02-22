import { Link } from "react-router-dom"
import FormGo from "./Form"
import styles from './style.module.scss'

function BoxForm() {

    return (
        <>
            <div className={styles.div}>
                <h4 className="text title">Login</h4>

                <FormGo />

                <p className="text dont">Ainda não possui uma conta?</p>

                <Link to='/register'>
                    <button className="registerBtn">Register</button>
                </Link>
            </div>
        </>
    )
}
export default BoxForm
