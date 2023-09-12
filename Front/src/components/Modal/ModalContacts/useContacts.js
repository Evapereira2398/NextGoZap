import { useState, useEffect } from 'react';
import api from "../../../services/api";
import config from "../../../util/sessionHeader";
import {getSession} from "../../../services/auth";

export default function useContacts() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        async function fetchContacts() {
            const { data } = await api.get(`${getSession()}/all-contacts`, config());
            const arr = [];
            const contactsWithImages = [];
        
            for (const contact of data.response) {
                if (contact.isMyContact && contact.id.user !== undefined) {
                    arr.push(contact);
                }
            }
        
            for (const contact of arr) {
                try {
                    // Recuperando imagem do contato 
                const imageResponse = await api.get(`${getSession()}/profile-pic/${contact.id.user}`, config());
                
                if (imageResponse.data.status === "success" && imageResponse.data.response.eurl && imageResponse.data.response.eurl) {
                    contact.imgUrl = imageResponse.data.response.eurl;
                } else {
                    contact.imgUrl = './user.png'; // imagem padrão
                }

                // Recuperando status do contato 
                const statusResponse = await api.get(`${getSession()}/profile-status/${contact.id.user}`, config());
                if (statusResponse.data.status === "success" && statusResponse.data.response.status) {
                    contact.statusMessage = statusResponse.data.response.status;
                } else {
                    contact.statusMessage = ''; // ou algum valor padrão caso não haja status
                }
                

                } catch (error) {
                    console.error(`Erro ao buscar imagem para o usuário ${contact.id.user}:`, error);
                }
                        
                contactsWithImages.push(contact);
            }
            
            
            setContacts(contactsWithImages);
        }        

        fetchContacts();
    }, []);

    return contacts;
}