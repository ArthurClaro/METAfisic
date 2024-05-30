import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useProductsContext } from "../../providers/UserContext";
import styles from './style.module.scss'
import LogoHome from '../../assets/home.png'
import LogoModal from '../../assets/modal.png'

import 'primeicons/primeicons.css';
import { SpeedDial } from 'primereact/speeddial';
import { Toast } from 'primereact/toast';

import 'animate.css';
import SpanModal from './SpanModal';

import MapContact from './MapContact/Map';
import emailjs from '@emailjs/browser';

import ModalAside from './ModalAside';
import AboutDivs from './AboutDivs';


function HomeMain() {
    const { toastSuccess, groups, clickGoOut, isOpen2, visibleModal, setVisibleModal } = useProductsContext()

    const toast = useRef(null);
    const items = [
        {
            label: 'Go-Out',
            icon: 'pi pi-sign-out',
            command: () => {
                clickGoOut()
            }
        },
        {
            label: 'Groups',
            icon: 'pi pi-map',
            command: () => {
                window.location.href = '#groups'
            }
        },
        {
            label: 'User',
            icon: 'pi pi-user',
            command: () => {
                setVisibleModal(true)
            }
        }

    ];

    const form = useRef()

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
            .sendForm('service_0ws7ncz', 'template_irwgrot', form.current, 'yZVKiIGooNCfxZnta')
            .then(
                () => {
                    toastSuccess('E-mail enviado !', 2000)
                    form.current.reset();
                },
                (error) => {
                    console.log('FAILED...', error.text);
                }
            );
    };


    const upMain = () => {
        setTimeout(() => {
            window.location.href = '#main'
        }, 1000);
    }

    return (
        <>

            <main className={styles.container}>

                <section id='sec1' className={`${styles.sec1} section `}>

                    <div>
                        <img src={LogoHome} className="animate__animated animate__fadeIn animate__delay-1s " alt="awd" />
                        <h1 className="animate__animated animate__fadeIn animate__delay-1s ">METAFISIC</h1>
                    </div>

                    <a href="#groups" className={styles.arrowLinkB}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style={{ fill: 'rgba(0, 255, 127, 1)' }} ><path d="m12 15.586-4.293-4.293-1.414 1.414L12 18.414l5.707-5.707-1.414-1.414z"></path><path d="m17.707 7.707-1.414-1.414L12 10.586 7.707 6.293 6.293 7.707 12 13.414z"></path></svg>
                    </a>

                    <div className="modalFixed">
                        <div style={{ height: '500px' }} className="flex align-items-center justify-content-center">
                            <Toast ref={toast} position="top-left" />
                            <SpeedDial model={items}
                                transitionDelay={100}
                                radius={90}
                                type="quarter-circle" direction="up-left"
                                style={{ right: 15, bottom: 20 }}
                                showIcon={<img src={LogoModal} alt="awd" />} />
                        </div>
                    </div>
                </section>


                {isOpen2 ? <SpanModal /> : null}

                {visibleModal ? <ModalAside /> : null}

                <section id='groups' className={styles.sec2}>
                    <h1 className='singUp'>Exercícios Musculares</h1>

                    <ul>
                        {groups.map(group => {
                            return <li key={group.id}>
                                <Link onClick={() => upMain()} to={`/groups/${group.nome}`}>
                                    <img src={group.imageURL} alt={group.nome} />
                                    <h2> {group.nome.charAt(0).toUpperCase() + group.nome.slice(1)}</h2>
                                </Link>
                            </li>
                        })}
                    </ul>

                </section>


                <section id='about' className={styles.sec3}>
                    <AboutDivs />
                </section>


                <section id='contact' className={styles.sec4}>

                    <form className={styles.formIndex} ref={form} onSubmit={sendEmail}>
                        <p>Contato / Suporte</p>

                        <div className="input-container">
                            <input placeholder="Seu nome" name="name" className="input-field" type="text" required />
                            <label htmlFor="input-field" className="input-label">Seu nome</label>
                            <span className="input-highlight"></span>
                        </div>

                        <div className="input-container">
                            <input placeholder="Seu email" name="email" className="input-field" type="email" required />
                            <label htmlFor="input-field" className="input-label">Seu email</label>
                            <span className="input-highlight"></span>
                        </div>

                        <div className="input-container">
                            <textarea style={{ resize: 'none' }} name="message" placeholder="Mensagem" className="input-field" required ></textarea>
                            <label htmlFor="input-field" className="input-label">Mensagem</label>
                            <span className="input-highlight"></span>
                        </div>

                        <button type='submit'
                            className={styles.btn}
                            value="Send">SEND</button>
                    </form>

                    <MapContact />
                </section>

            </main>
        </>
    )
}
export default HomeMain
