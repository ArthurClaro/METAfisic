import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../services/api";
import { useOutclick } from "../hooks/useOutclick";
import { useKeydown } from "../hooks/useKeydown";
import { toast } from "react-toastify";

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
            // toastErro('da no mesmo  !', 3000)
        }
    }

    const [training, settraining] = useState([]);

    const createTraining = async (formData, id) => {
        // console.log("----------", formData, typeof id)
        try {
            try {
                const { data } = await api.get(`/days/${id}`);

                const trainingInDay = data.filter((day) => day.createdAt == new Date().toLocaleDateString())
                trainingInDay.forEach(element => {
                    localStorage.setItem('@DAYTOKEN', element.id)
                });
                toastSuccess('deu certo !', 2000)

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

            toastSuccess('treino cirado!', 2000)
            // console.log(data)
            settraining(data)
        } catch (error) {
            console.log(error.message)
            toastErro('erroo treino  !', 3000)
        }
    }



    const takeDayGet = async (id) => {

        try {
            const { data } = await api.get(`/days/${id}`);
            console.log(data)
            // data.forEach(element => {
            // console.log(element)
            // });
            toastSuccess('deu certo !', 2000)

        } catch (error) {
            console.log(error.message)
            toastErro('Category don`t exist  !', 3000)
        }

    }







    const userLogoutClearDay = () => {
        localStorage.removeItem('@DAYTOKEN')
    }

    return (
        <ExampleContext.Provider value={{ takeDayGet, userLogoutClearDay, createTraining, training, days, createDay, groups, userLogin, userPost, delClient, clientLogin, editingClient, seteditingClient, pacthClients, setIsOpenClient, isOpenClient, getUser, userClient, clientPost, toastSuccess, toastErro, setLista, user, userLogout, isOpen, setIsOpen, modalRef, buttonRef, isOpen2, setIsOpen2, setUser, lista }}>
            {children}
        </ExampleContext.Provider>
    )
}

