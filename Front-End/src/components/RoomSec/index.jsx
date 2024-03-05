import { api } from "../../services/api";
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { groupsMuscles } from "../../data/cards";
import { ExampleContext } from "../../providers/UserContext";


function RoomSec() {

    const { groups, getGroups } = useContext(ExampleContext)
    // console.log(groups)
    
    // useEffect(() => {
    //     (async () => {
    //         await getGroups()
    //     })()

    // }, []);
    // //////////////////////////

    // const [loading, setLoading] = useState(false);
    // const [fruitList, setFruitList] = useState([]);

    // const [category, setCategory] = useState("");

    // useEffect(() => {
    //     const getFruits = async () => {
    //         try {
    //             setLoading(true);
    //             const { data } = await api.get("fruits", {
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
    //     getFruits();
    // }, [category]);

    // useEffect(() => {
    //     const loadData = async () => {
    //         try {
    //             setLoading(true);
    //             const { data } = await api.get("/fruits");
    //             setFruitList(data);
    //         } catch (error) {
    //             console.log(error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     loadData();
    // }, []);



    // const [groupM, setgroupM] = useState(groupsMuscles);

    return (
        <>
            <section className='container '>
                <h1>Módulos :</h1>

                <br />

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
                </ul>

                <br />

                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <ul>
                        {fruitList.map((fruit) => (
                            <li key={fruit.id}>
                                <h2>{fruit.name}</h2>
                                <p>{fruit.price}</p>
                            </li>
                        ))}
                    </ul>
                )}

                <br />

                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <ul>
                        {fruitList.map((fruit) => (
                            <li key={fruit.id}>
                                <Link to={`/fruit/${fruit.id}`}>
                                    <h2>{fruit.name}</h2>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                {groupM.map(group => {
                    return <li key={group.id}>
                        <Link to={`/fruit/${group.category}`}>
                            <h2>{group.category}</h2>
                        </Link>

                    </li>
                })} */}

                {/* ////////////////////////////////////////////////////////////////////////////// */}

                {/* <ul >
                    {Array.isArray(fruitList) && fruitList.length > 0 ? (
                        fruitList.map((fruit) => (
                            <li key={fruit.id}>
                                <Link to={`/fruit/${fruit.id}`}>
                                    <h2>{fruit.name}</h2>
                                </Link>
                            </li>
                            // <Cards key={index} contacts={contacts} />
                        ))
                    ) : (
                        <p className='text title'>Você não possui nenhum Contato</p>
                    )}
                </ul> */}


                <br />

                {/* {loading2 ? (
                    <p>Carregando...</p>
                ) : (
                    <ul>
                        {groups.map(group => {
                            return <li key={group.id}>
                                <Link to={`/fruit/${group.nome}`}>
                                    <h2>{group.nome}</h2>
                                </Link>

                            </li>
                        })}
                    </ul>
                )} */}

                {groups.map(group => {
                    return <li key={group.id}>
                        <Link to={`/room/${group.nome}`}>
                            <h2>{group.nome}</h2>
                        </Link>

                    </li>
                })}


                <br /><br />
                <input type="date" color="#1111" />

            </section>
        </>
    )
}
export default RoomSec
