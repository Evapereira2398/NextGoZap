import React, { useRef, useEffect } from 'react';

const NoteOptionsMenu = ({ isOpen, onClose, anchorRef }) => {
    const menuRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }

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

    const menuStyles = {
        menu: {
            backgroundColor: '#030712',
            borderRadius: '8px',
            position: 'absolute',
            bottom: '70px',
            width: '180px',
            height: '220px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
        },
        title: {
            color: '#F5F5F5',
            fontSize: '14px',
            fontWeight: '500',
            marginBottom: '10px',
            borderBottom: '1px solid rgba(240, 240, 240, 0.3)'
        },
        input: {
            width: '100%',
            height: 'calc(100% - 40px)',
            border: 'none',
            outline: 'none',
            color: '#F5F5F5',
            backgroundColor: 'transparent',
            fontSize: '14px',
            padding: '5px 0',
            overflowY: 'auto',
            resize: 'none',
            whiteSpace: 'pre-wrap',
        }
    };

    return (
        <div style={menuStyles.menu} ref={menuRef}>
            <h4 style={menuStyles.title}>Adicionar nota</h4>
            <textarea 
                ref={inputRef} 
                style={menuStyles.input} 
                placeholder="Digite sua nota aqui..."
            />
        </div>
    );
}

export default NoteOptionsMenu;
