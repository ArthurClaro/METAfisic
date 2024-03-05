import { useContext } from "react"
import styles from './style.module.scss'
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ExampleContext } from "../../../providers/UserContext";


function CardsTrainings({ trn }) {

    // console.log(trn)
    const { setisOpenTrainingFill, seteditingTraining } = useContext(ExampleContext)
    // const {  seteditingContacts, delContacts } = useContext(ContactContext)

    // const clickIdLocalStorage = (productId) => {
    //     localStorage.setItem('@ID_CONTACTS', productId)
    //     seteditingContacts(contacts)
    //     setIsOpen2(true)
    // }

    // const clickDel = (formData) => {
    //     delContacts(formData)
    //     setIsOpen2(false)
    // }

    const clickIdLocalStorage = (trainingId) => {
        localStorage.setItem('@ID_TRAINING', trainingId)
        setisOpenTrainingFill(true)
        seteditingTraining(trn)
        // seteditingContacts(contacts)
        // abrir com as informações já 
    }

    return (

        <>
            {/* <li className={styles.li}>
                <button className={styles.buttonClick} >
                    <h2>{contacts.name}</h2>
                    <div>
                        <p>{contacts.phone}</p>
                        <button className={styles.btnEditt} onClick={() => clickIdLocalStorage(contacts.id)}>
                            <FiEdit2 size={13} color="rgb(0 170 255)" />
                        </button>
                        <button className={styles.btnEditt} onClick={() => clickDel(contacts.id)}>
                            <RiDeleteBin6Line size={13} color="white" />
                        </button>
                    </div>
                </button>
            </li> */}

            <li key={trn.id}>
                <p>{trn.name}</p>
                <p>{trn.kg}</p>
                <p>{trn.repetitions}</p>
                <p>{trn.serie}</p>
                <p>Volume: {trn.volume}</p>
                <button onClick={() => clickIdLocalStorage(trn.id)} >Editar Dia</button>
            </li>
        </>
    )
}
export default CardsTrainings
