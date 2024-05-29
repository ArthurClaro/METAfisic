import styles from './style.module.scss'
import { useForm } from "react-hook-form"
import { useProductsContext } from "../../../providers/UserContext"

function ModalTrainingFill() {
    const { modalRef, clickDayCalendar, delTrainingDay, buttonRef, patchTrainingDay, setisOpenTrainingFill, editingTraining } = useProductsContext()

    const { register, handleSubmit } = useForm({
        values: {
            name: editingTraining.name,
            kg: editingTraining.kg,
            repetitions: editingTraining.repetitions,
            serie: editingTraining.serie,
        }
    });

    const subtmit = (formData) => {
        const dataToSend = {
            ...formData,
            kg: Number(formData.kg),
            repetitions: Number(formData.repetitions),
            serie: Number(formData.serie),
            volume: Number((formData.kg * formData.repetitions) * formData.serie),
        };

        patchTrainingDay(dataToSend)
        setisOpenTrainingFill(false)
        clickDayCalendar()
    }
    const clickDel = (formData) => {
        delTrainingDay(formData)
        setisOpenTrainingFill(false)
    }


    return (
        <>
            <div className={styles.modalOverplay}>
                <div ref={modalRef} className={styles.moadlBox}>
                    <div className={styles.div1}>
                        <h2>Detalhes do Treino</h2>
                        <button ref={buttonRef} onClick={() => setisOpenTrainingFill(false)}>
                            <i className="pi pi-times-circle"> </i>
                        </button>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit(subtmit)}>
                        <label htmlFor="title">Nome do Treino</label>
                        <input type="text" id="title" required  {...register('name')} placeholder="Nome do seu Treino" />

                        <label htmlFor="title">Kilos (Kg)</label>
                        <input type="number" step="00.01" min="2.5" max="500" required id="title"   {...register('kg')} placeholder="Quantos Kilos ?" />

                        <label htmlFor="title">Repetições</label>
                        <input type="number" min="1" max="30" id="title" required  {...register('repetitions')} placeholder="Quantas Repetições ?" />

                        <label htmlFor="title">Séries</label>
                        <input type="number" min="1" max="30" id="title" required  {...register('serie')} placeholder="Quantas Séries ?" />


                        <div className={styles.divButton}>
                            <button type="submit">Salvar alterações</button>
                            <button className={styles.btnRed} onClick={() => clickDel(editingTraining.id)}>Excluir Treino</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}
export default ModalTrainingFill
