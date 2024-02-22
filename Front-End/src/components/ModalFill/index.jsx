import { useContext, useEffect } from "react"
import { ExampleContext } from "../../providers/UserContext"
import styles from './style.module.scss'
import { useForm } from "react-hook-form"
import { ContactContext } from "../../providers/Contacts"



function ModalFill() {
    const { setIsOpen2, modalRef, buttonRef } = useContext(ExampleContext)
    const {  editingContacts, pacthContacts } = useContext(ContactContext)

    const { register, handleSubmit } = useForm({
        values: {
            name: editingContacts.name,
            email: editingContacts.email,
            phone: editingContacts.phone,
        }
    });


    const subtmit = (formData) => {
        pacthContacts(formData)
        setIsOpen2(false)
    }


    return (
        <>
            <div className={styles.modalOverplay}>
                <div ref={modalRef} className={styles.moadlBox}>
                    <div className={styles.div1}>
                        <p>Detalhes de Contato</p>
                        <button ref={buttonRef} onClick={() => setIsOpen2(false)}>X</button>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit(subtmit)}>
                        <label className="text label" htmlFor="title">Nome Completo</label>

                        <input className="input" type="text" id="title"   {...register('name')} placeholder="Nome para Contato" />

                        <label className="text label" htmlFor="title">E-mail</label>
                        <input className="input" type="text" id="title"   {...register('email')} placeholder="E-mail para Contato" />

                        <label className="text label" htmlFor="title">Número</label>
                        <input className="input" type="text" id="title"   {...register('phone')} placeholder="Número para Contato" />


                        <button className="atulizarBtn" type="submit">Salvar alterações</button>
                    </form>
                </div>
            </div>

        </>
    )
}
export default ModalFill
