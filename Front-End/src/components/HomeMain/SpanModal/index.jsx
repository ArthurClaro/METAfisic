import { useProductsContext } from "../../../providers/UserContext"
import styles from './style.module.scss'

import 'animate.css';
import 'primeicons/primeicons.css';

function SpanModal() {
    const { setIsOpen2, modalRef, buttonRef } = useProductsContext()

    const submit = () => {
        setIsOpen2(false)
        setTimeout(() => {
            window.location.href = '#about'
        }, 800);
    }

    return (
        <>
            <div className={styles.modalOverplay}>
                <div ref={modalRef} className={styles.moadlBox}>
                    <div className={styles.div1}>
                        <h2>Bem-vindo META !</h2>
                        <button ref={buttonRef} onClick={() => setIsOpen2(false)}>
                            <i className="pi pi-times-circle"> </i>
                        </button>
                    </div>

                    <p>Estamos muito contentes em saber que você escolheu se aperfeiçoar para
                        alcançar seus objetivos
                        juntos com a <span>META</span>.
                        Este aplicativo foi desenvolvido com o intuito de ajudá-lo
                        em seu processo de musculação através de um sistema de hipertrofia alvo.
                    </p>

                    <button className={styles.btnModal} onClick={() => submit()}>Pronto para começar...</button>
                </div>
            </div>

        </>
    )
}
export default SpanModal
