import { useContext, useEffect } from "react"
import { ExampleContext } from "../../providers/UserContext"
import styles from './style.module.scss'
import { useForm } from "react-hook-form"
import { ContactContext } from "../../providers/Contacts"



function ModalClientFill() {
    const { setIsOpen2, modalRef, buttonRef, delClient, setIsOpenClient, isOpenClient, pacthClients, editingClient, seteditingClient } = useContext(ExampleContext)
    const { editingContacts, pacthContacts } = useContext(ContactContext)

    const { register, handleSubmit } = useForm({
        values: {
            name: editingClient.name,
            email: editingClient.email,
            phone: editingClient.phone,
        }
    });



    const subtmit = (formData) => {
        pacthClients(formData)
        setIsOpenClient(false)
    }
    const clickDel = (formData) => {
        delClient(formData)
        setIsOpenClient(false)
    }


    return (
        <>
            <div className={styles.modalOverplay}>
                <div ref={modalRef} className={styles.moadlBox}>
                    <div className={styles.div1}>
                        <p>Detalhes de Usuário</p>
                        <button ref={buttonRef} onClick={() => setIsOpenClient(false)}>X</button>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit(subtmit)}>
                        <label className="text label" htmlFor="title">Nome Completo</label>

                        <input className="input" type="text" id="title"   {...register('name')} placeholder="Seu Nome de Usuário" />

                        <label className="text label" htmlFor="title">E-mail</label>
                        <input className="input" type="text" id="title"   {...register('email')} placeholder="Seu E-mail de Usuário" />

                        <label className="text label" htmlFor="title">Número</label>
                        <input className="input" type="text" id="title"   {...register('phone')} placeholder="Seu Número de Usuário" />

                        <div className={styles.divButton}>
                            <button  type="submit">Salvar alterações</button>
                            <button  onClick={() => clickDel(editingClient.id)}>Excluir Usuário</button>
                        </div>
                    </form>

                </div>
            </div>

        </>
    )
}
export default ModalClientFill
