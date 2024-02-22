import { createContext, useContext, useState } from "react";
import { ExampleContext } from "./UserContext";
import { api } from "../services/api";


export const ContactContext = createContext({})

export const ContactProvider = ({ children }) => {

    const { toastSuccess, getUser, toastErro } = useContext(ExampleContext)


    const createContact = async (formData) => {
        const token = localStorage.getItem('@TOKEN')
        try {
            const { data } = await api.post('/contacts', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            toastSuccess('Contato criado com sucesso !', 2000)
            getUser()
        } catch (error) {
            console.log(error)
            toastErro('E-mail já vinculado em outra conta !', 5000)
        }
    }

    const pacthContacts = async (formData) => {
        const token = localStorage.getItem('@TOKEN')
        const idPost = localStorage.getItem('@ID_CONTACTS')
        try {
            const { data } = await api.patch(`/contacts/${idPost}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            toastSuccess('Contato atualizado !', 2000)
            getUser()
        } catch (error) {
            console.log(error)
        }
    }

    const [editingContacts, seteditingContacts] = useState(null)


    const delContacts = async (formData) => {
        const token = localStorage.getItem('@TOKEN')

        try {
            const { data } = await api.delete(`/contacts/${formData}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log(data)
            toastSuccess('Contato Deletado !', 2000)
            await getUser()

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <ContactContext.Provider value={{ createContact, pacthContacts, seteditingContacts, editingContacts, delContacts }}>
            {children}
        </ContactContext.Provider>
    )
}

