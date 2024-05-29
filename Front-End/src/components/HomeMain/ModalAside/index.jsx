import { useState } from 'react';
import { Link } from 'react-router-dom';

import LogoModal from '../../../assets/modal.png'

import 'primeicons/primeicons.css';

import { Sidebar } from 'primereact/sidebar';

import 'animate.css';

import { Tree } from 'primereact/tree';
import { classNames } from 'primereact/utils';
import { useProductsContext } from '../../../providers/UserContext';


function ModalAside() {

    const { clickInSingUp, userMETA, clickGoOut, visibleModal, setVisibleModal } = useProductsContext()

    const customHeader = (
        <div className="header">
            <img src={LogoModal} alt="awd" />
            <span className="font-bold">ETAFISIC</span>
        </div>
    );

    const nodes = [
        {
            key: "0",
            label: <span className="pi pi-map"><p> Seus Treinos</p></span>,
            children: [
                { key: "0-0", label: 'Costas', url: 'costas' },
                { key: "0-1", label: 'Perna', url: 'perna' },
                { key: "0-2", label: 'Peito', url: 'peito' },
                { key: "0-3", label: 'Cardio', url: 'cardio' },
                { key: "0-4", label: 'Braço', url: 'braço' }
            ]
        },
        {
            key: "1",
            label: <span className="pi pi-info-circle"><p> Como Funciona</p></span>,
            children: [
                { key: "1-0", label: 'Passo 1 - Escolha um treino de sua preferência.', url: '#about', home: true },
                { key: "1-1", label: 'Passo 2 - Registre seus Treinos para ver seu Volume.', url: '#about', home: true },
                { key: "1-2", label: 'Passo 3 - Bata suas Metas* !', url: '#about', home: true },
            ]
        },
        {
            key: "2",
            label: <span className="pi pi-users"><p> Falar Conosco</p></span>,
            children: [
                { key: "2-0", label: '- Quer fazer parte do nosso time? ', url: '#contact', home: true },
                { key: "2-1", label: '- Precisando tirar alguma dúvida?', url: '#contact', home: true },
            ]
        }
    ];

    const goSection = (ref) => {
        setVisibleModal(false)
        window.location.href = ref
    }

    const nodeTemplate = (node, options) => {
        let label = <b>{node.label}</b>;
        const toUrl = node.home ? `/${node.url}` : `/groups/${node.url}`;

        if (node.url) {
            label = <Link to={toUrl} className="text-700 hover:text-primary" rel="noopener noreferrer">{node.label}</Link>;
        }
        return <span onClick={() => goSection(toUrl)} className={options.className}>{label}</span>;
    }

    const togglerTemplate = (node, options) => {
        if (!node) {
            return;
        }
        const expanded = options.expanded;
        const iconClassName = classNames('p-tree-toggler-icon pi pi-fw', {
            'pi-caret-right': !expanded,
            'pi-caret-down': expanded
        });

        return (
            <button type="button" className="p-tree-toggler p-link" tabIndex={-1} onClick={options.onClick}>
                <span className={iconClassName} aria-hidden="true"></span>
            </button>
        );
    };

    const [expandedKeys, setExpandedKeys] = useState({ '10': true, '0-0': true });

    const expandNode = (node, _expandedKeys) => {
        if (node.children && node.children.length) {
            _expandedKeys[node.key] = true;

            for (let child of node.children) {
                expandNode(child, _expandedKeys);
            }
        }
    };

    const openModalEditUser = () => {
        console.log('Edit User')
        // Edit User
    }

    return (
        <>
            <Sidebar visible={visibleModal} onHide={() => setVisibleModal(false)} header={customHeader}  >
                {Array.isArray(userMETA) && userMETA.length > 0 ? (
                    userMETA.map((user) => (
                        <div className='userON' key={user.id}>

                            <div className='divU'>
                                <h2> <span className="pi pi-id-card"></span> Bem-vindo {user.name} !</h2>
                                <div>
                                    <h6>{user.email}</h6>
                                    <span onClick={() => openModalEditUser()} className="pi pi-tags"></span>
                                    {/* EditUser */}
                                </div>
                            </div>

                            <Tree value={nodes} expandedKeys={expandedKeys} onToggle={(e) => setExpandedKeys(e.value)} nodeTemplate={nodeTemplate} togglerTemplate={togglerTemplate} className="w-full md:w-30rem" />

                            <Link className='deslogBtn'>
                                <span className="pi pi-sign-out"></span>
                                <button className="backBtn dash" onClick={() => clickGoOut()}>DESLOGAR</button>
                            </Link>
                        </div>
                    ))
                ) : (
                    <>
                        <div className='userOff'>
                            <h4>Vemos aqui que você não está logado !</h4>

                            <div className="wrapper">
                                <div>
                                    <Link to="/login" onClick={() => clickInSingUp(false, 1000)} data-tooltip-content="LogIn" className="data-tooltip">
                                        <span className="pi pi-user"></span>
                                    </Link>
                                    <p><span>Log-In</span>: Entre para receber os benefícios de ser um <span>#META</span>.</p>
                                </div>
                                <div>
                                    <Link to="/login" onClick={() => clickInSingUp(true, 750)} data-tooltip-content="SingUp" className="data-tooltip">
                                        <span className="pi pi-sign-in"></span>
                                    </Link>
                                    <p><span>Sing-Up</span>: Registre-se de forma rápida fácil e simples.</p>
                                </div>
                            </div>

                        </div>
                    </>
                )}
            </Sidebar>
        </>
    )
}
export default ModalAside
