import { useContext, useEffect } from "react"
import { ExampleContext } from "../../providers/UserContext"
import styles from './style.module.scss'
import { useForm } from "react-hook-form"
import { ContactContext } from "../../providers/Contacts"



function ModalTrainingFill() {
    const { setIsOpen2, modalRef, calculateVtt, currentDay1, takeTrainingCategoryDay, buttonRef, delClient, patchTrainingDay, setisOpenTrainingFill, editingTraining, isOpenClient, pacthClients, editingClient, seteditingClient } = useContext(ExampleContext)

    const { register, handleSubmit } = useForm({
        values: {
            name: editingTraining.name,
            kg: editingTraining.kg,
            repetitions: editingTraining.repetitions,
            serie: editingTraining.serie,
        }
    });

    const subtmit = (formData) => {
        // console.log(formData)
        const dataToSend = {
            ...formData,
            kg: Number(formData.kg),
            repetitions: Number(formData.repetitions),
            serie: Number(formData.serie),
            volume: Number((formData.kg * formData.repetitions) * formData.serie),
        };

        console.log(dataToSend);
        patchTrainingDay(dataToSend)
        // window.location.reload()
        setisOpenTrainingFill(false)

        // calculateVtt()
    }
    const clickDel = (formData) => {
        console.log(formData)
        // delClient(formData)
        setisOpenTrainingFill(false)
    }


    return (
        <>
            <div className={styles.modalOverplay}>
                <div ref={modalRef} className={styles.moadlBox}>
                    <div className={styles.div1}>
                        <p>Detalhes de Usuário</p>
                        <button ref={buttonRef} onClick={() => setisOpenTrainingFill(false)}>X</button>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit(subtmit)}>
                        <label className="text label" htmlFor="title">Nome Completo</label>

                        <input className="input" type="text" id="title" required  {...register('name')} placeholder="Seu Nome de Usuário" />

                        <label className="text label" htmlFor="title">E-mail</label>
                        <input className="input" type="number" step="00.01" max="500" required id="title"   {...register('kg')} placeholder="Seu E-mail de Usuário" />

                        <label className="text label" htmlFor="title">Número</label>
                        <input className="input" type="number" min="0" max="30" id="title" required  {...register('repetitions')} placeholder="Seu Número de Usuário" />

                        <label className="text label" htmlFor="title">Número</label>
                        <input className="input" type="number" min="0" max="30" id="title" required  {...register('serie')} placeholder="Seu Número de Usuário" />


                        <div className={styles.divButton}>
                            <button type="submit">Salvar alterações</button>
                            <button onClick={() => clickDel(editingClient.id)}>Excluir Usuário</button>
                        </div>
                    </form>

                </div>
            </div>

        </>
    )
}
export default ModalTrainingFill
