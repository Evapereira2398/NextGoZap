import React, { useState, useRef, useEffect } from 'react';
import IconTemp from '../../../assets/iconTemp.svg';
import IconDateAgendar from '../../../assets/IconDateAgendar.svg';
import IconHoraAgendar from '../../../assets/IconHoraAgendar.svg';
import './style.css';

const ScheduleMessageMenu = () => {
    // Estado e referências
    const [isScheduleMenuOpen, setScheduleMenuOpen] = useState(false);
    const [isMessageSelectMenuOpen, setMessageSelectMenuOpen] = useState(false);

    const scheduleMenuRef = useRef(null);
    const messageSelectMenuRef = useRef(null);
    const iconTempRef = useRef(null);

    // Funções de manipulação para o menu agendar mensagem
    const toggleScheduleMenu = () => {
        setScheduleMenuOpen(prevState => !prevState);
    };

    const closeScheduleMenu = () => {
        setScheduleMenuOpen(false);
    };

    const handleScheduleMenuClickOutside = event => {
        if (
            scheduleMenuRef.current && 
            !scheduleMenuRef.current.contains(event.target) && 
            iconTempRef.current && 
            !iconTempRef.current.contains(event.target)
        ) {
            closeScheduleMenu();
        }
    };

    // Funções de manipulação para o menu de seleção de mensagem
    const toggleMessageSelectMenu = () => {
        setMessageSelectMenuOpen(prevState => !prevState);
    };

    const closeMessageSelectMenu = () => {
        setMessageSelectMenuOpen(false);
    };

    const handleMessageSelectMenuClickOutside = event => {
        if (
            messageSelectMenuRef.current && 
            !messageSelectMenuRef.current.contains(event.target) && 
            iconTempRef.current && 
            !iconTempRef.current.contains(event.target)
        ) {
            closeMessageSelectMenu();
        }
    };

    // Efeitos para ouvir cliques fora
    useEffect(() => {
        if (isScheduleMenuOpen) {
            document.addEventListener('mousedown', handleScheduleMenuClickOutside);
        } else {
            document.removeEventListener('mousedown', handleScheduleMenuClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleScheduleMenuClickOutside);
        };
    }, [isScheduleMenuOpen]);

    useEffect(() => {
        if (isMessageSelectMenuOpen) {
            document.addEventListener('mousedown', handleMessageSelectMenuClickOutside);
        } else {
            document.removeEventListener('mousedown', handleMessageSelectMenuClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleMessageSelectMenuClickOutside);
        };
    }, [isMessageSelectMenuOpen]);

    // Componentes internos do menu
    const ScheduleDropdownMenu = ({ isOpen }) => {
        if (!isOpen) return null;

        return (
            <div style={scheduleMenuStyles.menu}>
            <h4 style={scheduleMenuStyles.title}>Programar mensagem</h4>

            <div style={scheduleMenuStyles.inputContainer}>
                <img src={IconDateAgendar} alt="Ícone de Data" style={scheduleMenuStyles.icon} />
                <input style={scheduleMenuStyles.input} type="text" placeholder="18 de agosto de 2023" />
            </div>

            <div style={scheduleMenuStyles.inputContainer}>
                <img src={IconHoraAgendar} alt="Ícone de Hora" style={scheduleMenuStyles.icon} />
                <input style={scheduleMenuStyles.input} type="text" placeholder="11: 00" />
            </div>

            <div style={scheduleMenuStyles.inputContainer} onClick={toggleMessageSelectMenu}>
                <button style={scheduleMenuStyles.selectInput}>Selecionar mensagem</button>
            </div>
            
            {isMessageSelectMenuOpen && <MessageSelectDropdownMenu isOpen={isMessageSelectMenuOpen} />}

            <button style={scheduleMenuStyles.button} onClick={closeScheduleMenu}>Programar</button>
        </div>
        );
    };

    const MessageSelectDropdownMenu = ({ isOpen }) => {
        if (!isOpen) return null;
        
        const menuOptions = [
            "Mensagem 1",
            "Mensagem 2",
            "Audio 1",
            "Imagem 1.jpg",
            "Audio 1",
            "Audio 1",
            "Audio 1",
            "Audio 1",
            "Audio 1",
            "Audio 1",
            "Audio 1",
            "Audio 1",
        ];

        return (
            <div style={messageSelectMenuStyles.menu} ref={messageSelectMenuRef}>
            <h4 style={messageSelectMenuStyles.title}>Mensagens definidas</h4>
                <div className="message-select-scroll-container" style={{...messageSelectMenuStyles.scrollContainer}}>
                    {menuOptions.map(option => (
                    <div style={messageSelectMenuStyles.item} key={option} onClick={closeMessageSelectMenu}>
                        {option}
                    </div>
                    ))}
                </div>
        </div>
        );
    };

    // Retornando o componente
    return (
        <div>
            <div className="icon-container" ref={iconTempRef} onClick={toggleScheduleMenu}>
                <img src={IconTemp} alt={"IconTemp"} />
            </div>
            <ScheduleDropdownMenu isOpen={isScheduleMenuOpen} />
        </div>
    );
}


// Estilos para o menu de Programação
const scheduleMenuStyles = {
    menu: {
        backgroundColor: '#030712',
        borderRadius: '8px',
        position: 'absolute',
        bottom: '70px',
        width: '220px',
        height: 'auto', 
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        left: '60px',
    },

    title: {
        color: '#F5F5F5',
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: '10px'
    },

    inputContainer: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: '8px',
        background: 'rgba(240, 240, 240, 0.25)',
        padding: '5px 10px',
    },
        
    input: {
        flex: 1,
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        color: 'rgba(240, 240, 240, 0.75)',
        fontSize: '15px',
        fontWeight: '500',
        lineHeight: '23px',
        marginLeft: '3px'
    },

    selectInput: {
        flex: 1, 
        appearance: 'none',
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent', 
        color: 'rgba(240, 240, 240, 0.75)',
        fontSize: '13px',
        fontWeight: '400',
        lineHeight: '23px',
        marginLeft: '3px',
        cursor: 'pointer'
    },

    icon: {
        width: '24px',
        height: '24px',
        marginRight: '10px'
    },

    button: {
        width: '100%',
        borderRadius: '8px',
        background: '#EAB308',
        color: '#F5F5F5',
        textAlign: 'center',
        fontSize: '13px',
        fontWeight: '700',
        padding: '10px 0',
        cursor: 'pointer'
    }

};

const messageSelectMenuStyles = {
    menu: {
        backgroundColor: '#030712',
        borderRadius: '8px',
        position: 'absolute',
        left: '223px', 
        width: '180px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        height: '220px',
        overflowY: 'auto',
    },

    title: {
        padding: '10px 15px',
        color: '#F5F5F5',
        fontSize: '14px',
        fontWeight: '500',
        borderBottom: '1px solid rgba(240, 240, 240, 0.3)'
    },

    item: {
        padding: '10px 15px',
        cursor: 'pointer',
        color: '#F5F5F5',
        fontSize: '13px',
        fontWeight: '400',
    },

    scrollContainer: {
        maxHeight: '180px', 
        overflowY: 'auto',
        paddingRight: '5px', 
    },
};



export default ScheduleMessageMenu;
