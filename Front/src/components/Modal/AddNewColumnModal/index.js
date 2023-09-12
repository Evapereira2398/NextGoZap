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
    width: 450px;
    height: 200px;
    background-color: #F5F5F5;
    border-radius: 10px;
    padding: 20px;
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
    opacity: ${props => props.disabled ? '0.5' : '1'};
    pointer-events: ${props => props.disabled ? 'none' : 'auto'};

    &:hover {
    background-color: #EAB308;
    color: #ffffff;
    }
`;

const ModalInput = styled.input`
  border-radius: 8px;
  border: 1px solid #737373;
  padding: 10px 15px;
  width: 100%;
  outline: none;
  margin-bottom: 5px;
  border: ${props => props.hasError ? '1px solid red' : '1px solid #737373'};
`;

const ModalBody = styled.p`
  font-size: 1rem;
  width: 80%;   
  margin: 15px 0;
  color: #555;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const AddNewColumnModal = ({ isOpen, onClose, columnName, onConfirm, onChange, duplicateColumnNameError, setDuplicateColumnNameError}) => {
  if (!isOpen) return null;

  return (
    <Overlay 
        onClick={() => {
            setDuplicateColumnNameError(false);
            onClose();
        }}
    >
        <ModalContainer onClick={e => e.stopPropagation()}>
            <ModalHeader>
                <p>Adicione uma nova coluna</p>
                <CloseButton onClick={onClose}>
                    <CloseIcon src={IconClose} alt="Fechar" />
                </CloseButton>
            </ModalHeader>
            <ModalBody>

            <ModalInput 
                type="text" 
                value={columnName} 
                onChange={onChange} 
                placeholder="Nome da coluna"
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        onConfirm();
                    }
                }}
                hasError={duplicateColumnNameError}
                autoFocus
            />
            {duplicateColumnNameError && <p style={{ color: 'red', fontSize: '13px'}}>O nome <b>{columnName}</b> já foi definido para outra coluna</p>}
            </ModalBody>
            <ModalActions>
                <ButtonModal className="cancel" onClick={onClose}>Cancelar</ButtonModal>
                <ButtonModal className="confirm" onClick={onConfirm} disabled={duplicateColumnNameError}>Criar coluna</ButtonModal>
            </ModalActions>
        </ModalContainer>
    </Overlay>
  );
};

export default AddNewColumnModal;
