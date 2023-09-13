import React, { useState } from 'react';
import IconFinalizar from '../../../assets/IconFinalizar.svg';
import { X } from "react-feather";

const FinalizarAtendimentoModal = ({ onFinalizar, onArchiveChat }) => {
    const [isFinalizarModalOpen, setFinalizarModalOpen] = useState(false);

    const openFinalizarModal = () => {
        setFinalizarModalOpen(true);
    }

    const closeFinalizarModal = () => {
        setFinalizarModalOpen(false);
    }

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            closeFinalizarModal();
        }
    };


    return (
        <>
            <button id="finalizar" onClick={openFinalizarModal}>
                <img src={IconFinalizar} alt={"IconFinalizar"} className="icon" />
                <span className="text">Finalizar</span>
            </button>
            {isFinalizarModalOpen && (
                <div style={finalizarModalStyles.overlay} onClick={handleOverlayClick}>
                    <div style={finalizarModalStyles.modal}>
                        <div style={finalizarModalStyles.header}>
                            <button style={finalizarModalStyles.closeButton} onClick={closeFinalizarModal}>
                                <X style={finalizarModalStyles.closeIcon}/>
                            </button>
                        </div>
                    
                        <div style={finalizarContentStyles.container}>
                            <h3 style={finalizarContentStyles.mainTitle}>
                                Você deseja finalizar este atendimento?
                            </h3>
                            <p style={finalizarContentStyles.description}>
                                A conversa será movida para aba 
                                de conversas arquivadas
                            </p>
                            <button style={finalizarContentStyles.button} onClick={onArchiveChat}>
                                FINALIZAR ATENDIMENTO
                            </button>


                        </div>
                    </div>
                </div>
            )}
        </>
    );
}


// Estilos específicos para o modal "Finalizar"
const finalizarModalStyles = {
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
        width: '320px',
        height: '280px',
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
        width: '100%',
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
        color: '#EF4444',
    }
}

// Estilos específicos para o conteúdo do modal "Finalizar"
const finalizarContentStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
    },

    mainTitle: {
        color: '#030712',
        width: '100%',
        textAlign: 'center',
        fontSize: '16px',
        fontWeight: '600',
        maxWidth: '85%',
        margin: '10px 0',
    },

    description: {
        color: '#030712',
        textAlign: 'center',
        fontSize: '15px',
        fontWeight: '400',
        lineHeight: '24px',
        margin: '10px 0',
        marginTop: '-15px'
    },

    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '252px',
        height: '42px',
        padding: '8px 32px',
        background: '#EAB308',
        color: '#F5F5F5',
        fontSize: '14px',
        fontWeight: '600',
        gap: '10px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '4px'
    }
};

export default FinalizarAtendimentoModal; 