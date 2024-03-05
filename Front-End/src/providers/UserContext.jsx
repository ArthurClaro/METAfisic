import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import { useOutclick } from "../hooks/useOutclick";
import { useKeydown } from "../hooks/useKeydown";
import { toast } from "react-toastify";
import { boolean } from "zod";

export const ExampleContext = createContext({})

export const ExampleProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const [isOpen, setIsOpen] = useState(false)

    const [isOpenClient, setIsOpenClient] = useState(false)

    const [editingClient, seteditingClient] = useState(null)

    const navigate = useNavigate();

    const [lista, setLista] = useState([])


    function toastSuccess(message, time) {
        toast.success(message, {
            position: "top-right",
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            style: {
                background: '#343B41',
                color: '#F8F9FA'
            }
        });
    }
    function toastErro(message, time) {
        toast.error(message, {
            position: "top-right",
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            style: {
                background: '#343B41',
                color: '#F8F9FA'
            }
        });
    }



    const userLogout = () => {
        // localStorage.removeItem()
        localStorage.clear()
        setUser(null)
        navigate('/')
    }


    // useEffect(() => {
    //     const loadUser = async () => {
    //         const localToken = localStorage.getItem("@TOKEN")

    //         if (localToken) {
    //             toastSuccess("Usuário já logado .", 2000)
    //             navigate("/dash")
    //         } else {
    //             navigate("/")
    //             toastErro("Usuário não logado .", 2000)
    //         }
    //     }
    //     loadUser()
    //     getUser()
    // }, [])

    const modalRef = useOutclick(() => {
        setIsOpen(false);
        setIsOpen2(false);
    })

    const buttonRef = useKeydown('Escape', (element) => {
        element.click()
    })

    const [isOpen2, setIsOpen2] = useState(false)


    const clientPost = async (formData) => {
        try {
            const { data } = await api.post('/clients', formData);
            toastSuccess('Redirecionando para página de login.', 2000)
            setTimeout(() => {
                navigate('/')
            }, 2000);

        } catch (error) {
            console.log(error.message)
            toastErro('E-mail já cadastrado !', 3000)
        }
    }

    const clientLogin = async (formData) => {
        try {
            const { data } = await api.post('/login', formData);
            localStorage.setItem('@TOKEN', data.token)
            localStorage.setItem('@EMAIL', JSON.stringify(formData.email))

            toastSuccess('Redirecionando para Dashboard!', 2000)
            setTimeout(() => {
                navigate('/dash')
            }, 2000);

        } catch (error) {
            console.log(error.message)
            toastErro('Senha ou e-mail incorretos !', 3000)
        }
    }

    const [userClient, setUserClient] = useState({});

    useEffect(() => {
        (async () => {
            await getUser()
        })()

    }, []);
    const getUser = async () => {
        try {
            const token = localStorage.getItem('@TOKEN')

            const { data } = await api.get('/clients', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            localStorage.setItem('@IDUSER', JSON.stringify(data.id))

            setUserClient(data);
            seteditingClient(data)
        } catch (error) {
            console.log(error);
        }
    };

    const pacthClients = async (formData) => {
        const token = localStorage.getItem('@TOKEN')
        const idUser = localStorage.getItem('@IDUSER')
        try {
            const { data } = await api.patch(`/clients/${idUser}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            toastSuccess('Usuário atualizado !', 2000)
            getUser()
        } catch (error) {
            console.log(error)
        }
    }

    const delClient = async (formData) => {
        const token = localStorage.getItem('@TOKEN')

        try {
            const { data } = await api.delete(`/clients/${formData}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            toastSuccess('Usuário Deletado !', 2000)
            setTimeout(() => {
                navigate('/')
            }, 2000);

            await getUser()

        } catch (error) {
            console.log(error)
        }
    }


    // ///////////////////////////////////////////////////////////////////

    const userPost = async (formData) => {
        try {
            const { data } = await api.post('/users', formData);
            toastSuccess('Redirecionando para página de login.', 2000)
            setTimeout(() => {
                navigate('/')
            }, 2000);

            console.log(data)

        } catch (error) {
            console.log(error.message)
            toastErro('E-mail já cadastrado !', 3000)
        }
    }

    const userLogin = async (formData) => {
        try {
            const { data } = await api.post('/login', formData);
            localStorage.setItem('@TOKEN', data.token)
            localStorage.setItem('@EMAIL', JSON.stringify(formData.email))

            toastSuccess('Redirecionando para Room !', 2000)
            setTimeout(() => {
                navigate('/room')
                getGroups()
            }, 2000);
            console.log(data)
        } catch (error) {
            console.log(error.message)
            toastErro('Senha ou e-mail incorretos !', 3000)
        }
    }

    // useEffect(() => {
    //     const loadUser = async () => {
    //         const localToken = localStorage.getItem("@TOKEN")

    //         if (localToken) {
    //             toastSuccess("Usuário já logado .", 2000)
    //             navigate("/room")
    //         } else {
    //             navigate("/")
    //             toastErro("Usuário não logado .", 2000)
    //         }
    //     }
    //     loadUser()
    //     // getUser()
    // }, [])

    const [groups, setgroups] = useState([]);

    useEffect(() => {
        (async () => {
            await getGroups()
        })()

    }, []);

    const getGroups = async () => {
        try {

            const { data } = await api.get('/groups-muscles');

            setgroups(data);
        } catch (error) {
            console.log(error);
        }
    };


    const [days, setdays] = useState([]);


    const createDay = async (formData) => {
        // console.log(formData)
        try {
            const token = localStorage.getItem('@TOKEN')
            const { data } = await api.post(`/days`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            localStorage.setItem('@DAYTOKEN', data.id)

            toastSuccess('Td certo DAY !', 2000)
            setdays(data)
        } catch (error) {
            // console.log(error.message)
            toastErro('Token  não encontrado  !!!!!!!!!!', 3000)
        }
    }

    const [training, settraining] = useState([]);

    const createTraining = async (formData, id) => {
        // console.log("----------", formData, id)
        try {
            try {
                const { data } = await api.get(`/days/${id}`);

                const trainingInDay = data.filter((day) => day.createdAt == new Date().toLocaleDateString())
                trainingInDay.forEach(element => {
                    localStorage.setItem('@DAYTOKEN', element.id)
                });
                toastSuccess('deu certo createTraining!', 2000)

            } catch (error) {
                console.log(error.message)
                toastErro('Category don`t exist  !', 3000)
            }
            const token = localStorage.getItem('@TOKEN')
            const dayIdToken = localStorage.getItem('@DAYTOKEN')

            const { data } = await api.post(`/training/${dayIdToken}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            takeDayGet(id)
            // takeTrainingCategoryDay()
            toastSuccess('treino cirado!', 2000)
            // console.log(data)
            settraining(data)
            takeTrainingCategoryDay()
        } catch (error) {
            console.log(error.message)
            toastErro('erroo treino  !', 3000)
        }
    }


    // const [daysVtt, setdaysVtt] = useState([]);

    // const [trainingAll, settrainingAll] = useState([]);
    // const [daysAll, setdaysAll] = useState([]);
    // // console.log(daysAll)
    // let datas = []
    // let datasFormatadas = []

    // daysAll.forEach(element => {
    //     // console.log(element.training)

    //     const somaTotalBudget = element.training.reduce((prev, current) => {
    //         return prev + current.volume
    //     }, 0)
    //     // console.log(somaTotalBudget)
    //     const currentElement = { ...element };
    //     currentElement.Vtt = somaTotalBudget
    //     // console.log(currentElement)
    //     // setdaysVtt(currentElement)

    //     datas.push(element.createdAt)
    // });




    const [daysAll, setdaysAll] = useState([]);

    const [trainingAll, settrainingAll] = useState([]);

    const takeDayGet = async (id) => {

        try {
            const { data } = await api.get(`/days/${id}`);
            //  == DIAS 
            // console.log(data)
            const days = data.map(({ createdAt }) => ({ createdAt }))
            // console.log(days)
            // setdaysAll(days)
            setdaysAll(data)


            let trainingInDay = data.filter((day) => day.createdAt == new Date().toLocaleDateString())
            trainingInDay.forEach(element => {
                // console.log(element)
                localStorage.setItem('@DAYTOKEN', element.id)

                // console.log(element.training)
                settrainingAll(element.training)
            });

            calculateVtt();
            toastSuccess('deu certo takeDayGet!', 8000)

        } catch (error) {
            console.log(error.message)
            toastErro('Category don`t exist  !', 3000)
        }

    }



    const [daysVtt, setdaysVtt] = useState([]);

    const [diaAtual, setdiaAtual] = useState({});

    const calculateVtt = () => {
        const sortedDaysAll = [...daysAll].sort((a, b) => {
            const dateA = new Date(a.createdAt.split('/').reverse().join('/'));
            const dateB = new Date(b.createdAt.split('/').reverse().join('/'));
            return dateA - dateB;
        });

        let previousVtt = 0;
        // console.log(sortedDaysAll)
        const newDaysVtt = sortedDaysAll.map(element => {
            const somaTotalBudget = element.training.reduce((prev, current) => {
                return prev + current.volume;
            }, 0);

            if (previousVtt > 0 && previousVtt > somaTotalBudget) {
                return {
                    ...element,
                    Vtt: somaTotalBudget,
                    BateuMeta: false,
                    Faltante: previousVtt - somaTotalBudget
                };
            }
            previousVtt = somaTotalBudget;

            return {
                ...element,
                Vtt: somaTotalBudget,
                BateuMeta: true
            };
        });
        // console.log(newDaysVtt)
        setdaysVtt(newDaysVtt);
        // console.log(daysVtt)
    };


    useEffect(() => {
        // console.log("daysVtt changed. Updating diaAtual...");
        const diaAtual2 = daysVtt.find(element => element.createdAt === new Date().toLocaleDateString());
        // console.log(diaAtual2.Vtt)
        setdiaAtual(diaAtual2);
    }, [daysVtt]);


    useEffect(() => {
        // console.log("daysAll changed. Recalculating Vtt...");
        calculateVtt();
    }, [daysAll]);
































    let datas = [];
    // datas = daysAll.map(element => element.createdAt);
    datas = daysVtt.map(element => element.createdAt);
    // daysAll == daysVtt(tem mais coisa, Vtt, BateuMeta)

    // //////////

    // console.log(daysVtt)
    // console.log(daysAll)
    // console.log(datas)



    datas.sort()
    // console.log(datas)
    let datasFormatadas = [];

    datas.forEach((data, index) => {
        const metaB = daysVtt.find(e => e.createdAt == data)
        // console.log(metaB)

        let [dia, mes, ano] = data.split('/');

        let dataFormatada = {
            day: parseInt(dia),
            month: parseInt(mes),
            year: parseInt(ano),
            meta: metaB.BateuMeta
        };


        if (index == 0) {
            dataFormatada.type = "initialDay";
        } else if (index == datas.length - 1) {
            dataFormatada.type = "endDay";
        } else {
            dataFormatada.type = "otherDay";
        }

        datasFormatadas.push(dataFormatada);

    });
    // console.log(datasFormatadas)



    const [date, setDate] = useState(null);
    // console.log(date)
    const dateTemplate = (date) => {

        let result = date.day;
        datasFormatadas.forEach((element) => {
            const currentDate = { ...date };
            currentDate.month += 1;
            if ((element.type === "initialDay" || element.type === "endDay" || element.type === "otherDay")
                && element.day === currentDate.day
                && element.month === currentDate.month
                && element.year === currentDate.year) {
                result = (
                    <strong style={{ color: 'blue' }}>{date.day}</strong>
                );
            }
            if ((element.type === "initialDay" || element.type === "endDay" || element.type === "otherDay")
                && element.day === currentDate.day
                && element.month === currentDate.month
                && element.year === currentDate.year
                && element.meta == false) {
                result = (
                    <strong style={{ color: 'red' }}>{date.day}</strong>
                );
            }
        });
        return result;

    }




    const [treinosDoDia, settreinosDoDia] = useState([]);

    const takeTrainingCategoryDay = async () => {

        try {
            const dayIdToken = localStorage.getItem('@DAYTOKEN')
            // console.log(dayIdToken)

            const { data } = await api.get(`/training/${dayIdToken}`);
            // console.log(data)

            // calculateVtt()
            settreinosDoDia(data)
            toastSuccess('deu certo takeTrainingCategoryDay!', 8000)

        } catch (error) {
            console.log(error.message)
            toastErro('Training don`t exist  !', 3000)
        }

    }
    // useEffect(() => {
    //     (async () => {
    //         await takeTrainingCategoryDay()
    //     })()

    // }, []);

    // console.log(treinosDoDia)






    // /////////////// PATCH
    const [isOpenTrainingFill, setisOpenTrainingFill] = useState(false)

    const [editingTraining, seteditingTraining] = useState(null)

    // console.log(editingTraining)


    const patchTrainingDay = async (formData) => {

        try {
            const trainingId = localStorage.getItem('@ID_TRAINING')
            const token = localStorage.getItem('@TOKEN')

            const { data } = await api.patch(`/training/${trainingId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            // console.log(data)


            calculateVtt()
            takeTrainingCategoryDay()
            // takeDayGet()
            toastSuccess('treino atualizado!', 8000)
        } catch (error) {
            console.log(error.message)
            toastErro('Training don`t exist  !', 3000)
        }

    }






























    const userLogoutClearDay = () => {
        localStorage.removeItem('@DAYTOKEN')
    }

    return (
        <ExampleContext.Provider value={{ diaAtual, takeTrainingCategoryDay, calculateVtt, patchTrainingDay, editingTraining, seteditingTraining, isOpenTrainingFill, setisOpenTrainingFill, takeTrainingCategoryDay, treinosDoDia, daysVtt, dateTemplate, date, setDate, daysAll, trainingAll, takeDayGet, userLogoutClearDay, createTraining, training, days, createDay, groups, userLogin, userPost, delClient, clientLogin, editingClient, seteditingClient, pacthClients, setIsOpenClient, isOpenClient, getUser, userClient, clientPost, toastSuccess, toastErro, setLista, user, userLogout, isOpen, setIsOpen, modalRef, buttonRef, isOpen2, setIsOpen2, setUser, lista }}>
            {children}
        </ExampleContext.Provider>
    )
}

