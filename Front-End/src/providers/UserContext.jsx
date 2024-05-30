import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useOutclick } from "../hooks/useOutclick";
import { useKeydown } from "../hooks/useKeydown";
import { toast } from "react-toastify";

import costasImage from '../assets/groupsM/costas.png';
import pernaImage from '../assets/groupsM/perna.png';
import peitoImage from '../assets/groupsM/peito.png';
import cardioImage from '../assets/groupsM/cardio.png';
import bracoImage from '../assets/groupsM/braço.png';


export const ExampleContext = createContext({})

export const ExampleProvider = ({ children }) => {

    const navigate = useNavigate();

    function toastSuccess(message, time) {
        toast.success(message, {
            toastId: 'succes1',
            position: "top-right",
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            style: {
                background: 'black',
                color: '#F8F9FA'
            }
        });
    }
    function toastErro(message, time) {
        toast.error(message, {
            toastId: 'erro1',
            position: "top-right",
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            style: {
                background: 'black',
                color: '#F8F9FA'
            }
        });
    }

    const [isOpen2, setIsOpen2] = useState(false)

    const modalRef = useOutclick(() => {
        setIsOpen2(false);
        setisOpenTrainingFill(false)
    })

    const buttonRef = useKeydown('Escape', (element) => {
        element.click()
    })

    const [visibleModal, setVisibleModal] = useState(false);

    const checkboxArrow = useRef(null)

    const clickInSingUp = (trueOrF, time) => {
        localStorage.clear()
        setTimeout(() => {
            if (checkboxArrow.current) {
                checkboxArrow.current.checked = trueOrF;
            }
        }, time);
    }

    const clickGoOut = () => {
        localStorage.clear()
        setuserMETA([])
        toastSuccess('Usuário META deslogado.', 2000)
        window.location.href = '#sec1'
    }

    // ///////////////////////////////////////////////////////////////////

    // LOGIN & GROUPS

    const userPost = async (formData) => {
        try {
            const { data } = await api.post('/users', formData);
            toastSuccess('Usuário META criado.', 3000)
            setTimeout(() => {
                clickInSingUp(false)
            }, 2000);
        } catch (error) {
            toastErro('E-mail já cadastrado !', 3000)
        }
    }

    const [userMETA, setuserMETA] = useState([]);

    const userGet = async () => {
        try {
            const token = localStorage.getItem('@TOKEN')
            const emailUnique = localStorage.getItem('@EMAIL')
            const { data } = await api.get('/users', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const arrayUnique = data.find(element => element.email === emailUnique);

            setuserMETA([{ ...arrayUnique }])
            // [{...}]
        } catch (error) {
            // console.log(error);
        }
    };

    const [groups, setgroups] = useState([]);

    useEffect(() => {
        (async () => {
            await getGroups()
        })()
    }, []);

    const getGroups = async () => {
        try {
            const { data } = await api.get('/groups-muscles');
            const groupsWithImages = data.map(group => {
                let imageURL;
                switch (group.nome) {
                    case 'costas':
                        imageURL = costasImage;
                        break;
                    case 'perna':
                        imageURL = pernaImage;
                        break;
                    case 'peito':
                        imageURL = peitoImage;
                        break;
                    case 'cardio':
                        imageURL = cardioImage;
                        break;
                    case 'braço':
                        imageURL = bracoImage;
                        break;
                    default:
                        imageURL = null;
                }
                return { ...group, imageURL };
            });

            setgroups(groupsWithImages);
        } catch (error) {
            // console.log(error);
        }
    };

    const userLogin = async (formData) => {
        try {
            const { data } = await api.post('/login', formData);
            localStorage.setItem('@TOKEN', data.token)
            localStorage.setItem('@EMAIL', formData.email)

            toastSuccess('Redirecionando para Home.', 2500)
            setTimeout(() => {
                navigate('/')
                setVisibleModal(false)
                getGroups()
                userGet()
                setTimeout(() => {
                    setVisibleModal(true)
                }, 2300);
            }, 2000);
        } catch (error) {
            toastErro('Senha ou e-mail incorretos !', 3000)
        }
    }

    const loadUser = async () => {
        const localToken = localStorage.getItem("@TOKEN");
        const categoyParam = localStorage.getItem("@CATEGORYPARAM");

        if (localToken) {
            userGet()
            if (groups && categoyParam) {
                const lista = groups.find(element => element.nome === categoyParam);
                if (lista !== undefined) {
                    navigate(`/groups/${categoyParam}`);
                } else {
                    toastSuccess("Usuário já logado.", 2000);
                    navigate(`/`);
                }
            } else {
                navigate(`/`);
            }
        } else {
            setuserMETA([])
            setTimeout(() => {
                setIsOpen2(true)
            }, 2500);
        }
    };

    useEffect(() => {
        if (groups) {
            loadUser();
        }
    }, [groups]);

    // ////////////////////////////////////////////////////////////////////////

    // TRAINING CREATE

    const [treinosDoDia, settreinosDoDia] = useState([]);
    const takeTrainingCategoryDay = async () => {
        try {
            const dayIdToken = localStorage.getItem('@DAYTOKEN')
            const { data } = await api.get(`/training/${dayIdToken}`);
            settreinosDoDia(data)
        } catch (error) {
            console.log(error.message)
            toastErro('Training  exist  !', 3000)
        }
    }

    const [daysAll, setdaysAll] = useState([]);

    const [diaAtual, setdiaAtual] = useState({});

    const setDayTokenBefore = async (ids) => {
        try {
            const token = localStorage.getItem('@TOKEN')
            const { data } = await api.get(`/days/${ids}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            localStorage.setItem('@DAYTOKEN', data[0].id)
            setdaysAll(data)
            const today = data.find(element => element.createdAt === new Date().toLocaleDateString());
            setdiaAtual(today);

            takeTrainingCategoryDay()
        } catch (error) {
            // console.log(error);
        }
    }

    const [date, setDate] = useState(new Date().toLocaleDateString());

    const clickDayCalendar = () => {
        const dateClickOne = daysAll.find(element => element.createdAt === new Date(date).toLocaleDateString());
        if (dateClickOne) {
            setdiaAtual(dateClickOne);
            localStorage.setItem('@DAYTOKEN', dateClickOne.id)
        } else {
            setdiaAtual({});
            localStorage.setItem('@DAYTOKEN', null)
        }
    }

    useEffect(() => {
        clickDayCalendar()
        takeTrainingCategoryDay()
    }, [date]);


    const createDay = async (categoryObj, formData) => {
        try {
            const token = localStorage.getItem('@TOKEN')
            const { data } = await api.post(`/days`, categoryObj, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            localStorage.setItem('@DAYTOKEN', data.id)
            toastSuccess('Dia para treino criado !', 5000)
            createTraining(formData, categoryObj.category)
        } catch (error) {
            setDayTokenBefore(categoryObj.category)
            createTraining(formData, categoryObj.category)
        }
    }

    const createTraining = async (formData, id) => {
        try {
            const token = localStorage.getItem('@TOKEN')
            const dayIdToken = localStorage.getItem('@DAYTOKEN')
            const { data } = await api.post(`/training/${dayIdToken}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            setDayTokenBefore(id)
            clickDayCalendar()
            toastSuccess('Treino cirado com sucesso !', 2000)
        } catch (error) {
            console.log(error.message)
            loadUser()
        }
    }

    // ////////////////////////////////////////////////////////////////////////

    // TRAINING ALTER

    const [isOpenTrainingFill, setisOpenTrainingFill] = useState(false)

    const [editingTraining, seteditingTraining] = useState(null)

    const patchTrainingDay = async (formData) => {
        try {
            const trainingId = localStorage.getItem('@ID_TRAINING')
            const token = localStorage.getItem('@TOKEN')
            const categoryParam = localStorage.getItem('@CATEGORYPARAM')

            const { data } = await api.patch(`/training/${trainingId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const daysAll2 = await api.get(`/days/${categoryParam}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            setdaysAll(daysAll2.data)
            clickDayCalendar()
            setDayTokenBefore(categoryParam)
            toastSuccess('Treino atualizado !', 2000)
        } catch (error) {
            console.log(error.message)
            loadUser()
        }
    }

    const delTrainingDay = async (formData) => {
        const token = localStorage.getItem('@TOKEN')
        const categoryParam = localStorage.getItem('@CATEGORYPARAM')
        try {
            const { data } = await api.delete(`/training/${formData}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            toastSuccess('Treino deletado !', 2000)
            takeTrainingCategoryDay()
            setDayTokenBefore(categoryParam)
        } catch (error) {
            console.log(error)
            loadUser()
        }
    }

    let datas = [];
    datas = daysAll.map(element => element.createdAt);
    datas.sort()
    let datasFormatadas = [];

    datas.forEach((data, index) => {
        const metaB = daysAll.find(e => e.createdAt == data)
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

    const numberMetasGreen = datasFormatadas.filter((element) => element.meta === true);

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
                    <strong className="metaGreen" style={{ color: '#00FF7F' }}>{date.day}</strong>
                );
            }
            if ((element.type === "initialDay" || element.type === "endDay" || element.type === "otherDay")
                && element.day === currentDate.day
                && element.month === currentDate.month
                && element.year === currentDate.year
                && element.meta == false) {
                result = (
                    <strong className="metaFalse" style={{ color: '#3c3c3c' }}>{date.day}</strong>
                );
            }
        });
        return result;
    }

    const userLogoutClearDay = () => {
        setDate(new Date().toLocaleDateString())

        setdiaAtual({});
        setdaysAll([])
        localStorage.removeItem('@DAYTOKEN')
        localStorage.removeItem('@CATEGORYPARAM')

        setTimeout(() => {
            window.location.href = '#groups'
        }, 1000);
    }

    const useRedirect = (path, action, delay = 1000) => {
        const [redirect, setRedirect] = useState(false);
        const navigate = useNavigate();

        useEffect(() => {
            if (redirect) {
                const timer = setTimeout(() => {
                    if (action) action();
                    navigate(path);
                }, delay);

                return () => clearTimeout(timer);
            }
        }, [redirect, navigate, path, action, delay]);

        return () => setRedirect(true);
    };

    // ////////////////////////////////////////////////////////////////////////

    // USER EDIT

    return (
        <ExampleContext.Provider value={{
            clickDayCalendar, delTrainingDay, diaAtual,
            takeTrainingCategoryDay, patchTrainingDay, editingTraining, seteditingTraining,
            isOpenTrainingFill, setisOpenTrainingFill, treinosDoDia, dateTemplate,
            date, setDate, daysAll, userLogoutClearDay, createTraining,
            createDay, groups, userLogin, userPost,
            toastSuccess, toastErro,
            modalRef, buttonRef, userMETA,
            checkboxArrow, clickInSingUp,
            clickGoOut,
            isOpen2, setIsOpen2,
            visibleModal, setVisibleModal,
            loadUser, numberMetasGreen,
            useRedirect,
            setDayTokenBefore
        }}>
            {children}
        </ExampleContext.Provider>
    )
}

export const useProductsContext = () => useContext(ExampleContext)
