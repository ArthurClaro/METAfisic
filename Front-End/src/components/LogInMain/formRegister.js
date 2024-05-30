import { z } from 'zod';

export const formRegister = z.object({
    name: z.string().min(5, "O Nome precisa de pelo menos 5 caracteres."),
    email: z.string().min(1, "O E-mail é obrigatório.").email("Forneça um e-mail válido."),
    password: z.string().min(5, "A Senha precisa conter pelo menos 5 caracteres.")
        .regex(/(?=.*?[0-9])/, "É necessário pelo menos um número."),
    confirm: z.string().min(5, "Confirme novamente sua senha."),
    gender: z.string().min(1, "Gênero obrigatório."),
    height: z.coerce.number().min(1, "Altura Inválida. Min: 1.00").max(3,"Altura Inválida. Max: 3.00"),
    weight: z.coerce.number().min(40, "Peso inválido. Min: 40.00kg").max(500,"Peso inválido. Max: 500.00kg"),
}).refine(({ password, confirm }) => confirm == password, {
    message: "A Senha e a Confirmção precisam corresponder.",
    path: ["confirm"],
})

