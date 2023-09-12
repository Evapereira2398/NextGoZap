import React from 'react';
import styled from 'styled-components';

import IconClose from '../../../assets/IconClose.svg';

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    position: relative;
    width: auto;
    height: 150px;
    gap: 20px;
    background-color: #F5F5F5;
    border-radius: 10px;
    padding: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    animation: fadeIn 0.3s;

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

const ModalHeader = styled.div`
    font-size: 1.5rem;
    color: #333;
`;

const CloseButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    outline: none;
    position: absolute; 
    top: 15px;          
    right: 10px;
`;

const ColumnName = styled.span`
    color: #e1a421;
    font-weight: bold;
`;

const CloseIcon = styled.img`
    width: 13px;
    height: 13px;
`;

const ButtonModal = styled.button`
    border: 1px solid #737373;
    color: #030712;
    font-size: 17px;
    font-weight: 500;
    padding: 10px 20px;
    margin: 0 10px; 
    cursor: pointer;
    background: transparent;
    transition: background-color 0.3s, color 0.3s;
    border-radius: 8px;

    &:hover {
        background-color: #EAB308;
        color: #ffffff;
    }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const DeleteColumnModal = ({ isOpen, onClose, columnName, onConfirm }) => {
  if (!isOpen) return null;

  return (
        <Overlay onClick={onClose}>
        <ModalContainer onClick={e => e.stopPropagation()}>
            <ModalHeader>
            <p>Deseja remover a coluna: <ColumnName>{columnName}</ColumnName>?</p>
                <CloseButton onClick={onClose}>
                    <CloseIcon src={IconClose} alt="Fechar" />
                </CloseButton>
            </ModalHeader>
            <ModalActions>
                <ButtonModal className="cancel" onClick={onClose}>Cancelar</ButtonModal>
                <ButtonModal className="confirm" onClick={onConfirm}>Remover coluna</ButtonModal>
            </ModalActions>
        </ModalContainer>
    </Overlay>
  );
};

export default DeleteColumnModal;
