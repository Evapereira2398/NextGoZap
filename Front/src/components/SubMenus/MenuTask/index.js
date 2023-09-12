import React from 'react';
import styled from 'styled-components';

const Menu = styled.div`
    position: absolute;
    width: 90px;
    border: 1px solid #ccc;
    background: white;
    z-index: 10;
    margin-left: -35px;
    margin-top: -100px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
    border-radius: 5px; 
    display: flex;
    justify-content: center;
`;

const ColorSquare = styled.div`
    width: 15px;
    height: 15px;
    background-color: ${props => props.color};
    cursor: pointer;
    margin: 3px 3px;
    transition: opacity 0.3s;  

    &:hover {
        opacity: 0.8;
    }

    &:active {
        transform: scale(0.95); 
    }
`;


const ColorPickerMenu = ({ onSelectColor }) => (
    <Menu>
        <ColorSquare color="blue" onClick={() => onSelectColor('blue')} />
        <ColorSquare color="green" onClick={() => onSelectColor('green')} />
        <ColorSquare color="orange" onClick={() => onSelectColor('orange')} />
        <ColorSquare color="red" onClick={() => onSelectColor('red')} />
    </Menu>
);

export default ColorPickerMenu;
