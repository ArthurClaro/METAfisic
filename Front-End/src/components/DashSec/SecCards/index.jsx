import { useContext, useEffect, useState } from "react"
import Cards from "./Cards"
import { ExampleContext } from "../../../providers/UserContext"
import ModalCreate from "../../ModalCreate"
import ModalFill from "../../ModalFill"
import styles from './style.module.scss'
import ModalClientFill from "../../ModalClientFill"


function SecCards() {
    const { isOpen, userClient, getUser, setIsOpen, localUser, isOpen2, setLista, setUser, user, isOpenClient, lista } = useContext(ExampleContext)


    useEffect(() => {
        (async () => {
            await getUser()
        })()

    }, []);


    return (
        <>
            <section className={styles.sec}>
                <div className={styles.div}>
                    <h2 className="text title">Contatos</h2>
                    <button className="openModalCreate" onClick={() => setIsOpen(true)}>+</button>
                </div>

                {isOpen ? <ModalCreate /> : null}

                <ul className={styles.ul}>
                    {Array.isArray(userClient.contacts) && userClient.contacts.length > 0 ? (
                        userClient.contacts.map((contacts, index) => (
                            <Cards key={index} contacts={contacts} />
                        ))
                    ) : (
                        <p className='text title'>Você não possui nenhum Contato</p>
                    )}
                </ul>

                {isOpen2 ? <ModalFill /> : null}

                {isOpenClient ? <ModalClientFill /> : null}


            </section>
        </>
    )
}
export default SecCards
