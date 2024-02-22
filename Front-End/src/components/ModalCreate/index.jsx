import { useContext } from "react"
import { ExampleContext } from "../../providers/UserContext"
import { ContactContext } from "../../providers/Contacts"
import styles from './style.module.scss'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formModalCreate } from "./formModalCreate"


function ModalCreate() {
    const { setIsOpen, modalRef, buttonRef } = useContext(ExampleContext)
    const {  createContact } = useContext(ContactContext)


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formModalCreate)
    });

    const subtmit = (formData) => {
        createContact(formData)
        setIsOpen(false)
    }

    return (
        <>
            <div className={styles.modalOverplay}>
                <div ref={modalRef} className={styles.moadlBox}>
                    <div className={styles.div1}>
                        <p>Cadastrar Contato</p>
                        <button ref={buttonRef} onClick={() => setIsOpen(false)}>X</button>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit(subtmit)}>
                     
                        <label className="text label" htmlFor="title">Nome Completo</label>
                        <input className="input" type="text" id="title"   {...register('name')} placeholder="Nome para Contato" />
                        {errors.name ? <p>{errors.name.message}</p> : null}

                        <label className="text label" htmlFor="title">E-mail</label>
                        <input className="input" type="text" id="title"   {...register('email')} placeholder="E-mail para Contato" />
                        {errors.email ? <p>{errors.email.message}</p> : null}

                        <label className="text label" htmlFor="title">Número</label>
                        <input className="input" type="text" id="title"   {...register('phone')} placeholder="Número para Contato" />
                        {errors.phone ? <p>{errors.phone.message}</p> : null}

                        <button className="cadasterBtn" type="submit">Cadastrar Contato</button>
                    </form>

                </div>
            </div>

        </>
    )
}
export default ModalCreate
