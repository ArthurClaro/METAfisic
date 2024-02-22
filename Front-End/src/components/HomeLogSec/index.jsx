import { useEffect, useState } from 'react';
import Contact from '../../assets/Contacts.svg'
import BoxForm from './BoxForm'
import styles from './style.module.scss'
import { api } from '../../services/api';
import { Link } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';

// import MinMaxExample from './date';





function HomeLogSec() {

    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState("");
    const [fruitList, setFruitList] = useState([]);

    useEffect(() => {
        const getFruits = async () => {
            try {
                setLoading(true);
                const { data } = await api.get("fruits", {
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
        getFruits();
    }, [category]);



    return (
        <>
            <section className='container '>
                <DatePicker />
                <br />
                {/* <MinMaxExample /> */}


                <img src={Contact} className={styles.contact} alt="" />

                {/* <ul>
                    <li>
                        <button onClick={() => setCategory("")}>Todos</button>
                    </li>
                    <li>
                        <button onClick={() => setCategory("vermelha")}>Vermelhas</button>
                    </li>
                    <li>
                        <button onClick={() => setCategory("amarela")}>Amarelas</button>
                    </li>
                </ul> */}
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <ul>
                        {fruitList.map((fruit) => (
                            <li key={fruit.id}>
                                <Link to={`/fruit/${fruit.id}`}>
                                    <h2>{fruit.name}</h2>
                                    <p>{fruit.price}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                <BoxForm />
            </section>
        </>
    )
}
export default HomeLogSec
