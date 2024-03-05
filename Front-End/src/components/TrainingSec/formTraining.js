import { z } from 'zod';

export const formTraining = z.object({
    name: z.string().min(1, "O nome é obrigatório e precisa de pelo menos 5 caracteres."),
    serie: z.coerce.number(),
    kg: z.coerce.number(),
    repetitions: z.coerce.number(),
    // volTotal: z.string().min(1, "Campo obrigatório"),
})

