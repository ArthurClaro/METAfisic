import { useRef } from 'react';

import LogoModal from '../../../assets/modal.png'
import 'primeicons/primeicons.css';
import 'animate.css';

import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { Fieldset } from 'primereact/fieldset';

import { useProductsContext } from '../../../providers/UserContext';

function AboutDivs() {
    const { clickInSingUp, useRedirect, setVisibleModal } = useProductsContext()

    const stepperRef = useRef(null);

    const legendTemplate = (
        <>
            <p >Iniciativa</p>
            <img src={LogoModal} alt="awd" />
            <span>ETA</span>
        </>
    );


    const handleClick = useRedirect('/login', () => clickInSingUp(true, 600));

    return (
        <>
            <div data-aos="zoom-in-down" data-aos-offset="300" className="card flex justify-content-center steps">
                <Stepper ref={stepperRef}
                    style={{ flexBasis: 'auto' }}
                    orientation='vertical'
                >
                    <StepperPanel header="Passo 1">
                        <div className="flex flex-column h-12rem">
                            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                                <h4>Crie sua conta !</h4>
                                <p>É simples rápido e fácil para começar à ser um META.</p>
                            </div>
                            <button onClick={handleClick} className="cta">
                                <span className="hover-underline-animation"> Criar </span>
                                <svg
                                    id="arrow-horizontal"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="10"
                                    viewBox="0 0 46 16"
                                >
                                    <path
                                        id="Path_10"
                                        data-name="Path 10"
                                        d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                                        transform="translate(30)"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        <div className="flex pt-4 justify-content-end ">
                            <Button className='nextBackBtn' label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                        </div>
                    </StepperPanel>
                    <StepperPanel header="Passo 2">
                        <div className="flex flex-column h-12rem">
                            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                                <h4>Registre seus treinos  !</h4>
                                <p>Não deixe de registrar nenhuma atividade sua para que nós podermos ver sua evolução.</p>
                            </div>
                            <button onClick={() => window.location.href = '#groups'} className="cta">
                                <span className="hover-underline-animation"> Marcar </span>
                                <svg
                                    id="arrow-horizontal"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="10"
                                    viewBox="0 0 46 16"
                                >
                                    <path
                                        id="Path_10"
                                        data-name="Path 10"
                                        d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                                        transform="translate(30)"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        <div className="flex pt-4 justify-content-between stepsBtnDiv ">
                            <Button className='nextBackBtn' label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                            <Button className='nextBackBtn' label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                        </div>
                    </StepperPanel>
                    <StepperPanel header="Passo 3">
                        <div className="flex flex-column h-12rem">
                            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                                <h4>Veja sua evolução !</h4>
                                <p>Todo seu progresso é salvo para que você tenha uma ampla análise de seus treinos.</p>
                            </div>
                            <button onClick={() => setVisibleModal(true)} className="cta">
                                <span className="hover-underline-animation"> Progresso </span>
                                <svg
                                    id="arrow-horizontal"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="10"
                                    viewBox="0 0 46 16"
                                >
                                    <path
                                        id="Path_10"
                                        data-name="Path 10"
                                        d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                                        transform="translate(30)"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        <div className="flex pt-4 justify-content-start ">
                            <Button className='nextBackBtn' label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                        </div>
                    </StepperPanel>
                </Stepper>
            </div>

            <Fieldset data-aos="zoom-in" data-aos-offset="300" legend={legendTemplate}>
                <p className="m-0">
                    Como você evoluirá através do que chamamos de hipertrofia alvo? Sempre que você realizar um treino, você registrará quantas repetições, séries e volume de carga você realizou naquele determinado exercício. No final do seu dia, você terá o que chamamos de Volume Total de treino. Se o seu Volume Total for maior do que o do dia anterior, significa que você conseguiu alcançar sua hipertrofia alvo.
                </p>
            </Fieldset>
        </>
    )
}
export default AboutDivs
