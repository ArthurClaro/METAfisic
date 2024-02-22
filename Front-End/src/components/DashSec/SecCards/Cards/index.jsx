import { useContext } from "react"
import { ExampleContext } from "../../../../providers/UserContext"
import styles from './style.module.scss'
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ContactContext } from "../../../../providers/Contacts";


function Cards({ contacts }) {

    const { setIsOpen2 } = useContext(ExampleContext)
    const {  seteditingContacts, delContacts } = useContext(ContactContext)

    const clickIdLocalStorage = (productId) => {
        localStorage.setItem('@ID_CONTACTS', productId)
        seteditingContacts(contacts)
        setIsOpen2(true)
    }

    const clickDel = (formData) => {
        delContacts(formData)
        setIsOpen2(false)
    }

    return (

        <>
            <li className={styles.li}>
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
            </li>
        </>
    )
}
export default Cards
