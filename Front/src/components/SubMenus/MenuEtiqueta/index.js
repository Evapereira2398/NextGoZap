import React, { useState, useEffect, useRef } from 'react';
import { Tag, ChevronDown } from "react-feather";

const ButtonEtiquetaMenu = () => {
    const [isEtiquetaMenuOpen, setEtiquetaMenuOpen] = useState(false);
    const [hoveredColor, setHoveredColor] = useState(null);
    const menuRef = useRef(null);

    const closeMenu = () => {
        setEtiquetaMenuOpen(false);
    };

    const handleClickOutside = event => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            closeMenu();
        }
    };

    useEffect(() => {
        if (isEtiquetaMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => { 
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEtiquetaMenuOpen]);

    const etiquetaContainerStyles = {
        position: 'relative',
        display: 'inline-block',
        zIndex: '10'
    };

    const etiquetaStyles = {
        menu: {
            border: '1px solid #969696',
            borderTop: 'none',
            borderRadius: '0 0 8px 8px',
            width: '120px',
            position: 'absolute',
            top: '20',   
            backgroundColor: '#fff'
        },
        item: (color) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px',
            cursor: 'pointer',
            backgroundColor: hoveredColor === color ? color : 'transparent',
            color: hoveredColor === color ? '#fff' : 'inherit',
            borderRadius: hoveredColor === color ? '8px' : '0',
        })
    };
    
    const etiquetaButtonStyles = {
        borderBottom: isEtiquetaMenuOpen ? 'none' : '1px solid #969696',
        borderRadius: isEtiquetaMenuOpen ? '8px 8px 0 0' : '8px',
    };

    return (
        <div style={etiquetaContainerStyles}>
            <button id="etiqueta" onClick={() => setEtiquetaMenuOpen(!isEtiquetaMenuOpen)} style={etiquetaButtonStyles}> 
                <Tag/> 
                Etiqueta        
                <ChevronDown/> 
            </button>
            {isEtiquetaMenuOpen && (
                <div style={etiquetaStyles.menu} ref={menuRef}>
                    <div style={etiquetaStyles.item('blue')} onMouseEnter={() => setHoveredColor('blue')} onMouseLeave={() => setHoveredColor(null)} onClick={closeMenu}>
                        Azul
                    </div>
                    <div style={etiquetaStyles.item('green')} onMouseEnter={() => setHoveredColor('green')} onMouseLeave={() => setHoveredColor(null)} onClick={closeMenu}>
                        Verde
                    </div>
                    <div style={etiquetaStyles.item('red')} onMouseEnter={() => setHoveredColor('red')} onMouseLeave={() => setHoveredColor(null)} onClick={closeMenu}>
                        Vermelho
                    </div>
                    <div style={etiquetaStyles.item('orange')} onMouseEnter={() => setHoveredColor('orange')} onMouseLeave={() => setHoveredColor(null)} onClick={closeMenu}>
                        Laranja
                    </div>
                </div>
            )}
        </div>
    );
};

export default ButtonEtiquetaMenu;
