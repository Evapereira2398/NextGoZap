import React, { useRef, useEffect, useState } from 'react';

const MoreOptionsMenu = ({ isOpen, onClose }) => {
    const [hoveredItem, setHoveredItem] = useState(null);

    const moreMenuRef = useRef(null);

    // Função para verificar se o clique aconteceu fora do menu
    const handleClickOutside = event => {
        if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
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
        "Transferir", 
        "Dados do contato", 
        "Selecionar mensagens", 
        "Fechar conversa",
        "Silenciar notificações",
        "Mensagens temporárias",
        "Limpar mensagens",
        "Apagar conversa",
        "Denunciar",
        "Bloquear"
    ];

    const menuStyles = {
        menu: {
            backgroundColor: '#030712',
            borderRadius: '8px',
            position: 'absolute',
            top: '50px',
            left: '81%',
            width: '200px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            zIndex: '10',
        },
        item: (isHovered) => ({
            padding: '10px 15px',
            cursor: 'pointer',
            color: '#F5F5F5',
            fontSize: '14px',
            fontWeight: '400',
            backgroundColor: isHovered ? 'rgba(176, 176, 176, 0.6)' : 'transparent',
        })
    };

    return (
        <div style={menuStyles.menu} ref={moreMenuRef}>
            {menuOptions.map(option => (
                <div 
                style={menuStyles.item(option === hoveredItem)}
                key={option}
                onMouseEnter={() => setHoveredItem(option)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={onClose}
            >
                {option}
            </div>
            ))}
        </div>
    );
}

export default MoreOptionsMenu;
