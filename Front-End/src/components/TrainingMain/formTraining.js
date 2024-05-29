import { z } from 'zod';

export const formTraining = z.object({
    name: z.string().min(5, "O Nome precisa de pelo menos 5 caracteres."),
    serie: z.coerce.number().min(1, "Série mínima obrigatória. Série: 1").max(30, "Série máxima atingida. Série: 30"),
    kg: z.coerce.number().min(2, "Kilos(Kg) mínimos: 2.00kg"),
    repetitions: z.coerce.number().min(1, "Repetições mínimas: 1").max(50, "Repetições máximas: 50"),
})

