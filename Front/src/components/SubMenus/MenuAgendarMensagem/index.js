import React, { useState, useRef, useEffect, useCallback, memo} from 'react';
import IconTemp from '../../../assets/iconTemp.svg';
import IconDateAgendar from '../../../assets/IconDateAgendar.svg';
import IconHoraAgendar from '../../../assets/IconHoraAgendar.svg';
import './style.css';

const ScheduleMessageMenu = () => {
    // Estado e referências
    const [isScheduleMenuOpen, setScheduleMenuOpen] = useState(false);
    const [isMessageSelectMenuOpen, setMessageSelectMenuOpen] = useState(false);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedMessage, setSelectedMessage] = useState("Selecionar mensagem"); // Inicializando com "Selecionar mensagem"

    const scheduleMenuRef = useRef(null);
    const messageSelectMenuRef = useRef(null);
    const iconTempRef = useRef(null);


    // Função para resetar os valores
    const resetValues = useCallback(() => { // Usando useCallback
        setSelectedDate("");
        setSelectedTime("");
        setSelectedMessage("Selecionar mensagem");
    }, []); // Dependências vazias indicam que esta função nunca será recriada


    const updateDate = (newDate) => {
        setSelectedDate(newDate);
    };
    
    const updateTime = (newTime) => {
        setSelectedTime(newTime);
    };



    // Funções de manipulação para o menu agendar mensagem
    const toggleScheduleMenu = () => {
        setScheduleMenuOpen(prevState => !prevState);
    };

    const closeScheduleMenu = () => {
        setScheduleMenuOpen(false);
    };

    // Funções de manipulação para o menu de seleção de mensagem
    const toggleMessageSelectMenu = () => {
        setMessageSelectMenuOpen(prevState => !prevState);
    };

    const closeMessageSelectMenu = () => {
        setMessageSelectMenuOpen(false);
    };
    
    
    // Função consolidada para detecção de cliques fora
    const handleClickOutside = event => {
        const clickedOutsideScheduleMenu = scheduleMenuRef.current && !scheduleMenuRef.current.contains(event.target);
        const clickedOnIcon = iconTempRef.current && iconTempRef.current.contains(event.target);
    
        if (clickedOutsideScheduleMenu && !clickedOnIcon) {
            closeScheduleMenu();
            if (isMessageSelectMenuOpen) {
                closeMessageSelectMenu();
            }
        }
    };
    

    // Efeito para ouvir cliques fora
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    useEffect(() => {
        setIsOverlayVisible(isScheduleMenuOpen || isMessageSelectMenuOpen);
    }, [isScheduleMenuOpen, isMessageSelectMenuOpen]);
    
    

    // Componentes internos do menu
    const ScheduleDropdownMenu = memo(({ isOpen, 
        selectedDate, 
        setSelectedDate, 
        selectedTime, 
        setSelectedTime, 
        setSelectedMessage, 
         }) => {


        console.log('Rendering ScheduleDropdownMenu');

        const handleDateChange = useCallback((e) => {
            const newDate = e.target.value;
            updateDate(newDate); // Use the function directly
        }, []);
    
        const handleTimeChange = useCallback((e) => {
            const newTime = e.target.value;
            updateTime(newTime); // Use the function directly
        }, []);

        if (!isOpen) return null;

        return (
            <div style={scheduleMenuStyles.menu}>
            <h4 style={scheduleMenuStyles.title}>Programar mensagem</h4>

            <div style={scheduleMenuStyles.inputContainer}>
                <img src={IconDateAgendar} alt="Ícone de Data" style={scheduleMenuStyles.icon} />
                <input value={selectedDate} onChange={handleDateChange} style={scheduleMenuStyles.input} type="text" placeholder="18 de agosto de 2023" />
            </div>

            <div style={scheduleMenuStyles.inputContainer}>
                <img src={IconHoraAgendar} alt="Ícone de Hora" style={scheduleMenuStyles.icon} />
                <input value={selectedTime} onChange={handleTimeChange} style={scheduleMenuStyles.input} type="text" placeholder="11: 00" />
            </div>

            <div style={scheduleMenuStyles.inputContainer} onClick={toggleMessageSelectMenu}>
                <button style={scheduleMenuStyles.selectInput}>{selectedMessage}</button>
            </div>
            
            {isMessageSelectMenuOpen && <MessageSelectDropdownMenu isOpen={isMessageSelectMenuOpen} onSelect={setSelectedMessage} />} 

            <button style={scheduleMenuStyles.button} onClick={() => {closeScheduleMenu(); resetValues();}}>Programar</button>
        </div>
        );
    });

    const MessageSelectDropdownMenu = memo(({ isOpen, onSelect }) => {
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
                    <div style={messageSelectMenuStyles.item} key={option} onClick={() => {closeMessageSelectMenu(); onSelect(option);}}>
                        {option}
                    </div>
                    ))}
                </div>
            </div>
        );
    });

    // Retornando o componente
    return (
        <div>
            {isOverlayVisible && 
                <div 
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        zIndex: 10,
                        backgroundColor: 'transparent'
                    }} 
                    onClick={() => {
                        closeScheduleMenu();
                        closeMessageSelectMenu();
                    }} 
                />
            }
            <div className="icon-container" onClick={toggleScheduleMenu}>
                <img src={IconTemp} alt={"IconTemp"} />
            </div>
            <ScheduleDropdownMenu 
                isOpen={isScheduleMenuOpen} 
                selectedDate={selectedDate} 
                setSelectedDate={setSelectedDate} 
                selectedTime={selectedTime} 
                setSelectedTime={setSelectedTime} 
                setSelectedMessage={setSelectedMessage}
            />
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
        zIndex: '10',
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
        zIndex: '10',
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
