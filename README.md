![Design sem nome (2)](https://github.com/ArthurClaro/METAfisic/assets/124170421/d857e276-4146-424e-a6e8-1c381837cfc5)

<div align="center">
 <a href="#front-end">☑️ Front-End</a>
   <a href="#back-end">☑️ Back-End</a>
</div>

# Bem-vindo ao METAFISIC!
Estamos muito contentes em saber que você escolheu se aperfeiçoar para alcançar seus objetivos junto com a META. Este aplicativo foi desenvolvido com o intuito de ajudá-lo em seu processo de musculação através de um sistema de hipertrofia alvo.

# O que é a Hipertrofia Alvo?
A hipertrofia alvo é uma abordagem focada e personalizada para o desenvolvimento muscular. Nosso objetivo é proporcionar a você um caminho claro e eficaz para aumentar sua massa muscular de forma consistente e segura.

# Como Funciona?
## 1. Registro de Treinos:
- Sempre que você realizar um treino, você registrará quantas repetições, séries e volume de carga você realizou naquele determinado exercício.
## 2. Cálculo do Volume Total:
- No final do seu dia, você terá o que chamamos de Volume Total de treino. Este é calculado somando todas as repetições, séries e cargas dos exercícios realizados.
## 3. Acompanhamento da Evolução:
- Se o seu Volume Total for maior do que o do dia anterior, significa que você conseguiu alcançar sua hipertrofia alvo.

## Tecnologias Utilizadas

- **React**: Uma biblioteca JavaScript para construir interfaces de usuário.
- **@hookform/resolvers**: Uma biblioteca para resolver validações de formulários em React.
- **PrimeReact**: Uma coleção de componentes de interface do usuário para React.
- **@emailjs/browser**: Uma biblioteca JavaScript para enviar e-mails diretamente do navegador.
- **Dayjs**: Uma biblioteca para manipulação e formatação de datas.
- **React Hook Form**: Uma biblioteca para formulários em React, com suporte a hooks.
- **Framer Motion**: Uma biblioteca de animação para React.
- **NestJs**: Um framework para construir aplicações server-side eficientes e escaláveis em Node.js.
- **Prisma**: Um ORM (Object-Relational Mapping) para Node.js e TypeScript.
- **TypeScript**: Um superset de JavaScript que adiciona tipagem estática ao código.
- **@mui/material**: Uma biblioteca de componentes de interface de usuário que implementa o Material Design.

## Rotas Disponíveis

- **/** : Página inicial do projeto.
- **/login**: Página para Logn-In & Sign-Up.
- **/groups/:id**: Página de treinos de seu Usuário.


#  Front-End
### 1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```
ou
```shell
npm install
```

### 2. Rodar

Para incializar run dev com o comando:

```
npm run dev
```

#  Back-End
### 1. Instalando Dependências

Instale as dependências com o comando:

```shell
yarn
```
ou
```shell
npm install
```
### 2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:
```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```
### 4. Rodar

Para incializar run dev com o comando:

```
npm run dev
```

# Todas as Rotas

### `/user`

### Exemplo de Request:
```
POST /user/
Host: 'http://localhost:3000/
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
   "name": "Arthur F.",
   "email": "example9@gmail.com",
   "password": "12345",
   "gender": "Masculino",
   "height": 1.85,
   "weight": 80.75,
}
```

### Exemplo de Response:
```
200 OK
```
```json
[
   {
      "id": "53b41126-6e4b-4103-a610-aba392a159ce",
      "name": "Arthur F.",
      "email": "example9@gmail.com",
      "password": "12345",
      "gender": "Masculino",
      "height": 1.85,
      "weight": 80.75,
      "createdAt": "2024-02-23T17:41:05.924Z"
   }
]
```
### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 409 | Email already exists. |

### Exemplo de Request:
```
GET /user/
Host: 'http://localhost:3000/
Authorization: Required
Content-type: application/json
```

### Exemplo de Response:
```
200 OK
```
```json
[
	{
		"id": "e649bb82-b6ce-4c3d-b339-a584d6caa10b",
		"name": "Arthur Claro",
		"email": "0123456789arthur@gmail.com",
		"gender": "Masculino",
		"height": 0,
		"weight": 0,
		"createdAt": "2024-05-30T10:11:43.845Z"
	}
]
```

###  `/login/`

### Exemplo de Request:
```
POST /login/
Host: 'http://localhost:3000/
Authorization: None
Content-type: application/json
```
### Corpo da Requisição:
```json
{
   "email": "example9@gmail.com",
   "password": "12345"
}
```
### Exemplo de Response:
```
200 OK
```
```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjAxMjM0NTY3ODlhcnRodXJAZ21haWwuY29tIiwiaWF0IjoxNzE3MDA5NjE4LCJzdWIiOiIyMzdjZTFiNi1iNWYwLTQ4MTAtOGIzNC1jNWQ1YmU3MTgwNmYifQ.fj3IQhyCPPiEFMzbcufurCDqhR2-HzBDWXYhfH6x6gE"
}
```
### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 401 | Invalid email or password. |


###  `/groups-muscles/`

### Exemplo de Request:
```
GET /groups-muscles/
Host: 'http://localhost:3000/
Authorization: None
Content-type: application/json
```

### Exemplo de Response:
```
200 OK
```
```json
[
	{
		"id": "31dc32c5-a76e-4913-9b15-bbd844572f2d",
		"nome": "braço",
		"day": []
	},
	{
		"id": "e1a52d23-faa1-41da-9893-91de8fa932f9",
		"nome": "cardio",
		"day": []
	},
	{
		"id": "3f609ab2-7cef-4c86-abc3-6c351b998d10",
		"nome": "peito",
		"day": []
	},
	{
		"id": "942ab218-9d13-4e1b-85c2-84920419db56",
		"nome": "costas",
		"day": []
	},
	{
		"id": "49529232-8ecd-4ae9-929b-132080cd33b2",
		"nome": "perna",
		"day": []
	}
]
```

###  `/days/`

### Exemplo de Request:
```
POST /days/
Host: 'http://localhost:3000/
Authorization: Required
Content-type: application/json
```
### Corpo da Requisição:
```json
{
   "category": "perna"
}
```
### Exemplo de Response:
```
200 OK
```
```json
{
	"id": "26848131-c7b6-482d-b9c4-06acdb90e8ef",
	"category": "perna",
	"createdAt": "28/05/2024",
	"userId": "237ce1b6-b5f0-4810-8b34-c5d5be71806f"
}
```

### Exemplo de Request:
```
GET /days/
Host: 'http://localhost:3000/
Authorization: None
Content-type: application/json
```
### Exemplo de Response:
```
200 OK
```
```json
[
	{
		"createdAt": "30/05/2024",
		"id": "c614f977-2886-410c-a651-a30933327bd2",
		"category": "braço",
		"userId": "5eadb31e-647c-4bfe-9616-97ecb8d6e15b",
		"training": [
			{
				"id": "aca945ee-5490-430b-b962-3d79608bc53f",
				"name": "Roquessania Ferreira Da Silva",
				"serie": 9,
				"kg": 9,
				"repetitions": 9,
				"volume": 729,
				"dayId": "c614f977-2886-410c-a651-a30933327bd2"
			},
			{
				"id": "fc28510b-a25e-461e-9f80-54ae276e4d5b",
				"name": "ARTHUR 8",
				"serie": 7,
				"kg": 7,
				"repetitions": 7,
				"volume": 343,
				"dayId": "c614f977-2886-410c-a651-a30933327bd2"
			}
		],
		"GroupsMuscle": {}
	},
	{
		"createdAt": "30/05/2024",
		"id": "db794b6f-69ce-4b43-a566-caf22cf01b10",
		"category": "cardio",
		"userId": "5eadb31e-647c-4bfe-9616-97ecb8d6e15b",
		"training": [],
		"GroupsMuscle": {
			"id": "e1a52d23-faa1-41da-9893-91de8fa932f9",
			"nome": "cardio"
		}
	}
]
```

###  `/days/:category`
```
GET /days/:category
Host: 'http://localhost:3000/
Authorization: Required
Content-type: application/json
```
### Exemplo de Response:
```
200 OK
```
```json
[
	{
		"createdAt": "30/05/2024",
		"id": "c614f977-2886-410c-a651-a30933327bd2",
		"category": "braço",
		"userId": "5eadb31e-647c-4bfe-9616-97ecb8d6e15b",
		"training": [...],
		"GroupsMuscle": {}
	},
	{
		"createdAt": "30/05/2024",
		"id": "db794b6f-69ce-4b43-a566-caf22cf01b10",
		"category": "cardio",
		"userId": "5eadb31e-647c-4bfe-9616-97ecb8d6e15b",
		"training": [...],
		"GroupsMuscle": {}
	}
]
```

###  `/training/:dayId`

### Exemplo de Request:
```
POST /training/:dayId
Host: 'http://localhost:3000/
Authorization: Required
Content-type: application/json
```
### Corpo da Requisição:
```json
{
	"name" : "Supino reto",
	"serie" : 3,
	"kg" : 30,
	"repetitions" : 15
}
```
### Exemplo de Response:
```
200 OK
```
```json
{
	"id": "9341de0f-b432-4361-af1b-9c2ad250e944",
	"name": "Supino reto",
	"serie": 3,
	"kg": 30,
	"repetitions": 15,
	"volume": 750,
	"dayId": "26848131-c7b6-482d-b9c4-06acdb90e8ef"
}
```

###  `/training/`

GET /training/
Host: 'http://localhost:3000/
Authorization: Required
Content-type: application/json
```
### Exemplo de Response:
```
200 OK
```
```json
[
	{
		"id": "18c18388-eae4-45d4-9cb4-59c052496d19",
		"name": "Supino reto",
		"serie": 7,
		"kg": 3,
		"repetitions": 7,
		"volume": 147,
		"dayId": "734c02b1-f543-43b4-b0d6-aad8e858fbf5",
		"Day": {
			"id": "734c02b1-f543-43b4-b0d6-aad8e858fbf5",
			"category": "costas",
			"createdAt": "29/05/2024",
			"userId": "1eb38fc8-41b6-4038-82bb-93875c7332f5"
		}
	},
	{
		"id": "30c87595-9507-4bc5-9577-087ab88dc9f0",
		"name": "Supino inclinado",
		"serie": 7,
		"kg": 2.5,
		"repetitions": 7,
		"volume": 122,
		"dayId": "ba1ae9fc-d069-421a-a3f7-791c35838eb2",
		"Day": {
			"id": "ba1ae9fc-d069-421a-a3f7-791c35838eb2",
			"category": "cardio",
			"createdAt": "29/05/2024",
			"userId": "1eb38fc8-41b6-4038-82bb-93875c7332f5"
		}
	}
]
```



###  `/training/:id`

### Exemplo de Request:
```
PATCH /training/:id
Host: 'http://localhost:3000/
Authorization: Required
Content-type: application/json
```
### Corpo da Requisição:
```json
{
	"serie": 2,
	"kg": 20,
	"repetitions": 7,
	"name": "example"
}
```
### Exemplo de Response:
```
200 OK
```
```json
{
	"id": "53e3d247-37d4-4a24-9d38-7c7c000c85f8",
	"name": "example",
	"serie": 2,
	"kg": 20,
	"repetitions": 7,
	"volume": 280,
	"dayId": "a90edba7-3123-46e5-8b0a-a81aedc29ece"
}
```

### Exemplo de Request:
```
DEL /training/:id
Host: 'http://localhost:3000/
Authorization: Required
Content-type: application/json
```
### Exemplo de Response:
```
200 OK
```
```json
No body returned for response
```

# Conclusão
O METAFISIC foi criado para ser seu parceiro na jornada de desenvolvimento muscular. Ao utilizar nosso sistema de hipertrofia alvo, você terá um caminho claro e eficaz para atingir seus objetivos. Estamos aqui para apoiá-lo a cada passo, garantindo que você alcance a melhor versão de si mesmo.

## Vamos começar essa jornada juntos?

### 1. Instalando Dependências
<br> DER (Diagrama de Entidade e Relacionamento) : 
https://app.diagrams.net/#G1tgYEDPval-_ickFfs7RqkPxkXAIMcC1w#%7B%22pageId%22%3A%22R2lEEEUBdFMjLlhIrx00%22%7D


Back-End (Render) :
https://metafisic.onrender.com/

Front-End (Vercel) : por enquanto
https://meta-8hivg2ji8-arthurclaros-projects.vercel.app/
