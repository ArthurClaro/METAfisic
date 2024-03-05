import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { api } from "../../services/api"
import { useForm } from "react-hook-form";
import { formTraining } from "./formTraining";
import { zodResolver } from "@hookform/resolvers/zod"
import styles from './style.module.scss'
import DateCalendarServerRequest from "./date";
import { peitoDays, treino } from "../../data/cards";
import { ExampleContext } from "../../providers/UserContext";
import '../../style/index.scss'

// import { Calendar } from "@/components/ui/calendar"


import { Calendar } from 'primereact/calendar';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { addLocale } from 'primereact/api';
import { classNames } from "primereact/utils";
import ModalTrainingFill from "../ModalTrainingFill";
import CardsTrainings from "./CardsTrainings";

function TrainingSec() {

    const { days, createDay, seteditingTraining, diaAtual, calculateVtt, isOpenTrainingFill, setisOpenTrainingFill, takeTrainingCategoryDay, createTraining, trainingsCard, treinosDoDia, daysVtt, training, userLogoutClearDay, takeDayGet, trainingAll, daysAll, dateTemplate, date, setDate } = useContext(ExampleContext)
    const { id } = useParams()

    // console.log(days, "--------------------", trainingAll)
    // console.log(daysAll)

    useEffect(() => {
        (async () => {
            await takeDayGet(id)
            await takeTrainingCategoryDay()
            // await takeTrainingCategoryDay()
        })()

    }, []);


    const [date1, setDate1] = useState(new Date())




    addLocale('es', {
        firstDayOfWeek: 1,
        // showMonthAfterYear: true,
        "dayNames": ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
        "dayNamesShort": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        "dayNamesMin": ["Do", "Se", "Te", "Qa", "Qi", "Sx", "Sa"],
        "monthNames": ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        "monthNamesShort": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        today: 'Hoje',
        clear: 'Limpar',

    });









    // ////////////////////////////////////////////////////////////////////

    // const [fruit, setFruit] = useState(null)
    // const navigate = useNavigate()

    // useEffect(() => {
    //     const laodFruit = async () => {
    //         try {
    //             const { data } = await api.get(`/fruits/${id}`)
    //             console.log(data)
    //             setFruit(data)
    //         } catch (error) {
    //             console.log(error)
    //             // alert('não existe')
    //             // navigate("/")
    //         }
    //     }
    //     laodFruit()
    // }, [])

    // // os 2 dá pra fazer / Melhor o de cima ${id} = /fruits/peito

    // const [loading, setLoading] = useState(false);
    // const [fruitList, setFruitList] = useState([]);
    // const [category, setCategory] = useState("");

    // useEffect(() => {
    //     const categoriaEspecific = async () => {
    //         try {
    //             setLoading(true);
    //             const { data } = await api.get(`${id}/`, {
    //                 params: {
    //                     category: category !== "" ? category : undefined,
    //                 },
    //             });
    //             setFruitList(data);
    //         } catch (error) {
    //             console.log(error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     categoriaEspecific();
    // }, [category]);

    // const [listaALL, setlistaALL] = useState(peitoDays);
    // const filteredlistaALL = listaALL.filter(person => person.category == id)

    // // console.log(filteredlistaALL)
    // const numberLista = filteredlistaALL.map((element) => element.id)
    // // console.log(numberLista)

    // const [treinoLista, settreinoLista] = useState(treino);
    // // console.log(treinoLista)

    // // listaAll.id ===  treinoLista.treinoId
    // const listaDeIdCorreto = treinoLista.filter((person) => person.treinoId == 6);
    // console.log(listaDeIdCorreto)





    // const [listaALL2, setlistaALL2] = useState([]);

    // const trainingList = () => {
    //     listaALL.forEach(element => {
    //         const list = treinoLista.filter((ttt) => ttt.daysId == element.id)
    //         // return list
    //         setlistaALL2(list)
    //         // console.log(list)
    //     })
    // }

    // useEffect(() => {
    //     trainingList()
    // }, []);

    // console.log(listaALL2)




    // ////////////////////////////////////////////////////////////////////////////////////////

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formTraining)
    });



    // const vttTotal = treinoLista.reduce((prev, current) => {
    //     return prev + current.volume
    // }, 0)

    const subtmit = (formData) => {
        // console.log(formData)
        // takeDayGet(String(id))

        let category_id = { category: id }
        createDay(category_id)
        createTraining(formData, String(id))


        // /////////////////////////////////////////////////////////////////////////////////////////////////

        // const vol = (formData.kg * formData.repeticoes) * formData.serie
        // const addVolume = { ...formData, volume: vol }
        // settreinoLista([...treinoLista, addVolume])
        // console.log(treinoLista)
        // console.log(vttTotal)
    }

    // ////////////////////////////////////////////////////////////////////////////////////////
    const data = new Date().toLocaleDateString()
    // console.log(data)




    return (
        <>
            <section className='container '>
                <h1>aaaaaaaaaaa</h1>
                {/* <DateCalendarServerRequest /> */}

                {/* <Calendar
                    mode="single"
                    selected={date1}
                    onSelect={setDate1}
                    className="rounded-md border"
                /> */}

                <br /><br />


                {/* dateFormat="dd/mm/yy" , locale="es"  , inline showWeek */}



                <div className={`${styles.divCalendar} card flex justify-content-center`} >
                    <Calendar className={styles.calendar} locale="es" value={date} onChange={(e) => setDate(e.value)}
                        dateTemplate={dateTemplate}
                        inline
                        pt={{
                            header: {
                                className: classNames('flex items-center justify-between', 'p-2 text-gray-700 dark:text-white/80 bg-red dark:bg-gray-900 font-semibold m-0 border-b border-gray-300 dark:border-blue-900/40 rounded-t-lg')
                                // className: classNames('p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4')
                                // className: classNames('')

                            },
                        }}
                    />
                </div>

                <h2>Estastísticas:</h2>

                {/* <ul>
                    {trainingsCard ? (
                        <li key={trainingsCard.id}>
                            <h1>Dia : {trainingsCard.createdAt} - Treino de {id.charAt(0).toUpperCase() + id.slice(1)}</h1>
                            <h2>Volume Total de Treino feito hoje : {trainingsCard.Vtt}</h2>

                            {trainingsCard.BateuMeta ? (
                                <p>Meta Batida</p>
                            ) : (
                                <div>
                                    <h2>Quanto falta : {trainingsCard.Faltante}</h2>
                                    <p>Meta ainda não Batida</p>
                                    <button>Sugerir Treino </button>
                                </div>
                            )}
                        </li>
                    ) : (
                        <li>Nenhum treinamento encontrado para o dia atual.</li>
                    )}
                </ul> */}

                {/* <ul>
                    {nada ? (
                        <li key={nada.id}>
                            <h1>Dia : {nada.createdAt} - Treino de {id.charAt(0).toUpperCase() + id.slice(1)}</h1>
                            <h2>Volume Total de Treino feito hoje : {nada.Vtt}</h2>

                            {nada.BateuMeta ? (
                                <p>Meta Batida</p>
                            ) : (
                                <div>
                                    <h2>Quanto falta : {nada.Faltante}</h2>
                                    <p>Meta ainda não Batida</p>
                                    <button>Sugerir Treino </button>
                                </div>
                            )}
                        </li>
                    ) : (
                        <li>Nenhum treinamento encontrado para o dia atual.</li>
                    )}
                </ul> */}


                <ul>
                    {diaAtual ? (
                        <li key={diaAtual.id}>
                            <h1>Dia : {diaAtual.createdAt} - Treino de {id.charAt(0).toUpperCase() + id.slice(1)}</h1>
                            <h2>Volume Total de Treino feito hoje : {diaAtual.Vtt}</h2>
                            {/* {console.log(diaAtual.Vtt)} */}
                            {diaAtual.BateuMeta ? (
                                <p>Meta Batida</p>
                            ) : (
                                <div>
                                    <h2>Quanto falta : {diaAtual.Faltante}</h2>
                                    <p>Meta ainda não Batida</p>
                                    <button>Sugerir Treino </button>
                                    {/* ////////////////////////////////// */}
                                </div>
                            )}
                        </li>
                    ) : (
                        <li>Nenhum treinamento encontrado para o dia atual.</li>
                    )}
                </ul>


                <Link to='/room'>
                    <button className="backBtn dash" onClick={userLogoutClearDay}>Sair</button>
                </Link>
                <br />






                <h2>Exercicios Realizados Hoje:</h2>

                {/* treinosDoDia */}
                {/* <ul>
                    {treinosDoDia.map((trn) => (
                        <li key={trn.id}>
                            <p>{trn.name}</p>
                            <p>{trn.kg}</p>
                            <p>{trn.repetitions}</p>
                            <p>{trn.serie}</p>
                            <p>Volume: {trn.volume}</p>
                            <button onClick={() => clickIdLocalStorage(trn.id)} >Editar Dia</button>
                        </li>
                    ))}
                </ul> */}

                <ul>
                    {treinosDoDia.map((trn, index) => (
                        <CardsTrainings key={index} trn={trn} />
                    ))}
                </ul>

                {/* CardsTrainings */}
                {isOpenTrainingFill ? <ModalTrainingFill /> : null}






                <form className={styles.form} onSubmit={handleSubmit(subtmit)} >
                    <label className="text label" htmlFor="name">Nome do Treino</label>
                    <input className="input" type="text" id="name" {...register('name')} placeholder="Nome do Treino" />
                    {errors.nome ? <p>{errors.nome.message}</p> : null}

                    <label className="text label" htmlFor="email">Série</label>
                    <input className="input" type="number" min="0" max="30" id="email"  {...register('serie')} placeholder="Digite aqui seu e-mail" />
                    {errors.serie ? <p>{errors.serie.message}</p> : null}

                    <label className="text label" htmlFor="password">Kilos (Kg)</label>
                    <input className="input" type="number" step="00.01" max="500" id="password" {...register('kg')} placeholder="Digite aqui sua senha" />
                    {errors.kg ? <p>{errors.kg.message}</p> : null}

                    <label className="text label" htmlFor="confirm">Repetições</label>
                    <input className="input" type="number" id="confirm" min="0" max="30"  {...register('repetitions')} placeholder="Digite aqui novamente sua senha" />
                    {errors.repeticoes ? <p>{errors.repeticoes.message}</p> : null}

                    {/* <label className="text label" htmlFor="confirm">Volume Total</label>
                    <input className="input" type="number" id="confirm" {...register('volTotal')} placeholder="Digite aqui novamente sua senha" />
                    {errors.confirm ? <p>{errors.confirm.message}</p> : null} */}


                    <button className="cadasterBtn" type="submit">Cadastrar</button>
                </form>


                <br />


                {/* /////////////////////////////////////////////////////////////////////// */}

                {/* <ul>
                    {filteredlistaALL.map((fruit) => (
                        <li key={fruit.id}>
                            <h2>{fruit.category}</h2>
                            <h2>{fruit.dia}</h2>
                            <h2>{fruit.treino}</h2>
                            <h2>Soma Total {fruit.volTotalTreino}</h2>
                        </li>
                    ))}
                </ul>

                <br />

                {fruit ? (
                    <div>
                        <h3>{fruit.name}</h3>
                        <p>{fruit.price}</p>
                        <p>{fruit.category}</p>
                    </div>
                ) : null} */}

            </section>
        </>
    )
}
export default TrainingSec



