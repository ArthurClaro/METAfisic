import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../../services/api"
import { useForm } from "react-hook-form";
import { formTraining } from "./formTraining";
import { zodResolver } from "@hookform/resolvers/zod"
import styles from './style.module.scss'
import DateCalendarServerRequest from "./date";
import { peitoDays, treino } from "../../data/cards";


function FruitPageSec() {

    const [fruit, setFruit] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const laodFruit = async () => {
            try {
                const { data } = await api.get(`/fruits/${id}`)
                console.log(data)
                setFruit(data)
            } catch (error) {
                console.log(error)
                // alert('não existe')
                // navigate("/")
            }
        }
        laodFruit()
    }, [])

    // os 2 dá pra fazer / Melhor o de cima ${id} = /fruits/peito

    const [loading, setLoading] = useState(false);
    const [fruitList, setFruitList] = useState([]);
    const [category, setCategory] = useState("");

    useEffect(() => {
        const categoriaEspecific = async () => {
            try {
                setLoading(true);
                const { data } = await api.get(`${id}/`, {
                    params: {
                        category: category !== "" ? category : undefined,
                    },
                });
                setFruitList(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        categoriaEspecific();
    }, [category]);

    const [listaALL, setlistaALL] = useState(peitoDays);
    const filteredlistaALL = listaALL.filter(person => person.category == id)

    // console.log(filteredlistaALL)
    const numberLista = filteredlistaALL.map((element) => element.id)
    // console.log(numberLista)

    const [treinoLista, settreinoLista] = useState(treino);
    // console.log(treinoLista)

    // listaAll.id ===  treinoLista.treinoId
    const listaDeIdCorreto = treinoLista.filter((person) => person.treinoId == 6);
    // console.log(listaDeIdCorreto)





    const [listaALL2, setlistaALL2] = useState([]);

    const trainingList = () => {
        listaALL.forEach(element => {
            const list = treinoLista.filter((ttt) => ttt.daysId == element.id)
            // return list
            setlistaALL2(list)
            // console.log(list)
        })
    }

    useEffect(() => {
            trainingList()
    }, []);

    console.log(listaALL2)




    // ////////////////////////////////////////////////////////////////////////////////////////

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formTraining)
    });



    const vttTotal = treinoLista.reduce((prev, current) => {
        return prev + current.volume
    }, 0)

    const subtmit = (formData) => {
        console.log(formData)
        const vol = (formData.kg * formData.repeticoes) * formData.serie
        const addVolume = { ...formData, volume: vol }
        settreinoLista([...treinoLista, addVolume])
        console.log(treinoLista)

        // console.log(vttTotal)
    }

    // ////////////////////////////////////////////////////////////////////////////////////////
    const data = new Date().toLocaleDateString()
    console.log(data)

    return (
        <>
            <section className='container '>
                <h1>aaaaaaaaaaa</h1>
                <br />

                <ul>
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
                ) : null}

                {/* /////////////////////////////////////////////////////////////////////// */}

                <form className={styles.form} onSubmit={handleSubmit(subtmit)} >
                    <label className="text label" htmlFor="name">Nome do Treino</label>
                    <input className="input" type="text" id="name" {...register('nome')} placeholder="Nome do Treino" />
                    {errors.nome ? <p>{errors.nome.message}</p> : null}

                    <label className="text label" htmlFor="email">Série</label>
                    <input className="input" type="number" min="0" max="30" id="email"  {...register('serie')} placeholder="Digite aqui seu e-mail" />
                    {errors.serie ? <p>{errors.serie.message}</p> : null}

                    <label className="text label" htmlFor="password">Kilos (Kg)</label>
                    <input className="input" type="number" step="00.01" max="500" id="password" {...register('kg')} placeholder="Digite aqui sua senha" />
                    {errors.kg ? <p>{errors.kg.message}</p> : null}

                    <label className="text label" htmlFor="confirm">Repetições</label>
                    <input className="input" type="number" id="confirm" min="0" max="30"  {...register('repeticoes')} placeholder="Digite aqui novamente sua senha" />
                    {errors.repeticoes ? <p>{errors.repeticoes.message}</p> : null}

                    {/* <label className="text label" htmlFor="confirm">Volume Total</label>
                    <input className="input" type="number" id="confirm" {...register('volTotal')} placeholder="Digite aqui novamente sua senha" />
                    {errors.confirm ? <p>{errors.confirm.message}</p> : null} */}


                    <button className="cadasterBtn" type="submit">Cadastrar</button>
                </form>


                <DateCalendarServerRequest />
            </section>
        </>
    )
}
export default FruitPageSec
