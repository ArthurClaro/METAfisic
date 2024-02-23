export const groupsMuscles = [
    {
        id: 1,
        category: "peito",
        diasTreinados: 6,
        dias: ['1:N'],
        volTotalTreinoDiaAnterior: 6660,
    },
    {
        id: 2,
        category: "costas",
        diasTreinados: 8,
        dias: ['1:N'],
        volTotalTreinoDiaAnterior: 1660,
    },
    {
        id: 3,
        category: "perna",
        diasTreinados: 8,
        dias: ['1:N'],
        volTotalTreinoDiaAnterior: 6660,
    },
    {
        id: 4,
        category: "ombro",
        diasTreinados: 8,
        dias: ['1:N'],
        volTotalTreinoDiaAnterior: 6660,
    },
    {
        id: 5,
        category: "braço",
        diasTreinados: 8,
        dias: ['1:N'],
        volTotalTreinoDiaAnterior: 6660,
    },
    {
        id: 6,
        category: "cardio",
        diasTreinados: 8,
        dias: ['1:N'],
        volTotalTreinoDiaAnterior: 6660,
    }
];

// peito , cardio braço ombro perna costas
// chest , cardio arm shoulder leg back

// /////////////////////////////////////////////////////////////////////////////////////////

export const peitoDays = [
    {
        id: 1,
        category: "peito",
        // categoryId,
        dia: 1,
        // volTotalTreino (VTT = 'Total de Volume do Dia ****')
        volTotalTreino: 840,
        qntFaltante: 0,
        treino: ['1:N']
    },
    {
        id: 2,
        category: "peito",
        // categoryId,
        dia: 2,
        // volTotalTreino (VTT = 'Total de Volume do Dia ****')
        volTotalTreino: 850,
        qntFaltante: 0,
        treino: ['1:N']
    },
    {
        id: 3,
        category: "peito",
        // categoryId,
        dia: 3,
        // volTotalTreino (VTT = 'Total de Volume do Dia ****')
        volTotalTreino: 840,
        // Quanto falta para conseguir Hipertrofia (Dia anterior(volTotalTreino) - Dia atual(volTotalTreino)) = qntFaltante   
        qntFaltante: 20,
        treino: ['1:N']
    },
    {
        id: 4,
        category: "peito",
        // categoryId,
        dia: 4,
        // volTotalTreino (VTT = 'Total de Volume do Dia ****')
        volTotalTreino: 870,
        qntFaltante: 0,
        treino: ['1:N']
    },
    {
        id: 5,
        category: "peito",
        // categoryId,
        dia: 5,
        // volTotalTreino (VTT = 'Total de Volume do Dia ****')
        volTotalTreino: 880,
        qntFaltante: 0,
        treino: ['1:N']
    },
    {
        id: 6,
        category: "peito",
        // categoryId,
        dia: 6,
        // volTotalTreino (VTT = 'Total de Volume do Dia ****')
        volTotalTreino: 890,
        qntFaltante: 0,
        treino: ['1:N']
    }
];

// // /////////////////////////////////////////////////////////////////////////////////////////
[
	{
		"createdAt": "22/02/2024",
		"id": "2f290654-55c1-4c76-86d6-a478f4b504d3",
		"category": "costas",
		"userId": "a7b82c27-4720-44a6-9b70-fa2847177391",
		"training": [
			{
				"id": "48baaffe-b804-4ab4-99b8-e46f6dfc8b5b",
				"name": "Peito aberto",
				"serie": 1,
				"kg": 40,
				"repetitions": 8,
				"volume": 320,
				"dayId": "2f290654-55c1-4c76-86d6-a478f4b504d3"
			}
		],
		"GroupsMuscle": {
			"id": "197a3230-f505-42a1-bf95-2e3105b812be",
			"nome": "costas"
		}
	}
]

export const treino = [
    {
        id: 1,
        nome: "Supino",
        serie: 1,
        kg: 40,
        repeticoes: 8,
        // volume =  (VTT = (Kg * Rep) * Série)
        volume: 320,
        daysId: 6,
    },
    {
        id: 2,
        nome: "Supino Inclinado",
        serie: 1,
        kg: 40,
        repeticoes: 7,
        // volume =  (VTT = (Kg * Rep) * Série)
        volume: 280,
        daysId: 6,
    },
    {
        id: 3,
        nome: "Supino com Alter",
        serie: 1,
        kg: 40,
        repeticoes: 6,
        // volume =  (VTT = (Kg * Rep) * Série)
        volume: 240,
        daysId: 6,
    },

    {
        id: 4,
        nome: "Costas == Puxada",
        serie: 0,
        kg: 0,
        repeticoes: 0,
        // volume =  (VTT = (Kg * Rep) * Série)
        volume: 240,
        daysId: 1,
    },
];
