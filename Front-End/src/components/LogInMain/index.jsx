import styles from './style.module.scss'

import { BsGenderAmbiguous } from "react-icons/bs";
import { GiBodyHeight } from "react-icons/gi";
import { GiWeight } from "react-icons/gi";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiLockPasswordLine } from "react-icons/ri";

import { Password } from 'primereact/password';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useProductsContext } from "../../providers/UserContext";

import { formRegister } from "./formRegister";
import { zodResolver } from "@hookform/resolvers/zod";

function LogInMain() {
    const { userLogin, checkboxArrow, clickInSingUp, userPost, toastErro } = useProductsContext()

    const [confirm, setConfirm] = useState('');
    const [confirm2, setConfirm2] = useState('');

    const [nameList2, setNameList2] = useState("")
    const [select, setSelect] = useState("")

    useEffect(() => {
        if (nameList2 !== undefined && select !== "") {
            if (nameList2 !== "") {
                select.classList.add('active')
            } else {
                select.classList.remove("active")
            }
        }
    }, [nameList2]);

    const { register: register1, handleSubmit: handleSubmit1 } = useForm();

    const subtmit = (formData) => {
        userLogin(formData)
    }

    const { register: register2, handleSubmit: handleSubmit2, formState: { errors } } = useForm({
        resolver: zodResolver(formRegister)
    });

    const subtmitRegister = (formData) => {
        userPost(formData)
    }

    return (

        <>
            <div className={styles.section}>
                <div className={styles.container}>
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className={`${styles.divPg} pb-5 pt-5 pt-sm-2 text-center`}>
                                <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                                <input className="checkbox" ref={checkboxArrow} type="checkbox" id="reg-log" name="reg-log" />
                                <label htmlFor="reg-log"   ></label>
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">
                                        <div className="card-front">
                                            <div className="center-wrap">
                                                <form className="section text-center" onSubmit={handleSubmit1(subtmit)}>
                                                    <h1 className="">METAfisic</h1>
                                                    <h4 className="mb-4 pb-3">Log In</h4>

                                                    <div className="form-group">
                                                        <input type="email" {...register1('email')} className="form-style" placeholder="Seu Email" id="logemail" />
                                                        <i className="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="password" {...register1('password')} className="form-style" placeholder="Sua Senha" id="logpass" />
                                                        <i className="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    <button className="btn mt-4" type="submit">submit</button>
                                                    <p className="mb-0 mt-4 text-center"><a onClick={() => clickInSingUp(true, 400)} className={styles.link}>Ainda não possui uma conta ?</a></p>
                                                </form>
                                                <div id="bar"></div>
                                            </div>
                                        </div>
                                        <div className="card-back">
                                            <div className="center-wrap">
                                                <form className="section text-center" onSubmit={handleSubmit2(subtmitRegister)}>
                                                    <h4 className="mb-4 pb-3 singUp" >Sign Up</h4>
                                                    <div className="form-group" >
                                                        <input type="text"
                                                            {...register2('name')}
                                                            className="form-style" placeholder="Nome Completo" id="logname" autoComplete="off" />
                                                        <i className="input-icon uil uil-user"></i>
                                                        {errors.name ? toastErro(`${errors.name.message}`, 3000) : null}
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="email" {...register2('email')} className="form-style" placeholder="Seu E-mail" id="logemailRegister" autoComplete="off" />
                                                        <i className="input-icon uil uil-at"></i>
                                                        {errors.email ? toastErro(`${errors.email.message}`, 3000) : null}
                                                    </div>

                                                    <div className="form-group mt-2">
                                                        <Password type="string" feedback={false} {...register2('password', { value: confirm })} value={confirm}
                                                            onChange={(e) => setConfirm(e.target.value)}
                                                            className="form-style" placeholder="Sua Senha" toggleMask />
                                                        <RiLockPasswordLine className="input-icon uil uil-lock-alt" />
                                                        {errors.password ? toastErro(`${errors.password.message}`, 3000) : null}
                                                    </div>

                                                    <div className="form-group mt-2">
                                                        <Password feedback={false} {...register2('confirm', { value: confirm2 })} value={confirm2}
                                                            onChange={(e) => setConfirm2(e.target.value)}
                                                            className="form-style" placeholder="Confirme Sua Senha" toggleMask />
                                                        <RiLockPasswordFill className="input-icon uil uil-lock-alt" />
                                                        {errors.confirm ? toastErro(`${errors.confirm.message}`, 3000) : null}
                                                    </div>

                                                    <div className="form-group mt-2">
                                                        <select {...register2("gender")}
                                                            onChange={(e) => {
                                                                setNameList2(e.currentTarget.value)
                                                                setSelect(e.currentTarget)
                                                            }}
                                                            className="form-style" >
                                                            <option className="vtmnc" value="" >Gênero</option>
                                                            <option value="Masculino" >Masculino</option>
                                                            <option value="Feminino" >Feminino</option>
                                                            <option value="Outro" >Outro</option>
                                                        </select>
                                                        <BsGenderAmbiguous className="input-icon uil uil-lock-alt" />
                                                        {errors.gender ? toastErro(`${errors.gender.message}`, 3000) : null}
                                                    </div>

                                                    <div className="formflex">

                                                        <div className="form-group mt-2">
                                                            <input className="form-style pd" {...register2("height")} type="number" step="0.01" id="heigth" placeholder="Altura" />
                                                            <GiBodyHeight className="input-icon uil uil-lock-alt" />
                                                            {errors.height ? toastErro(`${errors.height.message}`, 3000) : null}
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input className="form-style pd" {...register2("weight")} type="number" step="00.01" id="weight" placeholder="Peso" />
                                                            <GiWeight className="input-icon uil uil-lock-alt" />
                                                            {errors.weight ? toastErro(`${errors.weight.message}`, 3000) : null}
                                                        </div>

                                                    </div>

                                                    <button className="btn mt-4" type="submit">submit</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LogInMain