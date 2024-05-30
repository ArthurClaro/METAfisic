import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form";
import { formTraining } from "./formTraining";
import { zodResolver } from "@hookform/resolvers/zod"
import styles from './style.module.scss'
import { trainingExamples } from "../../data/cards";
import { useProductsContext } from "../../providers/UserContext";
import '../../style/index.scss'

import { Calendar } from 'primereact/calendar';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { addLocale } from 'primereact/api';
import ModalTrainingFill from "./ModalTrainingFill";

import 'primeicons/primeicons.css';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Footer from "./Footer";


function TrainingMain() {

    const { toastErro, createDay, numberMetasGreen, seteditingTraining, diaAtual, isOpenTrainingFill, setisOpenTrainingFill, takeTrainingCategoryDay, createTraining, treinosDoDia, takeDayGet, dateTemplate, date, setDate } = useProductsContext()
    const { id } = useParams()

    useEffect(() => {
        (async () => {
            await takeDayGet(id)
            await takeTrainingCategoryDay()
        })()
    }, []);

    addLocale('es', {
        firstDayOfWeek: 1,
        "dayNames": ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
        "dayNamesShort": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        "dayNamesMin": ["Do", "Se", "Te", "Qa", "Qi", "Sx", "Sa"],
        "monthNames": ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        "monthNamesShort": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        today: 'Hoje',
        clear: 'Limpar',
    });

    const [formValues, setFormValues] = useState(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(formTraining),
        defaultValues: formValues,
    });

    const suggestTraining = (paramId) => {
        const currentExample = trainingExamples.find(element => element.category === paramId);

        const dataToSend = {
            ...formValues,
            name: currentExample.examples[Math.floor(Math.random() * currentExample.examples.length)].name,
            kg: currentExample.examples[Math.floor(Math.random() * currentExample.examples.length)].kg,
            repetitions: currentExample.examples[Math.floor(Math.random() * currentExample.examples.length)].repetitions,
            serie: currentExample.examples[Math.floor(Math.random() * currentExample.examples.length)].serie,
        };
        setFormValues(dataToSend)
        reset(dataToSend)
        window.location.href = '#create'
    }

    useEffect(() => {
        reset(formValues);
    }, [formValues, reset]);

    const subtmit = (formData) => {
        let category_id = { category: id }
        createDay(category_id)
        createTraining(formData, String(id))
        reset()
    }

    const buttonFill = (rowData) => {
        return <span onClick={() => clickIdLocalStorage(rowData)} className="pi pi-pencil cursorGreen"></span>
    };
    const clickIdLocalStorage = (training) => {
        localStorage.setItem('@ID_TRAINING', training.id)
        setisOpenTrainingFill(true)
        seteditingTraining(training)
        takeDayGet(id)
    }

    const columnNameTemplate = () => {
        return <div>
            <span className="">
                <ion-icon name="bar-chart-outline"></ion-icon>
            </span>
            <p className="">Exercicios Realizados ({treinosDoDia.length})</p>
        </div>
    };
    const kgBodyTemplate = (rowData) => {
        return rowData.kg.toFixed(2);
    };

    return (
        <>
            {isOpenTrainingFill ? <ModalTrainingFill /> : null}

            <main className={styles.container} id="main">

                <section className={styles.sec1} >
                    <h2 className="singUp">Dias de Ofenssiva ( <span>{Object.keys(numberMetasGreen).length}</span> )</h2>
                    <Calendar locale="es" value={date} onChange={(e) => setDate(e.value)} dateTemplate={dateTemplate} inline />
                    <div className={styles.divOp}>
                        <h6>Não Batida</h6>
                        <p>Batida</p>
                    </div>
                </section>

                <section className={styles.sec2} id="statistics">

                    <h1>Estastísticas</h1>

                    {diaAtual && Object.keys(diaAtual).length > 0 ? (
                        <div className={styles.divStatis} key={diaAtual.id}>
                            <h2>Dia: {diaAtual.createdAt} - Treino de {id.charAt(0).toUpperCase() + id.slice(1)}</h2>
                            <h3>Volume Total de Treino feito{diaAtual.createdAt === new Date().toLocaleDateString() ? ' hoje' : ''}: {diaAtual.Vtt}</h3>

                            {diaAtual.BateuMeta ? (
                                <p>Meta Batida</p>
                            ) : (
                                <div>
                                    <article>
                                        <h5>Quanto falta: {diaAtual.Faltante}</h5>
                                        <p >Meta <span>NÃO</span> Batida</p>
                                    </article>
                                    {diaAtual.createdAt === new Date().toLocaleDateString() && (
                                        <button onClick={() => suggestTraining(id)}>Sugerir Treino</button>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {diaAtual === undefined || diaAtual.length === 0 || new Date().toLocaleDateString() === new Date(date).toLocaleDateString() ? (
                                <h4>Vamos começar? Adicione algum treino ao seu dia.</h4>
                            ) : (
                                <h4>Não corresponde ao dia atual ,espere pelo dia para adicionar novos treinos...</h4>
                            )}
                        </div>

                    )}

                </section>

                <section className={styles.sec3} id="progress">

                    {diaAtual == undefined || Object.keys(diaAtual).length == 0 ? (
                        null
                    ) : (
                        diaAtual.createdAt == new Date().toLocaleDateString() || diaAtual == undefined || diaAtual.length == 0 ? (
                            <div className="card p-fluid tabela">
                                <DataTable value={treinosDoDia} sortField="volume" sortOrder={-1} stripedRows scrollable scrollHeight="510px" tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="name" header={columnNameTemplate} footer='Treino'></Column>
                                    <Column field="kg" body={kgBodyTemplate} footer="Kilos(Kg)"></Column>
                                    <Column field="repetitions" footer="Repetições"></Column>
                                    <Column field="serie" footer="Séries"></Column>
                                    <Column field="volume" sortable footer="Volume Total do seu Treino" header='VTT'></Column>
                                    <Column body={buttonFill} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                                </DataTable>
                            </div>
                        ) : (
                            <div className="card p-fluid tabela">
                                <DataTable value={treinosDoDia} sortField="volume" sortOrder={-1} stripedRows scrollable scrollHeight="510px" tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="name" header={columnNameTemplate} footer='Treino'></Column>
                                    <Column field="kg" body={kgBodyTemplate} footer="Kilos(Kg)"></Column>
                                    <Column field="repetitions" footer="Repetições"></Column>
                                    <Column field="serie" footer="Séries"></Column>
                                    <Column field="volume" sortable footer="Volume Total do seu Treino" header='VTT'></Column>
                                </DataTable>
                            </div>
                        )
                    )}
                </section>


                <section className={styles.sec4} id="create">

                    {new Date().toLocaleDateString() === date || new Date().toLocaleDateString() === new Date(date).toLocaleDateString() ? (

                        <form className={styles.form} onSubmit={handleSubmit(subtmit)} >
                            <h2>Registrar um Treino</h2>

                            <label htmlFor="name">Nome do Treino</label>
                            <input type="text" id="name"  {...register('name')} placeholder="Nome do Treino" />
                            {errors.name ? toastErro(`${errors.name.message}`, 3000) : null}

                            <label htmlFor="serie">Série</label>
                            <input type="number" id="serie"  {...register('serie')} placeholder="Quantas Series?" />
                            {errors.serie ? toastErro(`${errors.serie.message}`, 3000) : null}

                            <label htmlFor="kg">Kilos (Kg)</label>
                            <input type="number" step="00.01" id="kg" {...register('kg')} placeholder="Quantos Kilos?" />
                            {errors.kg ? toastErro(`${errors.kg.message}`, 3000) : null}

                            <div className={styles.divFlexDesktop}>
                                <div>
                                    <label htmlFor="repetitions">Repetições</label>
                                    <input type="number" id="repetitions"  {...register('repetitions')} placeholder="Quantas Repeticões?" />
                                </div>
                                {errors.repetitions ? toastErro(`${errors.repetitions.message}`, 3000) : null}

                                <button className="cadasterBtn" type="submit">Cadastrar</button>
                            </div>
                        </form>
                    ) : (
                        null
                    )}
                </section>

            </main>

            <Footer />
        </>
    )
}
export default TrainingMain



