import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import PropTypes from "prop-types";
import IconClose from '../../../assets/IconClose.svg';
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    paper: {
        backgroundColor: "#E9E9E9",
        border: 0,
        outline: 0,
        width: 450,
        "@media (max-width:768px)": {
            maxWidth: "90%",
        },
        boxShadow: theme.shadows[5],
        padding: 0,
        borderRadius: 12
    },
}));


const ModalContainer = styled.div`
    position: relative;
    width: 450px;
    height: 180px;
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
    font-size: 20px;
    color: #333;
    margin-top: 20px;
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

const ModalBody = styled.p`
  font-size: 16px;
  width: 80%;   
  margin: 15px 0;
  color: #555;
  display: flex;
  justify-content: center;
`;

const ModalActions = styled.div`
  display: flex;
  width: 75%;
  justify-content: space-around;
  gap: 10px;
  margin-bottom: 15px;
`;


function ModalMenu({open, handleClose}) {
    const classes = useStyles();

    const onClose = () => {
        handleClose();
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={onClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <ModalContainer className={classes.paper}>
                        
                        <ModalHeader>
                            Esqueceu sua senha?
                        </ModalHeader>

                        <CloseButton onClick={handleClose}>
                            <CloseIcon src={IconClose} alt="Fechar" />
                        </CloseButton>

                        <ModalBody>
                            Podemos ajudar a recuperar seu acesso...
                        </ModalBody>

                        <ModalActions>

                            <ButtonModal onClick={handleClose}>
                                Fechar
                            </ButtonModal>

                            <ButtonModal >
                                Recuperar acesso
                            </ButtonModal>

                        </ModalActions>
                    </ModalContainer>
                </Fade>
            </Modal>
        </div>
    );
}

ModalMenu.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default ModalMenu;
