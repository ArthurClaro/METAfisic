import { useContext } from 'react'
import styles from './style.module.scss'
import { ExampleContext } from '../../../providers/UserContext'
import { FiEdit2 } from "react-icons/fi";


function SecUser({ userClient }) {

    const { setIsOpenClient } = useContext(ExampleContext)

    return (

        <>
            <section className={styles.sec}>
                <div>
                    <h3 className='text title'>Olá,  {userClient.name}</h3>
                    <button onClick={() => setIsOpenClient(true)}>
                        <FiEdit2 size={14} color="rgb(0 170 255)" />
                    </button>
                </div>
                <p className='text dont'>{userClient.email}</p>
            </section>
        </>
    )
}
export default SecUser
