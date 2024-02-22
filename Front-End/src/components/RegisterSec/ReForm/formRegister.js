import { z } from 'zod';

export const formRegister = z.object({
    name: z.string().min(5, "O nome é obrigatório e precisa de pelo menos 5 caracteres."),
    email: z.string().min(1, "O e-mail é obrigatório.").email("Forneça um e-mail válido."),
    password: z.string().min(1, "A senha precisa conter pelo menos 8 caracteres.")
        .regex(/(?=.*?[0-9])/, "É necessário pelo menos um número."),
    confirm: z.string().min(1, "Digite sua senha novamente"),
    gender: z.string().min(1, "Campo obrigatório"),
    height: z.string().min(1, "Campo obrigatório"),
    weight: z.string().min(1, "Campo obrigatório"),
}).refine(({ password, confirm }) => confirm == password, {
    message: "A senha e a confirmção precisam corresponder.",
    path: ["confirm"],
})

