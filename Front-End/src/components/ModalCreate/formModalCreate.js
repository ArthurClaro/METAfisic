import { z } from 'zod';

export const formModalCreate = z.object({
    name: z.string().min(3, "O nome é obrigatório e precisa de pelo menos 3 caracteres."),
    email: z.string().min(1, "O e-mail é obrigatório.").email("Forneça um e-mail válido."),
    phone: z.string().min(1, "Campo obrigatório"),
})


