import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import api from "../../services/api";
import { getSession, getToken } from "../../services/auth";
import { listenerMessages } from "../../services/socket-listener";
import config from "../../util/sessionHeader";
import MicRecorder from "mic-recorder-to-mp3";
import NotificationSound from "../../assets/notification.mp3";
import { MyTooltip } from "../../components/MyTooltip";
import "emoji-mart/css/emoji-mart.css";
import { toast } from "react-toastify";
import { Picker } from "emoji-mart";
import { X } from "react-feather";
import CircularProgress from "@material-ui/core/CircularProgress";
import CancelIcon from "@material-ui/icons/Cancel";
import IconLista from '../../assets/IconLista.png';
import IconEmoji from '../../assets/iconEmoji.svg';
import IconSendFile from '../../assets/iconSendFile.svg';
import IconMessage from '../../assets/iconMessage.svg';
import IconAdd from '../../assets/iconAdd.svg';
import IconMic from '../../assets/IconMic.svg';
import ImageLoader from "../../assets/ChatNextGo.png";
import ChatComponent from "../../components/ChatPage/ChatComponent";
import ConversasComponent from "../../components/ChatPage/ConversasComponent";
import BackdropComponent from "../../components/BackdropComponent";
import IconSendMessage from '../../assets/iconSendMessage.svg';
import ButtonListaMenu from '../../components/SubMenus/MenuLista';
import ButtonEtiquetaMenu from '../../components/SubMenus/MenuEtiqueta';
import ModalFinalizarAtendimento from '../../components/Modal/FinalizarAtendimento';
import ModalNextGoPay from '../../components/Modal/ModalNextGoPay';
import SearchModal from '../../components/SubMenus/PesquisarConversa';
import MoreOptionsMenu from '../../components/SubMenus/MenuMoreOptions';
import MessageOptionsMenu from '../../components/SubMenus/MenuMensagensDefinidas';
import NoteOptionsMenu from '../../components/SubMenus/MenuNotas';
import ScheduleMessageMenu from '../../components/SubMenus/MenuAgendarMensagem';
import ContactsModal from '../../components/Modal/ModalContacts/index';
import HeaderComponent from '../../components/Header';
import Swal from 'sweetalert2';
import { width } from "@mui/system";


import {     
ChatContainer,
Contador, 
Container, 
ContentContainer, 
HeaderContact, 
Layout, 
WaitingContainer, 
ReplyContainer, 
LoadMoreComponent, 
HeaderButton, 
StyledSearch, 
StyledMoreVertical 
} from "./style";

const defaultImage = "user.png";

const SendMessagePage = () => {
    const dropRef = useRef(null);
    const [allMessages, setAllMessages] = useState([]);
    const [chats, setChats] = useState([]);
    const [dados, setDados] = useState([]);
    const [choosedContact, setChoosedContact] = useState(null);
    const [imgContact, setImgContact] = useState("");
    const [message, setMessage] = useState("");
    const chatRef = useRef(null);
    const messagesEnd = useRef(null);
    const [recordState, setRecordState] = useState(null);
    const [segundos, setSegundos] = useState(0);
    const [minutos, setMinutos] = useState(0);
    const [stop, setStop] = useState(true);
    const [isBlocked, setIsBlocked] = useState(false);
    const recorder = useMemo(() => new MicRecorder({bitRate: 128}), []);
    const [openLoading, setOpenLoading] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [emoji, setEmoji] = useState(false);
    const [hasMessages, setHasMessages] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [selectedChatImage, setSelectedChatImage] = React.useState(defaultImage);
    const [loading, setLoading] = useState(true);
    const [loadingMoreMessages, setLoadingMoreMessages] = useState(false);
    const [hasNoMore, setHasNoMore] = useState(false);
    const [isContactsModalOpen, setIsContactsModalOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);




    // Definição do Alert para verificações adicionais
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });


    useEffect(() => {
        if (allMessages.length > 0 && !hasMessages) {
        setHasMessages(true);
        }
    }, [allMessages]);


    // Verificar sessão
    useEffect(() => {
        async function checkConnection() {
            try {
                await api.get(`${getSession()}/check-connection-session`, config());
                await getAllChats();
                await getAllContacts();
            } catch (e) { }
        }

        checkConnection();

        return () => {
            setChats([]);
        };

    }, []);



    useEffect(() => {
        if (stop === false) {
            const intervalId = setInterval(() => {
                setSegundos(seconds => {
                    if (seconds >= 59) {
                        zerar();
                        incrementarMinuto();
                    }

                    return seconds + 1;
                });
            }, 1000);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [segundos, stop]);


    
    // ------------------------------ Retorno das mensagens via Socket ---------------------------------- // 
    listenerMessages((err, data) => {
        if (err) return;

        /*if (!data.response.fromMe) {
            const audio = new Audio(NotificationSound);
            audio.play();
        }*/

        (async function () {
            const {data: {response: newChats}} = await api.get(`${getSession()}/all-chats-with-messages`, config());
    
            const updatedChats = newChats.map(newChat => {
                const existingChat = chats.find(chat => chat.id === newChat.id);
                if (existingChat) {
                    return {
                        ...newChat,
                        imgUrl: existingChat.imgUrl,  
                        name: existingChat.name      
                    };
                } 
                
                return newChat; 
            });
            
            setChats(updatedChats);
            setDados(updatedChats);

        })()

        if (chatRef.current !== null) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }

        if (choosedContact.id !== undefined) {
            if (choosedContact.id === data.response.chatId || data.response.fromMe && choosedContact.id._serialized === data.response.to) {
                setAllMessages((prevState) => {
                    return [...prevState, data.response];
                });

                scrollToBottom();
            }
        }
    });

    // ------------------------------ Retorno dos contatos --------------------------------- //

    const handleCloseContactsModal = () => {
        setIsContactsModalOpen(false);
    };

    const handleOpenContactsModal = () => {
        setIsContactsModalOpen(true);
    };

    /*useEffect(() => {
        if (isLoaded) {
            alert("Todos os contatos foram carregados!");
        }
    }, [isLoaded]);*/
    
    async function getAllContacts() {
        try {
            const chatImages = await getChatImages();
            const { data } = await api.get(`${getSession()}/all-contacts`, config());
            const arr = [];
    
            for (const contact of data.response) {
                if (contact.isMyContact && contact.id.user !== undefined) {
                    arr.push(contact);
                }
            }
    
            for (const contact of arr) {
                const [imageResponse, statusResponse] = await Promise.all([
                    api.get(`${getSession()}/profile-pic/${contact.id.user}`, config()),
                    api.get(`${getSession()}/profile-status/${contact.id.user}`, config())
                ]);
    
                if (imageResponse.data.status === "success" && imageResponse.data.response.eurl) {
                    contact.imgUrl = imageResponse.data.response.eurl;

                } else if (chatImages[contact.id._serialized]) {
                    contact.imgUrl = chatImages[contact.id._serialized];

                } else {
                    contact.imgUrl = './user.png';
                }
    
                if (statusResponse.data.status === "success" && statusResponse.data.response.status) {
                    contact.statusMessage = statusResponse.data.response.status;

                } else {
                    contact.statusMessage = '';
                }
            }
    
            setContacts(arr);
            console.log('Lista de contatos:', arr);
            setIsLoaded(true);
    
        } catch (error) {
            console.error('Error:', error);
        }
    
        setLoading(false);
    }
    

    // ------------------------------------------------------- // 
    function zerarCronometro() {
        setSegundos(0);
        setMinutos(0);
    }

    const startRecording = () => {
        navigator.getUserMedia({audio: true},
            () => {
                setIsBlocked(false);
            },
            () => {
                alert("Permission Denied");
                setIsBlocked(true);
            },
        );

        if (isBlocked) {
            alert("Permission Denied");
        } else {
            recorder.start().then(() => {
                setRecordState(true);
                setStop(false);
            }).catch((e) => {
                console.error(e);
            });
        }
    };

    function cancelRecording() {
        // mediaRecorder.stop();
        setRecordState(null);
        setStop(true);
        zerarCronometro();
    }

    const finishRecording = () => {
        setRecordState(null);
        setStop(true);
        zerarCronometro();

        recorder.stop().getMp3().then(([buffer, blob]) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = async function () {
                const base64data = reader.result;
                await api.post(`${getSession()}/send-voice`, {
                    url: base64data,
                    phone: choosedContact.id,
                }, config());
            };

            const file = new File(buffer, "audio.mp3", {
                type: blob.type,
                lastModified: Date.now()
            });
            new Audio(URL.createObjectURL(file));

        }).catch((e) => {
            alert("We could not retrieve your message");
            console.log(e);
        });
    };

    function incrementarMinuto() {
        setMinutos((prevState) => prevState + 1);
    }

    function zerar() {
        setSegundos(0);
    }


    //-------- ------------------------ Retorno dos chats ---------------------------------- //

    async function getAllChats() {
        try {
            const { data: { response: chatsResponse } } = await api.get(`${getSession()}/all-chats-with-messages`, config());
            const { data: { response: contactsResponse } } = await api.get(`${getSession()}/all-contacts`, config());
    
            const contactsObject = contactsResponse.reduce((acc, contact) => {
                acc[contact.id._serialized] = contact;
                return acc;
            }, {});
    
            const arr = chatsResponse.map(chat => ({
                ...chat,
                name: contactsObject[chat.id] ? contactsObject[chat.id].name : chat.name,
                imgUrl: contactsObject[chat.id] && contactsObject[chat.id].profilePicThumbObj ? contactsObject[chat.id].profilePicThumbObj.img : defaultImage
            }));
        
            setChats(arr);
            setDados(arr);
            
        } catch (e) {
            const {data: {response}} = await api.get(`${getSession()}/all-chats-with-messages`, config());
    
            const arr = [];
            for (const elem of response) {
                if (!elem.archive) {
                    arr.push(elem);
                }
            }
    
            setChats(arr);
            setDados(arr);
        }
    }
    

    // ------------------------ Rota para recuperar a imagem do chats ---------------------- //

    async function getChatImages() {
        try {
            const { data } = await api.get(`${getSession()}/all-chats`, config());

            return data.response.reduce((acc, chat) => {
                acc[chat.id._serialized] = chat.contact.profilePicThumbObj?.img || './user.png';
                return acc;
            }, {});
        } catch (error) {
            console.error('Error in getChatImages:', error);
            return {};
        }
    }

    // ------------------------------------ Selecionar Chat ---------------------------------- //

    const onClickContact = useCallback(async (contact) => {
        setSelectedChatImage(contact.imgUrl);
        setChoosedContact(contact);
        setOpenLoading(true);
        setAllMessages([]);
        setHasNoMore(false);
    
        try {
            let isGroup = false;
            
            if (contact.id.includes("@g.us")) {
                isGroup = true;
                const {data} = await api.get(`${getSession()}/chat-by-id/${contact.id.replace(/[@g.us,@g.us]/g, "")}?isGroup=true`, config());
                await api.post(`${getSession()}/send-seen`, {phone: contact.id.replace("@g.us", "")}, config());

            } else {
                const {data} = await api.get(`${getSession()}/chat-by-id/${contact.id.replace(/[@c.us,@c.us]/g, "")}?isGroup=false`, config());
                await api.post(`${getSession()}/send-seen`, {phone: contact.id.replace("@c.us", "")}, config());
            }
    
            const phone = contact.id.replace(/[@g.us,@c.us]/g, "");
            const { data: messagesData } = await api.get(`${getSession()}/all-messages-in-chat/${phone}?isGroup=${isGroup}&includeMe=true&includeNotifications=false`, config());

            setAllMessages(messagesData?.response || []);
            
        } catch (e) {
            console.log(e);
        }
    
        scrollToBottom();
        contact.unreadCount = 0;
        setOpenLoading(false);

    }, []);

    
    // -------------------------------- funções adicionais  --------------------------------- // 

    // Arquivar chats 
    const archiveChat = async () => {
        if (!choosedContact?.id) {
            console.error("Nenhum chat selecionado para arquivar.");
            return;
        }
    
        try {
            const chatId = choosedContact?.id?.replace(/[@g.us,@c.us]/g, "");
            const session = getSession();
            const response = await api.post( `${session}/archive-chat`, { phone: chatId }, config());
            
            if (response.data.status === "success") {
                setChoosedContact({});  
                await getAllChats();  
        
                setChoosedContact(null);

                Toast.fire({
                    icon: 'success',
                    title: "Seu atendimento foi finalizado! E a conversa foi arquivada"
                  });
    
            } else {
                console.error("Erro ao arquivar o chat:", response.data.message);
            }

        } catch (error) {
            console.error("Erro ao fazer a chamada à API:", error);
        }
    };
    

    // Função para rolar sempre para o final quando um chat for selecionado
    const scrollToBottom = () => {
        if (messagesEnd.current !== null) {
            messagesEnd.current.scrollIntoView({behavior: "smooth"});
        }
    };


    // Enviar Mensagem 
    async function sendMessage() {
        if (!!message.trim() && !!getSession()) {
            const by = "";
            let endpoint = "send-message";

            const body = {
                phone: choosedContact.id.replace(/[@c.us,@g.us]/g, ""),
                message: by + message,
            };

            if (choosedContact.id.includes("@g.us")) {
                body.isGroup = true;
            }

            if (selectedMessage) {
                body.messageId = selectedMessage.id;
                endpoint = "send-reply";
            }

            await api.post(`${getSession()}/${endpoint}`, body, config());
            
            clearAndScrollToBottom();
            setSelectedMessage(null);

        } else {
            toast.error("Digite uma mensagem!", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };


    // Enviar arquivo (Imagem/Video/Texto)
    function onChangeAnexo(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            const filename = e.target.files[0].name;
            reader.readAsDataURL(e.target.files[0]);

            reader.onload = async function (e) {
                const base64 = e.target.result;
                const options = {
                    base64: base64,
                    phone: choosedContact.id.replace(/[@c.us,@g.us]/g, ""),
                    message: "",
                    filename: filename,
                };

                if (choosedContact.id.includes("@g.us")) {
                    options.isGroup = true;
                }

                try {
                    await api.post(`${getSession()}/send-file-base64`, options, config());

                } catch (error) {
                    console.log("Catch onChangeAnexo()", error);
                }
            };
        }
    };


    // Pesquisar conversa 
    function searchChat(e) {
        const { value } = e.target;

        const filterContact = contacts.filter((filtro) => {
            if (filtro.name && filtro.id._serialized) {
                return (
                    filtro.name
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .indexOf(value.toLowerCase()) > -1 ||
                    filtro.id._serialized.indexOf(value) > -1
                );

            } else {
                return []
            }
        })

        const filterChat = chats.filter((filtro) => {
            if (filtro.name && filtro.id) {
                return (
                    filtro.name
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .indexOf(value.toLowerCase()) > -1 || filtro.id.indexOf(value) > -1
                );

            } else {
                return [];
            }
        })

        const searchArr = [];

        for (const chat of filterChat) {
            searchArr.push({
                name: chat.name,
                id: chat.id,
                unreadCount: 0,
            })
        }

        for (const contact of filterContact) {
            searchArr.push({
                name: contact.name,
                id: contact.id._serialized,
                unreadCount: 0,
                msgs: null,
            });
        }

        const filterArr = removeDuplicates(searchArr);
        setChats(filterArr);

        if (value === "") {
            setChats(dados);
        }
    };


    // Inserir Emoji 
    function addEmoji(e) {
        let emoji = e.native;
        setMessage(message + emoji);
    }

    // Carregar mais mensagens 
    async function loadMore() {
        setLoadingMoreMessages(true);
        try {
            let param = "?isGroup=false";
            if (choosedContact.id.includes("@g.us")) {
                param = "?isGroup=true";
            }
            const { data } = await api.get(
                `${getSession()}/load-earlier-messages/${choosedContact.id}${param}`,
                config()
            );
            if (data && data.response && Array.isArray(data.response)) {
                setAllMessages((prev) => [...data.response, ...prev]);
            }
            if (data && !data.response) {
                setHasNoMore(true);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoadingMoreMessages(false);
        }
    };

    function clearAndScrollToBottom() {
        setMessage("");
        setEmoji(false);
        scrollToBottom();
    }

    const removeDuplicates = (arr) => {
        return arr.filter((item, index, self) => {
            if (item.name) return ( index === self.findIndex((t) => t.id === item.id && t.name && item.name));
        });
    };

    // ----------------------------------- SubMenus ------------------------------------ // 

    // Pesquisa na conversa
    const [isSearchOpen, setSearchOpen] = useState(false);

    const openSearchModal = () => {
      setSearchOpen(true);
    };
  
    const closeSearchModal = () => {
      setSearchOpen(false);
    };
  

    // Mais opções
    const [isMoreMenuOpen, setMoreMenuOpen] = useState(false);

    const toggleMoreMenu = () => {
        setMoreMenuOpen(!isMoreMenuOpen);
    };

    const closeMoreMenu = () => {
        setMoreMenuOpen(false);
    };


    // Mesagens definidas
    const [isMessageMenuOpen, setMessageMenuOpen] = useState(false);
    const iconRef = useRef(null);

    const toggleMessageMenu = () => {
        setMessageMenuOpen(prevState => !prevState);
    };

    const closeMessageMenu = () => {
        setMessageMenuOpen(false);
    };  

    
    // Notas
    const [isNoteMenuOpen, setNoteMenuOpen] = useState(false);
    const iconAddRef = useRef(null);

    const toggleNoteMenu = () => {
        setNoteMenuOpen(prevState => !prevState);
    };

    const closeNoteMenu = () => {
        setNoteMenuOpen(false);
    };


    // ------------------------------------- Render -------------------------------------- //
    return (
        <Layout>
            <HeaderComponent/>

                <Container ref={dropRef}>
                
                    <ContentContainer>
                        <ConversasComponent
                            chats={chats}
                            setChats={setChats}
                            onClickContact={onClickContact}
                            onSearch={searchChat}
                            choosedContact={choosedContact}
                        />

                        <BackdropComponent open={openLoading}/>

                    <ChatContainer>
                            {!choosedContact ? (
                                <WaitingContainer>
                                    <div>
                                        <img src={ImageLoader} alt={"Smartphone"} />
                                    </div>
                                </WaitingContainer>
                            ) : (
                                <>
                                    <HeaderContact>
                                    <div className={"container-info-ctt"}>
                                                    
                                                    <img
                                                        src={selectedChatImage}
                                                        alt={choosedContact.name}
                                                        loading={"lazy"}
                                                        onError={(e) => (e.target.src = defaultImage )}   
                                                    />

                                                    <h3>
                                                        {!choosedContact.name === undefined
                                                        ? choosedContact.id
                                                            .replace(/[@c.us,@g.us]/g, "")
                                                        : choosedContact.name}

                                                        <p>Visto por ultimo hoje as 14:45</p>
                                                    </h3>
                                                
                                                
                                                    <HeaderButton>

                                                        <ButtonListaMenu iconLista={IconLista} />

                                                        <ButtonEtiquetaMenu />

                                                        <ModalFinalizarAtendimento onArchiveChat={archiveChat} />

                                                        <ModalNextGoPay /> 

                                                    </HeaderButton>
                                                
                                                    <StyledSearch onClick={openSearchModal} />
                                                    <SearchModal isSearchOpen={isSearchOpen} closeSearchModal={closeSearchModal} />

                                                    <StyledMoreVertical onClick={toggleMoreMenu} />
                                                    <MoreOptionsMenu isOpen={isMoreMenuOpen} onClose={closeMoreMenu} />
                                                
                                                </div>
                                    </HeaderContact>

                                    <ul ref={chatRef} style={{ overflowX: "hidden" }}>
                                        {!hasNoMore && hasMessages && allMessages.length > 0 && (
                                            <LoadMoreComponent onClick={loadMore}>
                                                Carregar mais{loadingMoreMessages && <>&nbsp;&nbsp;&nbsp;<CircularProgress size={10}/></>}
                                            </LoadMoreComponent>
                                        )}

                                        {allMessages.map((message) => (
                                            <li key={message.id} id={message.id}>
                                                <ChatComponent
                                                    isMe={message.fromMe ? "right" : "left"}
                                                    isWarning={
                                                        !message?.body &&
                                                        message.type !== "chat" &&
                                                        !["ptt", "audio"].includes(message.type)
                                                    }
                                                    session={getSession()}
                                                    token={getToken()}
                                                    message={message}
                                                    selectMessageId={() => setSelectedMessage(message)}
                                                />
                                            </li>
                                        ))}

                                        <div ref={messagesEnd}/>
                                    </ul>

                                    {!!selectedMessage && (
                                        <ReplyContainer>
                                            <div className="content">
                                                        <ChatComponent
                                                            isMe={selectedMessage.fromMe ? "right" : "left"}
                                                            isWarning={!selectedMessage?.body && selectedMessage.type !== "chat" && !["ptt", "audio"].includes(selectedMessage.type)}
                                                            session={getSession()}
                                                            token={getToken()}
                                                            message={selectedMessage}
                                                            selectMessageId={() => {}}
                                                        />
                                                    </div>

                                                    <div>
                                                        <MyTooltip
                                                            name="Cancelar"
                                                            icon={<CancelIcon />}
                                                            onClick={() => setSelectedMessage(null)}
                                                        />
                                                    </div>
                                        </ReplyContainer>
                                    )}

                                    {emoji ? <Picker onSelect={addEmoji} /> : null}

                                    <div className="footer_container">
                                        <div className="bottom-container">     
                                            
                                    {/* Ícones à esquerda */}
                                    <div className="left-icons">
                                    {emoji ? (
                                        <button onClick={() => setEmoji(false)}>
                                            <X/>
                                        </button>
                                        ) : (
                                            <button onClick={() => setEmoji(true)}>
                                                <img src={IconEmoji} alt={"IconEmoji"} style={{ width: '18px', height: '18px' }}/>
                                            </button>
                                        )}

                                    <label className="icon-container">
                                        <input type="file" onChange={onChangeAnexo} />
                                        <img src={IconSendFile} alt={"IconMessage"}/>
                                    </label>

                                    <div className="icon-container" onClick={toggleMessageMenu} ref={iconRef}>
                                        <img src={IconMessage} alt={"IconMessage"}/>
                                    </div>
                                    <MessageOptionsMenu isOpen={isMessageMenuOpen} onClose={closeMessageMenu} anchorRef={iconRef} />

                                    <div className="icon-container" onClick={toggleNoteMenu} ref={iconAddRef}>
                                        <img src={IconAdd} alt={"IconAdd"}/>
                                    </div>
                                    <NoteOptionsMenu isOpen={isNoteMenuOpen} onClose={closeNoteMenu} anchorRef={iconAddRef} />

                                    <ScheduleMessageMenu />
                                </div>

                                            {/* Input e microfone */}
                                            <div className="message-input-container">
                                            <textarea
                                                placeholder="Digite sua mensagem aqui..."
                                                onKeyDown={(event) => {
                                                    if (event.key === "Enter" && !event.shiftKey) {
                                                        event.preventDefault();
                                                        sendMessage();
                                                    }
                                                }}
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                            />

                                                {message === "" && (
                                                <div className="mic-icon">
                                                    <img src={IconMic} alt={"Microphone Icon"} onClick={startRecording} style={{ width: '22px', height: '22px' }}/>
                                                </div>
                                                )}
                                            </div>

                                            {/* Botão de envio */}
                                            <div className="send-button">
                                                <img src={IconSendMessage} alt={"Send Message Icon"} onClick={sendMessage}/>
                                            </div>

                                        </div>
                                    </div>
                                </>
                            )}
                        </ChatContainer>

                    </ContentContainer>
                </Container>

                {isContactsModalOpen && <ContactsModal contacts={contacts} onClickContact={onClickContact} onClose={handleCloseContactsModal} />}

                <SearchModal />
            </Layout>
        );
    };

    export default SendMessagePage;