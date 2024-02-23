import { useForm } from "react-hook-form";
import { formRegister } from "./formRegister";
import { zodResolver } from "@hookform/resolvers/zod"
import { useContext } from "react";
import { ExampleContext } from "../../../providers/UserContext";
import styles from './style.module.scss'

function FormRegister() {


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(formRegister)
    });


    const { clientPost, userPost } = useContext(ExampleContext)


    const subtmit = (formData) => {
        console.log(formData)
        userPost(formData)
    }

    return (

        <>
            <form className={styles.form} onSubmit={handleSubmit(subtmit)} >
                <label className="text label" htmlFor="name">Nome Completo</label>
                <input className="input" type="text" id="name" {...register('name')} placeholder="Digite aqui seu nome" />
                {errors.name ? <p>{errors.name.message}</p> : null}

                <label className="text label" htmlFor="email">E-mail</label>
                <input className="input" type="email" id="email"  {...register('email')} placeholder="Digite aqui seu e-mail" />
                {errors.email ? <p>{errors.email.message}</p> : null}

                <label className="text label" htmlFor="password">Senha</label>
                <input className="input" type="password" id="password" {...register('password')} placeholder="Digite aqui sua senha" />
                {errors.password ? <p>{errors.password.message}</p> : null}

                <label className="text label" htmlFor="confirm">Confimar Senha</label>
                <input className="input" type="password" id="confirm" {...register('confirm')} placeholder="Digite aqui novamente sua senha" />
                {errors.confirm ? <p>{errors.confirm.message}</p> : null}

                <label className="text label" htmlFor="module">Gênero</label>
                <select id="module"  {...register("gender")} >
                    <option value="" >Seu Gênero...</option>
                    <option value="Masculino" >Masculino</option>
                    <option value="Feminino" >Feminino</option>
                    <option value="Outro" >Outro</option>
                </select>
                {errors.course_module ? <p>{errors.course_module.message}</p> : null}

                <label className="text label" htmlFor="phone">Altura</label>
                <input className="input" type="number" step="0.01" max="3" id="phone" {...register('height')} placeholder="Digite aqui sua altura" />
                {errors.phone ? <p>{errors.phone.message}</p> : null}

                <label className="text label" htmlFor="phone">Peso</label>
                <input className="input" type="number" max="500" step="00.01" id="phone" {...register('weight')} placeholder="Digite aqui seu peso" />
                {errors.phone ? <p>{errors.phone.message}</p> : null}

                <button className="cadasterBtn" type="submit">Cadastrar</button>
            </form>

        </>
    )
}
export default FormRegister
