import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

export const Header = styled.header`
    background-color: black;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    padding: 15px; 
    box-sizing: border-box;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;

    .icon-box {
        margin-right: 8px;

            img {
                width: 25px;
                height: 25px;
            }
    }

    #session {
    width: 120px;
    display: flex;
    text-align: start;
    margin-left: 5px;
    flex-direction: column;
    }

    .name, .phone { 
    color: #fff;
    }
`;


export const MainContainer = styled.main`
    display: flex;
    flex-grow: 1; 
    align-items: stretch;
    gap: 20px;
    margin-top: 15px;
    background: #F5F5F5;
    margin-left: 10px;
`;


export const MensagensTitle = styled.h2`
    color: #030712;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
`;

export const CriarMensagemTitle = styled.h2`
    color: #030712;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
`;

export const ScriptsTitle = styled.h2`
    color: #030712;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
`;

export const LeftColumn = styled.div`
    width: 400px;
    flex-shrink: 0; 
    padding: 20px;
    border-radius: 8px;
    background: #FFF;
    color: #030712;
    font-size: 14px;
    font-weight: 400;
    

    .info-message {
        border-radius: 4px;
        background: #FEF3C7;
        padding: 10px;
        margin-bottom: 20px;
        margin-top: 15px;
        color: #451A03;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
    }
`;











export const MessagesWrapper = styled.div`
    max-height: 370px;
    overflow-y: auto;
    padding-bottom: 30px;

    &::-webkit-scrollbar {
        width: 8px; 
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1; 
        border-radius: 10px; 
    }

    &::-webkit-scrollbar-thumb {
        background: rgb(000, 000, 000, 0.4); 
        border-radius: 10px; 
    }
`;








export const MessageListTitle = styled.h2`
  color: #030712;
  font-size: 16px;
  font-weight: 400;
  margin-top: 45px;
  margin-bottom: 20px;
`;

export const MessageContainer = styled.div`
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #737373;
  background: #F5F5F5;
  margin-right: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  h3 {
    margin: 0;
    flex: 1;
  }
  
  img {
    width: 18px;
    height: 18px;
    margin-left: 8px;
    cursor: pointer;
  }
`;



export const TextContent = styled.p`
  margin: 10px 0;
  color: #2c2c2c;
`;

export const AudioContent = styled.audio`
  width: 100%;
`;

export const ImageContent = styled.img`
  max-width: 100%;
  height: auto;
`;




export const ScriptsWrapper = styled.div`
  max-height: 220px;
  margin-bottom: 20px;
  overflow-y: auto;
  margin-right: 10px;
  width: 45%;
  margin-top: -60px;
  padding-bottom: 20px;

    &::-webkit-scrollbar {
        width: 8px; 
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1; 
        border-radius: 10px; 
    }

    &::-webkit-scrollbar-thumb {
        background: rgb(000, 000, 000, 0.4); 
        border-radius: 10px; 
    }

    &:last-child {
        margin-bottom: 0;
    }
`;

export const ScriptContainer = styled.div`
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 6px;
  border: 1px solid #737373;
  background: #EAEAEA;
  margin-right: 8px;
`;

export const ScriptHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;

  h3 {
    margin: 0;
    flex: 1;
  }

  img {
    width: 16px;
    height: 16px;
    margin-left: 7px;
    cursor: pointer;
  }
`;







export const DropdownMenuStyled = styled.div`
    display: ${props => (props.isOpen ? 'block' : 'none')};
    border: 1px solid #969696;
    border-top: none;
    border-radius: 0 0 8px 8px;
    width: 348px;
    position: absolute;
    top: 282px; 
    background-color: #fff;
    z-index: 1;

    ${props => props.isMessagesMenu && `
      /* Adicione estilos específicos para o MessagesDropdownMenu aqui. Por exemplo: */
      top: 385px;
      padding-top: 15px;

      &:hover {
            backgroundColor: #969696;
        }
   `}
`;


export const DropdownMenuItem = styled.div`
    padding: 10px;
    cursor: pointer;
    margin-left: 20px;
    display: flex;
    align-items: center; // Isso irá alinhar verticalmente o checkbox e o título da mensagem
    gap: 15px;

    &:hover {
        backgroundColor: #f2f2f2;
    }
`;

export const MenuButton = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    border: 1px solid #737373;
    background: transparent;
    width: 348px;
    height: 50px;
    margin-top: 10px;
    padding: 0 15px; 
    cursor: pointer;

    // Estilizações para o texto dentro do botão
    span {
        color: #030712;
        font-size: 15px;
        font-weight: 400;
        line-height: 25px; 
        margin-left: 15px; 
    }

    // Estilizações para o ícone
    img {
        width: 20px;
        height: 20px; 
    }

    // Estilizações condicionais para a borda inferior e o raio da borda com base na propriedade "isMenuOpen"
    borderBottom: ${props => (props.isMenuOpen ? 'none' : '1px solid #969696')};
    borderRadius: ${props => (props.isMenuOpen ? '8px 8px 0 0' : '8px')};
`;


export const InputTitle = styled.label`
    color: #030712;
    font-size: 17px;
    font-weight: 500;
    margin-top: 25px;
    display: block;
`;

export const TextInput = styled.input`
    width: 348px;
    height: 50px;
    border-radius: 8px;
    border: 1px solid #737373;
    color: #404040;
    font-size: 15px;
    font-weight: 400;
    margin-top: 10px; 
    padding: 0 10px; 
`;

export const TextareaInput = styled.textarea`
    width: 348px;
    height: 138px;
    border-radius: 8px;
    border: 1px solid #737373;
    color: #404040;
    font-size: 15px;
    font-weight: 400;
    line-height: 25px;
    margin-top: 10px; 
    padding: 10px; 
    resize: none;
`;

export const SaveButton = styled.button`
    display: flex;
    width: 348px;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: #EAB308;
    margin-top: 20px;
    border: none;

    color: #F5F5F5;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;f

    &:hover {
        background-color: #D49A00;
    }
`;


export const SaveButtonScript = styled.button`
    display: flex;
    width: 348px;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: #EAB308;
    margin-top: 30px;
    border: none;

    color: #F5F5F5;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;f

    &:hover {
        background-color: #D49A00;
    }
`;


export const AudioTitle = styled.h2`
    color: #030712;
    font-size: 16px;
    font-weight: 400;
    margin-top: 25px;
    display: block;
`;

export const AudioInput = styled.input`
    width: 348px;
    height: 50px;
    border-radius: 8px;
    border: 1px solid #737373;
    color: #404040;
    font-size: 15px;
    font-weight: 400;
    padding: 0 10px;
    margin-top: 10px; 
`;

export const MicContainer = styled.div`
    width: 60px; 
    height: 60px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); 
    cursor: pointer;
    margin-top: 40px; 
    margin-left: 140px;

    img {
        width: 70%; 
    }
`;


export const AudioControlContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 20px;
    justify-content: center;
`;


export const DeleteIcon = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: 0.3s; 

    &:hover {
        transform: scale(1.2);
    }
`;

export const PlayIcon = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        transform: scale(1.2);
    }
`;




// Estilização da div inicial e de gravação
export const RecordingContainer = styled.div`
    width: 346px;
    height: 56px;
    flex-shrink: 0;
    border-radius: 16px;
    border: 1px solid #737373;
    background: #FFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    margin-top: 30px;
`;

// Estilo para o texto "Pressione para gravar..."
export const RecordingText = styled.span`
    font-size: 16px;
`;

// Estilo para os ícones do microfone, pausa, lixeira e play
export const IconContainer = styled.div`
    cursor: pointer;
`;

// Estilo para o efeito visual de ondas sonoras (Você pode adicionar animações CSS aqui ou usar uma biblioteca externa para criar o efeito desejado)
export const WavesVisual = styled.div`
    flex-grow: 1;
    height: 80%;
    background: linear-gradient(90deg, #EAB308, #FFF);
`;


export const WavesIcon = styled.img`
    width: 60%; // ajuste conforme necessário
    max-width: 200px; // ajuste conforme necessário
    height: auto;
    margin: 0 auto; // isso irá centralizar o SVG
`;












export const AudioSaveButton = styled.button`
    display: flex;
    width: 348px;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: #EAB308;
    color: #F5F5F5;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer; 
    border: none; 
    margin-top: 50px;
`;














export const ImageInputTitle = styled.div`
    color: #030712;
    font-size: 16px;
    font-weight: 400;
    margin-top: 25px;
    display: block;
`;

export const ImageTextInput = styled.input`
    padding-left: 10px; 
    width: 348px;
    height: 50px;
    border-radius: 8px;
    border: 1px solid #737373;
    color: #404040;
    font-size: 15px;
    font-weight: 400;
    padding: 0 10px;
    margin-top: 10px; 
`;



export const UploadBox = styled.div`
    display: flex;
    width: 346px;
    height: 150px;
    margin-top: 20px;
    padding: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 10px;
    border: 3px dashed #EAB308;
    cursor: pointer;

    /* Adicionar hover para melhor feedback ao usuário */
    &:hover {
        background-color: rgba(234, 179, 8, 0.1);
    }
`;

export const UploadText = styled.p`
    color: #030712;
    font-size: 16px;
    font-weight: 400;
`;

export const DeleteIconImg2 = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
`

export const SelectedImageBox = styled.div`
    display: flex;
    width: 346px;
    padding: 10px 16px;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    border-radius: 10px;
    background: #FEF3C7;
`;

export const ImageName = styled.span`
    flex-grow: 1; 
    margin: 0 10px; 
    font-size: 15px;
    font-weight: 400;
    color: var(--gray-950, #030712);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap; 
`;










export const ImageContainer = styled.div`
  position: relative;
  border: 1px solid #EAB308;
  border-radius: 8px;
  padding: 5px;
  margin-top: 20px;
  width: 348px;
`;

export const ImageHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 5px;
  position: relative;
  height: 20px;  
`;

export const ImageDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 40px);  
`;

export const DisplayedImage = styled.img`
  max-width: 100%;
  max-height: 240px;
`;

export const UploadIconContainer = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-left: 150px;
    margin-top: 35px;
    margin-bottom: 40px;
    border: 1px solid red;
    
    img {
        max-width: 100%;
        max-height: 100%;
    }
`;

export const DeleteIconImg = styled.img`
    position: absolute;
    top: 0;  
    right: 0;  
    cursor: pointer;
    width: 20px;
    height: 20px;
`;



export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

export const StyledCheckbox = styled.div`
  width: 16px;
  height: 16px;
  border: 1px solid #737373;
  background-color: ${props => (props.checked ? '#00FF00' : 'white')};
  transition: all 150ms;
`;








export const Overlay = styled.div`
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

export const ModalContainer = styled.div`
    position: relative;
    width: 400px;
    height: 150px;
    background-color: #F5F5F5;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
`;


export const HighlightedText = styled.strong`
    color: #EAB308;
    font-size: 16px;
`;


export const CloseButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    outline: none;
    position: absolute; 
    top: 15px;          
    right: 10px;
`;

export const CloseIcon = styled.img`
    width: 13px;
    height: 13px;
`;

export const ButtonModal = styled.button`
  border: 1px solid #737373;
  color: #030712;
  font-size: 17px;
  font-weight: 500;
  padding: 10px 20px; // Você pode ajustar o padding conforme necessário
  margin: 0 10px; // Para ter espaço entre os botões
  cursor: pointer;
  background: transparent;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 8px;

  &:hover {
    background-color: #EAB308;
    color: #ffffff;
  }
`;



export const RightColumn = styled.div`
    flex-grow: 1;
    padding: 20px;
    border-radius: 8px;
    background: #FFF;
    margin-right: 15px;

    
    .info-message {
        border-radius: 4px;
        background: #FEF3C7;
        margin-bottom: 15px;
        margin-top: 15px;
        display: flex;
        width: 50%;
        padding: 10px 8px;
        align-items: center;
    }

    .alert-message {
        color: #EF4444;
        font-size: 15px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;


export const ContainerInicial = styled.div`
    
`;



export const ContainerSecudario = styled.div`
    display: flex;
    height: 450px;
    gap: 15px;
`;


export const LeftSubColumn = styled.div`
    width: 50%;
    border-radius: 10px;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 20px;
    height: 450px;

    .info-message2 {
        border-radius: 4px;
        background: #FEF3C7;
        margin-bottom: 15px;
        margin-top: 15px;
        display: flex;
        width: 90%;
        padding: 10px 8px;
        align-items: center;
    }
`;

export const RightSubColumn = styled.div`
    width: 50%;
    border-radius: 10px;
    padding-left: 15px;
    height: 450px;
`;

export const TitleScript = styled.div`
    color: #030712;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 15px;
`;

export const InputScriptTitle = styled.input`
    width: 348px;
    height: 50px;
    flex-shrink: 0;
    border-radius: 8px;
    border: 1px solid #737373;
    padding-left: 10px;
    margin-bottom: 25px;

    &::placeholder {
        width: 232px;
        color: #404040;
        font-size: 15px;
        font-weight: 400;
    }
`;


export const InputPrimeiraMensagem = styled(InputScriptTitle)``;

export const InputSegundaMensagem = styled(InputScriptTitle)``;


export const SelecionarSequencia = styled.h2`
    color: #030712;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
`;  

export const ExampleText = styled.div`
    display: block;
    text-align: right;
    margin-top: -23px;
    margin-bottom: 25px;
    margin-right: 112px;
    font-size: 13px; 
    color: #404040;
`;


export const TitlePrimeiraMensagem = styled.h2`
    color: #030712;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 5px;
`;

export const TitleSegundaMensagem = styled.h2`
    color: #030712;
    font-size: 16px;
    font-weight: 400;
    margin-top: 45px;
    margin-bottom: 5px;
`;


export const SequenciaTitle = styled.h2`
    color: #030712;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    margin-bottom: 30px;
    margin-top: -2px;
`;

export const MainText = styled.span`
    color: #030712;
    font-size: 14px;
    font-weight: 400;
    display: block;
    margin-top: 10px;
    margin-bottom: 20px;
`;

export const MessageTitle = styled.span`
    color: #EAB308;
    font-size: 14px;
    font-weight: 700;
    line-height: 26px;
`;


export const DropdownButton = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    width: 348px;
    border-radius: 8px;
    border: 1px solid #737373;
    background: #FFF;
    padding: 10px;
    cursor: pointer;
`;