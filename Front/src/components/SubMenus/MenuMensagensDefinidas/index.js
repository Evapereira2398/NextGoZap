import React, { useRef, useEffect } from 'react';
import './style.css';

const MessageOptionsMenu = ({ isOpen, onClose, anchorRef }) => {
    const menuRef = useRef(null);

    // Função para verificar se o clique aconteceu fora do menu
    const handleClickOutside = event => {
        if (
            menuRef.current && 
            !menuRef.current.contains(event.target) && 
            anchorRef.current && 
            !anchorRef.current.contains(event.target)
        ) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const menuOptions = [
        "Mensagem 1",
        "Mensagem 2",
        "Audio 1",
        "Imagem 1.jpg",
        "Imagem 1.jpg",
        "Imagem 1.jpg",
        "Imagem 1.jpg",
        "Imagem 1.jpg",
        "Imagem 1.jpg",
    ];

    const menuStyles = {
        menu: {
            backgroundColor: '#030712',
            borderRadius: '8px',
            position: 'absolute',
            bottom: '70px',
            width: '180px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            overflowY: 'auto',
            maxHeight: '220px'
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
        }
    };

    return (
        <div style={menuStyles.menu} ref={menuRef}>
            <h4 style={menuStyles.title}>Mensagens definidas</h4>
            <div className="message-menu-scroll-container" style={{ maxHeight: '180px', overflowY: 'auto', paddingRight: '5px' }}>
                {menuOptions.map(option => (
                    <div style={menuStyles.item} key={option} onClick={onClose}>
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MessageOptionsMenu;
