import React, { useState, useRef, useEffect, useContext } from 'react';
import { ChevronDown } from "react-feather";
import { KanbanContext } from '../../../components/Kanban/KanbanContext';
import { MenuContainer, StyledButton, StyledMenu, StyledMenuItem } from './style';

const ButtonListaMenu = ({ iconLista }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const listaMenuRef = useRef(null);
    const { kanbanData: data } = useContext(KanbanContext);

    const closeListaMenu = () => {
        setTimeout(() => {
            setMenuOpen(false);
        }, 100);
    };
    

    const handleListaMenuClickOutside = event => {
        if (listaMenuRef.current && !listaMenuRef.current.contains(event.target)) {
            closeListaMenu();
        }
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleListaMenuClickOutside);
        } else {
            document.removeEventListener('mousedown', handleListaMenuClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleListaMenuClickOutside);
        };
    }, [isMenuOpen]);



    return (
        <MenuContainer>
            <StyledButton 
                id="lista" 
                onClick={() => {
                    if(isMenuOpen) {
                        closeListaMenu();
                    } else {
                        setMenuOpen(true);
                    }
                }} 
                isMenuOpen={isMenuOpen}
            >
            <img 
                src={iconLista} 
                alt={"IconLista"} 
                style={{ width: '20px', height: '20px' }}
            />
            Lista
            <ChevronDown/>
        </StyledButton>
        {isMenuOpen && (
            <StyledMenu ref={listaMenuRef}>
                {data.map(column => (
                    <StyledMenuItem key={column.title} onClick={closeListaMenu}>
                        {column.title}
                    </StyledMenuItem>
                ))}
            </StyledMenu>
        )}
    </MenuContainer>
);
};

export default ButtonListaMenu;
