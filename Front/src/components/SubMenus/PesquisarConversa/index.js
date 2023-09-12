import React, { useState } from 'react';

const SearchModal = ({ isSearchOpen, closeSearchModal }) => {

    if (!isSearchOpen) return null;

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            closeSearchModal();
        }
    };

    return (
        <div style={searchModalStyles.overlay} onClick={handleOverlayClick}>
            <div style={{
                ...searchModalStyles.modal,
                transform: isSearchOpen ? 'translateX(0%)' : 'translateX(100%)'
            }}>
                <div style={searchModalStyles.header}>
                    <button style={searchModalStyles.closeButton} onClick={closeSearchModal}>
                        X
                    </button>
                    <h3 style={searchModalStyles.title}>Pesquisar mensagens</h3>
                </div>
                <input style={searchModalStyles.input} type="text" placeholder="Pesquisar na conversa..." />
                <p style={searchModalStyles.description}>Pesquisar mensagens com Gustavo Gomes</p>
            </div>
        </div>
    );
}

const searchModalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        zIndex: '1000',
    },

    modal: {
        position: 'relative',
        width: '400px',
        height: '100%',
        backgroundColor: 'rgba(11, 11, 11, 0.95)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        transition: 'transform 0.8s ease-in-out',
        marginTop: '140px',
    },

    header: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        marginBottom: '30px'  
    },

    title: {
        marginLeft: '15px',
        color: '#F5F5F5',
        fontSize: '16px',
        fontWeight: '500',
        marginBottom: 0  ,
        whiteSpace: 'nowrap'
    },

    closeButton: {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '5px',
        color: 'white',
        fontSize: '15px'
    },

    description: {
        marginTop: '10px',
        color: 'rgba(240, 240, 240, 0.50)',
        fontSize: '14px',
        fontWeight: '400',
    },

    input: {
        width: '100%',
        padding: '10px',
        backgroundColor: 'rgba(240, 240, 240, 0.20)',
        border: 'none',
        borderRadius: '8px',
        marginTop: '20px',
        marginBottom: '20px',
        color: 'white',
        marginTop: 0,  
        marginBottom: '30px'
    }
};

export default SearchModal;
