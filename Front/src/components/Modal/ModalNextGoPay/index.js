import React, { useState, useRef, useEffect } from 'react';
import IconEnviarCobranca from '../../../assets/IconEnviarCobranca.svg';
import { X } from "react-feather";

const ModalNextGoPay= () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const inputValueRef = useRef(null);
    const [inputValue, setInputValue] = useState("");

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
        setInputValue("");
    }

    useEffect(() => { 
        if (isModalOpen) {
            inputValueRef.current.focus();
        }
    }, [inputValue, isModalOpen]);

    const handleInputChange = (event) => {
        const input = event.target.value.replace(/\D/g, "");
        if (input.length <= 2) {
            setInputValue(input);
        } else {
            const integerPart = input.slice(0, -2);
            const decimalPart = input.slice(-2);
            setInputValue(`${integerPart},${decimalPart}`);
        }
    };

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    return (
        <>
            <button id="cobranca" onClick={openModal}> 
                <img src={IconEnviarCobranca} alt={"IconEnviarCobranca"} className='iconPay'/>
                <span className="textPay">Enviar cobrança</span>
            </button>

            {isModalOpen && (
               <div style={modalStyles.overlay} onClick={handleOverlayClick}>
                    <div style={modalStyles.modal}>
                        <div style={modalStyles.header}>
                            <h2 style={modalStyles.title}>Enviar cobrança</h2>
                            <button style={modalStyles.closeButton} onClick={closeModal}>
                                <X style={modalStyles.closeIcon}/>
                            </button>
                        </div>
   
                        <div style={modalStyles.inputContainer}>
                            <span style={modalStyles.currencySymbol}>R$</span>
                            <input 
                                type="text" 
                                value={inputValue} 
                                ref={inputValueRef} 
                                onChange={handleInputChange} 
                                maxLength={10} 
                                style={modalStyles.valueInput}
                            />
                        </div>
   
                        <button style={modalStyles.button} onClick={closeModal}>Enviar link de pagamento</button>
                    </div>
                </div>
            )}
        </>
    );
}

const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },

    modal: {
        position: 'relative',
        width: '340px',
        height: '320px',
        backgroundColor: '#F5F5F5',
        borderRadius: '10px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },

    closeButton: {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        outline: 'none',
        position: 'absolute', 
        top: '15px',          
        right: '10px'
    },

    closeIcon: {
        width: '20px',  
        height: '20px',
        color: '#E1A421',
    },

    title: {
        width: '100%',
        textAlign: 'center',
        fontSize: '18px',
        marginLeft: '10px'
    },

    inputContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        margin: '0 auto',
        height: '120px',
        backgroundColor: '#F5F5F5',
    },
    
    currencySymbol: {
        color: '#22C55E',
        fontSize: '54px',
        marginRight: '10px',
        marginLeft: '12px'
    },

    valueInput: {
        flex: 1,
        maxWidth: 'calc(100% - 60px)', 
        background: 'transparent',
        border: 'none',
        outline: 'none',
        fontSize: '54px',
        color: '#22C55E',
        textAlign: 'left',
    },

    button: {
        color: '#3B82F6',
        fontSize: '16px',
        lineHeight: '26px',
        border: '1px solid #3B82F6',
        borderRadius: '4px',
        padding: '10px 15px',
        cursor: 'pointer',
        alignSelf: 'center'
    },
}

export default ModalNextGoPay;
