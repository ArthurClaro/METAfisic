import styles from './style.module.scss'

import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';

import { useProductsContext } from "../../../providers/UserContext";

function Footer() {
    const { useRedirect, userLogoutClearDay, setVisibleModal } = useProductsContext()

    const list = document.querySelectorAll('.list')
    function activeLink() {
        list.forEach((item) =>
            item.classList.remove('active'));
        this.classList.add('active')
    }
    list.forEach((item) =>
        item.addEventListener('click', activeLink))


    const handleRedirectToHome = useRedirect('/', userLogoutClearDay, 100);

    const handleClick = (e) => {
        e.preventDefault();
        handleRedirectToHome();
        setVisibleModal(false)
    };

    return (
        <>
            <footer className={styles.footer}>

                <div className="navigation">
                    <ul>
                        <li className="list ">
                            <a href="/" onClick={handleClick}>
                                <span className="icon">
                                    <ion-icon name="home-outline"></ion-icon>
                                </span>
                                <span className="text">Home</span>
                            </a>
                        </li>
                        <li className="list">
                            <a href="#progress">
                                <span className="icon">
                                    <ion-icon name="bar-chart-outline"></ion-icon>
                                </span>
                                <span className="text">Progresso</span>
                            </a>
                        </li>
                        <li className="list active">
                            <a href="#statistics">
                                <span className="icon">
                                    <ion-icon name="barbell-outline"></ion-icon>
                                </span>
                                <span className="text">Treinos</span>
                            </a>
                        </li>
                        <li className="list">
                            <a href="#main">
                                <span className="icon">
                                    <ion-icon name="calendar-number-outline"></ion-icon>
                                </span>
                                <span className="text">Calendar</span>
                            </a>
                        </li>
                        <li className="list">
                            <a href="#create">
                                <span className="icon">
                                    <ion-icon name="create-outline"></ion-icon>
                                </span>
                                <span className="text">Create</span>
                            </a>
                        </li>
                        <div className="indicator"></div>
                    </ul>
                </div>

            </footer>
        </>
    )
}
export default Footer
