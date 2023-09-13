import React, { useState, useRef, useEffect } from "react";
import {
   Container,
   Header,
   MainContainer,
   LeftColumn,
   RightColumn,
   DropdownMenuStyled,
   DropdownMenuItem,
   MenuButton,
   MensagensTitle,
   CriarMensagemTitle,
   ScriptsTitle,
   InputTitle,
   TextInput,
   TextareaInput,
   SaveButton,
   AudioTitle,
   AudioInput,
   MicContainer,
   AudioSaveButton,
   AudioControlContainer,
   DeleteIcon,
   PlayIcon,
   ImageInputTitle,
   ImageTextInput,
   ImageContainer,
   DisplayedImage,
   UploadIconContainer,
   DeleteIconImg,
   ImageHeader,
   ImageDisplay,
   MessageListTitle,
   MessageContainer,
   MessageHeader,
   TextContent,
   AudioContent,
   ImageContent,
   MessagesWrapper,
   Overlay, 
   ModalContainer, 
   ModalHeader,
   HighlightedText, 
   CloseButton, 
   CloseIcon,
   ButtonModal,
   ContainerInicial,
   ContainerSecudario,
   LeftSubColumn,
   RightSubColumn,
   ExampleText,
   TitleScript,
   InputScriptTitle,
   SelecionarSequencia,
   SequenciaTitle,
   TitlePrimeiraMensagem,
   TitleSegundaMensagem,
   InputPrimeiraMensagem,
   InputSegundaMensagem,
   MainText,
   MessageTitle,
   UploadBox,
   UploadText,
   SelectedImageBox,
   ImageName,
   DeleteIconImg2,
   RecordingContainer,
   RecordingText,
   IconContainer,
   WavesVisual,
   WavesIcon,
   ScriptsWrapper,
   ScriptContainer,
   ScriptHeader,
   SaveButtonScript, 
   CheckboxWrapper,
   HiddenCheckbox,
   StyledCheckbox,  
   
} from "./style";

import IconSeta from "../../assets/IconDefiirMensagemSeta.svg";
import IconAlert from "../../assets/IconeAlertDefinirMenssagem.svg";
import IconLixeira from "../../assets/IconLixeira.svg";
import IconPlay from "../../assets/play-pause.svg";



import IconSendImage from '../../assets/IconSendImage.svg';
import IconImagemSelecionada from '../../assets/IconeImagemSelecionada.svg';
import IconLixeiraBlack from '../../assets/IconLixeiraBlack.svg';
import IconMic from '../../assets/IconMic.svg';
import IconLixeiraTransparente from '../../assets/IconLixeiraTransparente.svg';
import IconPause from '../../assets/IconPauseAudio.svg'; 
import IconPlayAudio from '../../assets/IconPlayAudio.svg';
import IconOndasSonoras from '../../assets/IconOndasSonoras.svg';



import IconUpImg from "../../assets/IconUpImg.svg";
import IconEdit from "../../assets/IconEdit.svg";
import IconFav from "../../assets/IconFav.svg";
import IconClose from '../../assets/IconClose.svg'
import HeaderComponent from '../../components/Header';
import Swal from 'sweetalert2';




const TextMessage = ({ message }) => (
   <div>
      <h3>{message.title}</h3>
      <p>{message.content}</p>
   </div>
);

const AudioMessage = ({ message }) => (
   <div>
      <h3>{message.title}</h3>
      <audio controls src={URL.createObjectURL(message.content)}></audio>
   </div>
);

const ImageMessage = ({ message }) => (
   <div>
      <h3>{message.title}</h3>
      <img src={message.content} alt="Saved" style={{ maxWidth: "100%", height: "auto" }} />
   </div>
);


const DefinirMsgPage = () => {
   const [isMenuOpen, setMenuOpen] = useState(false);
   const [selectedOption, setSelectedOption] = useState(null);
   const [tituloMensagem, setTituloMensagem] = useState("");
   const [corpoMensagem, setCorpoMensagem] = useState("");
   const [audioData, setAudioData] = useState(null); 
   const [isRecording, setIsRecording] = useState(false); 
   const [audioDuration, setAudioDuration] = useState(0); 
   const [imageTitle, setImageTitle] = useState("");
   const [audioTitle, setAudioTitle] = useState("");
   const [selectedImage, setSelectedImage] = useState(null);
   const [showUploadIcon, setShowUploadIcon] = useState(true);
   const [savedMessages, setSavedMessages] = useState([]);
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
   const [messageToDelete, setMessageToDelete] = useState(null);
   const [messageToEdit, setMessageToEdit] = useState(null);
   const [inputScriptTitle, setInputScriptTitle] = useState(""); 
   const [inputPrimeiraMensagem, setInputPrimeiraMensagem] = useState(""); 
   const [inputSegundaMensagem, setInputSegundaMensagem] = useState("");
   const [selectedImageName, setSelectedImageName] = useState(null);
   const [currentAudioPosition, setCurrentAudioPosition] = useState(0);
   const [savedScripts, setSavedScripts] = useState([]);


   //CheckBox para selecionar mensagens 
const [selectedMessages, setSelectedMessages] = useState([null, null]);

/*============================================================================================================*/
/*=============================== Menu suspenso para definir as mensagens  ===================================*/
/*============================================================================================================*/
const listaMenuRef = useRef(null);

const closeMenu = () => {
   setMenuOpen(false);
};

const handleMenuToggle = () => {
   setMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
};

// Função para verificar se o clique aconteceu fora do menu
const handleListaMenuClickOutside = (event) => {
   if (listaMenuRef.current && !listaMenuRef.current.contains(event.target)) {
      setTimeout(closeMenu, 50);
   }
};


// Função para obter a opção selecioanda
const handleOptionSelect = (option) => {
   if (selectedOption !== option) {
      setSelectedOption(option);
   }
   setMenuOpen(false);
};


useEffect(() => {
   if (isMenuOpen) {
      document.addEventListener("mouseup", handleListaMenuClickOutside);
   } else {
      document.removeEventListener("mouseup", handleListaMenuClickOutside);
   }

   return () => {
     // Função de limpeza
     document.removeEventListener("mouseup", handleListaMenuClickOutside);
   };

 }, [isMenuOpen]);


 const DropdownMenu = ({ isOpen, onClose }) => {
   if (!isOpen) return null;
   return (
      <DropdownMenuStyled ref={listaMenuRef} isOpen={isOpen}>
         <DropdownMenuItem onClick={() => handleOptionSelect("Mensagem de texto")}> Mensagem de texto </DropdownMenuItem>
         <DropdownMenuItem onClick={() => handleOptionSelect("Mensagem de voz")}> Mensagem de voz </DropdownMenuItem>
         <DropdownMenuItem onClick={() => handleOptionSelect("Imagem")}> Imagem </DropdownMenuItem>
      </DropdownMenuStyled>
   );
};


//Limpando os campos das opções

useEffect(() => {
   // Limpa os campos de Mensagem de Texto
   setTituloMensagem("");
   setCorpoMensagem("");
   
   // Limpa os campos de Mensagem de Voz
   setAudioData(null);
   setAudioDuration(0);
   setAudioTitle("");

   // Limpa os campos de Imagem
   setSelectedImage(null);
   setImageTitle("");
   setSelectedImageName(null);
   setShowUploadIcon(true); // Assumindo que você quer mostrar o ícone de upload novamente

}, [selectedOption]);



/*============================================================================================================*/
/*========================= Menu suspenso do Script (Para selecionar uma mensagem) ===========================*/
/*============================================================================================================*/

const [isMessagesMenuOpen, setMessagesMenuOpen] = useState(false);
const messagesMenuRef = useRef(null);


const handleMessagesMenuToggle = () => {
   setMessagesMenuOpen((prevIsOpen) => !prevIsOpen);
};

const handleMessagesMenuClickOutside = (event) => {
   if (messagesMenuRef.current && !messagesMenuRef.current.contains(event.target)) {
      setMessagesMenuOpen(false);
   }
};

useEffect(() => {
   if (isMessagesMenuOpen) {
      document.addEventListener("mouseup", handleMessagesMenuClickOutside);
   } else {
      document.removeEventListener("mouseup", handleMessagesMenuClickOutside);
   }

   return () => {
      // Função de limpeza
      document.removeEventListener("mouseup", handleMessagesMenuClickOutside);
   };

}, [isMessagesMenuOpen]);




const MessagesDropdownMenu = ({ isOpen, onClose, messages, onSelectMessage }) => {
   if (!isOpen) return null;

   const handleCheckboxChange = (index, message) => {
      const newSelectedMessages = [...selectedMessages];
      
      if (selectedMessages.includes(message)) { // Se a mensagem já foi selecionada
          const messageIndex = selectedMessages.findIndex((msg) => msg.title === message.title);
          newSelectedMessages.splice(messageIndex, 1); // Remove a mensagem do array
      } else {
          newSelectedMessages[index] = message; // Adiciona a mensagem ao array
      }
      
      setSelectedMessages(newSelectedMessages);
  };



const CustomCheckbox = ({ checked, onChange }) => (
   <CheckboxWrapper onClick={onChange}>
     <HiddenCheckbox checked={checked} onChange={onChange} />
     <StyledCheckbox checked={checked} />
   </CheckboxWrapper>
);
  

   return (
      <DropdownMenuStyled ref={messagesMenuRef} isOpen={isOpen} isMessagesMenu={true}>
         {messages.map((message, index) => (
            <DropdownMenuItem key={index} onClick={() => onSelectMessage(message)}>
               <CustomCheckbox 
                  checked={selectedMessages.includes(message)}
                  onChange={() => handleCheckboxChange(index, message)}
               />
               {message.title}
            </DropdownMenuItem>
         ))}
      </DropdownMenuStyled>
   );
};



/*============================================================================================================*/
/*======================== Funcionalidades para os icones da lista de mensagens  =============================*/
/*============================================================================================================*/

// Definição do Alert para verificações adicionais
const Toast = Swal.mixin({
   toast: true,
   position: 'top-end',
   showConfirmButton: false,
   timer: 3000,
   timerProgressBar: true,
   didOpen: (toast) => {
     toast.addEventListener('mouseenter', Swal.stopTimer);
     toast.addEventListener('mouseleave', Swal.resumeTimer);
   }
 });


// Função para salvar os dados da opção 'Mensagem de texto'
const handleSave = () => {
   // Verificação do título
   if (!tituloMensagem.trim()) {
      Toast.fire({
         icon: 'error',
         title: "Por favor, defina um título antes de salvar"
       });
      return;
   }

   // Verificação do corpo da mensagem
   if (!corpoMensagem.trim()) {
      Toast.fire({
         icon: 'error',
         title: "Defina uma mensagem antes de salvar"
       });
      return;
   }

   const newMessage = {
      type: "text",
      title: tituloMensagem,
      content: corpoMensagem,
   };

   if (messageToEdit) {
      const updatedMessages = savedMessages.filter(m => m !== messageToEdit);
      setSavedMessages([...updatedMessages, newMessage]);
      setMessageToEdit(null);

   } else {
      setSavedMessages([...savedMessages, newMessage]);
   }

   setTituloMensagem(""); 
   setCorpoMensagem(""); 
   setSelectedOption(null);
};


// Função para salvar os dados da opção 'Mensagem de Voz'
const saveAudio = () => {
   
   // Verificar se o título foi definido
   if (!audioTitle || audioTitle.trim() === "") {
      Toast.fire({
         icon: 'error',
         title: "Por favor, defina um título antes de salvar"
       });
      return;
   }

   // Verificar se algum áudio foi gravado
   if (!audioData) {
      Toast.fire({
         icon: 'error',
         title: "Por favor, encerre a gravação antes de salvar"
       });
      return;
   }

   const newMessage = {
      type: "audio",
      title: audioTitle,
      content: audioData,
   };

   if (messageToEdit) {
      const updatedMessages = savedMessages.filter(m => m !== messageToEdit);
      setSavedMessages([...updatedMessages, newMessage]);
      setMessageToEdit(null);
   } else {
      setSavedMessages([...savedMessages, newMessage]);
   }

   setAudioData(null);
   setAudioDuration(0);
   setAudioTitle("");
   setSelectedOption(null);
}



// Função para salvar os dados da opção 'Imagem'
const handleSaveImage = () => {
   // Verificação do título
   if (!imageTitle.trim()) {
      Toast.fire({
         icon: 'error',
         title: "Por favor, defina um título antes de salvar"
       });
      return; 
   }

   const newMessage = {
      type: "image",
      title: imageTitle,
      content: selectedImage,
   };

   if (messageToEdit) {
      const updatedMessages = savedMessages.filter(m => m !== messageToEdit);
      setSavedMessages([...updatedMessages, newMessage]);
      setMessageToEdit(null);
   } else {
      setSavedMessages([...savedMessages, newMessage]);
   }

   setSelectedImage(null);
   setImageTitle("");
   setSelectedOption(null);
};




// Editar mensagem 
const openEditor = (event, message) => {
   event.stopPropagation();

   // Setar o tipo da mensagem para exibir os controles correspondentes
   setSelectedOption(message.type);

   // Guardar a mensagem atual para futura edição
   setMessageToEdit(message);

   // Carregar os detalhes da mensagem nos campos de edição
   if (message.type === "text") {
       setTituloMensagem(message.title);
       setCorpoMensagem(message.content);
   }
   // ... outras condições para diferentes tipos de mensagens
};



/*============================================================================================================*/
/*============================ MOdal para confirmação 'Deletar mensagem' =====================================*/
/*============================================================================================================*/

const openDeleteModal = (message) => {
   setMessageToDelete(message);
   setIsDeleteModalOpen(true);
}

const closeDeleteModal = () => {
   setMessageToDelete(null);
   setIsDeleteModalOpen(false);
}

const handleDeleteMessage = () => {
   setSavedMessages(prevMessages => prevMessages.filter(msg => msg !== messageToDelete));
   setIsDeleteModalOpen(false);
   setMessageToDelete(null);
}


/*============================================================================================================*/
/*============================ Gravação do audio na opção 'Mensagem de voz' ==================================*/
/*============================================================================================================*/
// Opção para gravação de audio
const mediaRecorder = useRef(null);
let recordedChunks = [];
let startedRecordingTime;

const startRecording = async () => {
   try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
         }
      };

      // Este é o intervalo que será usado para atualizar a duração do áudio
      let durationInterval;

      mediaRecorder.current.onstop = () => {
         // Limpe o intervalo para parar de atualizar a duração do áudio
         clearInterval(durationInterval);

         const audioBlob = new Blob(recordedChunks, {
            type: "audio/wav",
         });
         
         setAudioData(audioBlob);

         // Limpar os chunks após a criação do blob
         recordedChunks = [];
      };

      mediaRecorder.current.start();
      startedRecordingTime = Date.now();
      setIsRecording(true);

      // Usamos um setInterval para atualizar o audioDuration a cada segundo
      durationInterval = setInterval(() => {
        setAudioDuration(Date.now() - startedRecordingTime);
      }, 1000);

    } catch (error) {
         if (error.name === "NotAllowedError") {
         // O usuário negou a permissão para o microfone.
         alert("Por favor, permita o acesso ao microfone para continuar.");
      
         } else {
            // Outro erro ocorreu ao tentar acessar o microfone.
            console.error("Ocorreu um erro ao tentar acessar o microfone:", error);
            alert("Ocorreu um erro ao tentar acessar o microfone. Tente novamente mais tarde.");
         }
   }
};

const stopRecording = () => {
   if (mediaRecorder.current) {
      console.log("mediaRecorder.current é válido.");
      mediaRecorder.current.stop();
      setIsRecording(false);

      // Limpar os recursos após parar a gravação
      if (mediaRecorder.current.stream) {
         const tracks = mediaRecorder.current.stream.getTracks();
         tracks.forEach((track) => track.stop());
      }

    } else {
         console.log("mediaRecorder.current não é válido.");
    }
};

const handleMicClick = () => {
   if (isRecording) {
      stopRecording();
   } else {
      startRecording();
   }
};

const playAudio = () => {
   console.log("playAudio começou");
   if (audioData) {
      const audioURL = URL.createObjectURL(audioData);
      const audio = new Audio(audioURL);
      
      audio.addEventListener("timeupdate", () => {
         setCurrentAudioPosition(audio.currentTime * 1000);  // Convertendo para milissegundos
      });

      audio.addEventListener("ended", () => {
         URL.revokeObjectURL(audioURL);
         setCurrentAudioPosition(0); // Resetando a posição quando o áudio terminar
      });

      audio.volume = 1.0;
      audio.play();
   }
};


const deleteAudio = () => {
   setAudioData(null);
   setAudioDuration(0);
};



// Converter o formato da contagem do áudio
const formatDuration = (ms) => {
   const totalSeconds = Math.floor(ms / 1000);
   const minutes = Math.floor(totalSeconds / 60);
   const seconds = totalSeconds % 60;
   return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};



/*============================================================================================================*/
/*======================================= Opção 'Imagem' =====================================================*/
/*============================================================================================================*/
const inputRef = useRef(null);

const handleImageChange = (event) => {
   const file = event.target.files[0];
   if (file) {
      setSelectedImageName(file.name); 

      const reader = new FileReader();
      reader.onloadend = () => {
         setSelectedImage(reader.result);
         setShowUploadIcon(false);
      };
      
      reader.readAsDataURL(file);
   }
};


const handleDeleteImage = () => {
   setSelectedImage(null);
   setSelectedImageName(null);
   setShowUploadIcon(true);
};








/* Salvar Script */

const handleSaveScript = () => {
   // Verificar se todos os campos foram preenchidos
   if (!inputScriptTitle.trim() || !inputPrimeiraMensagem.trim() || !inputSegundaMensagem.trim()) {
      Toast.fire({
         icon: 'error',
         title: "Por favor, preencha todos os campos antes de salvar o script."
       });
      return;
   }

   // Se todos os campos foram preenchidos, criamos o novo script
   const newScript = {
      title: inputScriptTitle,
      firstMessage: selectedMessages[0]?.title || "",
      secondMessage: selectedMessages[1]?.title || "",
   };

   // Adicionamos o novo script à lista de scripts salvos e limpamos os campos de entrada
   setSavedScripts(prevScripts => [...prevScripts, newScript]);
   setInputScriptTitle("");
   setInputPrimeiraMensagem("");
   setInputSegundaMensagem("");
   setSelectedMessages([]); // Limpar os títulos das mensagens selecionadas
};














// Renderização dos componentes 
return (
   <Container>
      <HeaderComponent/>
         <MainContainer>

            <LeftColumn>
               <MensagensTitle>Mensagens</MensagensTitle>
                  <div className="info-message">
                     Crie mensagens de texto, voz ou vídeo e envie para seus clientes com apenas um clique
                  </div>

                  <CriarMensagemTitle>Criar mensagem</CriarMensagemTitle>

                  <MenuButton isMenuOpen={isMenuOpen} onClick={handleMenuToggle}>
                     <span>Selecionar o tipo de mensagem</span>{" "}
                     <img src={IconSeta} alt="Seta" />
                  </MenuButton>
                  
                  <DropdownMenu isOpen={isMenuOpen} onClose={closeMenu} />


                  {selectedOption ? (
                  <>
                     {selectedOption === "Mensagem de texto" && (
                     <>
                        <InputTitle>Título da Mensagem</InputTitle>
                        <TextInput placeholder="Ex: Mensagem 1" value={tituloMensagem} onChange={(e) => setTituloMensagem(e.target.value)} />
                        <InputTitle>Corpo da Mensagem</InputTitle>
                        <TextareaInput placeholder="Digite sua mensagem aqui..." value={corpoMensagem} onChange={(e) => setCorpoMensagem(e.target.value)}/>
                        <SaveButton onClick={handleSave}>SALVAR</SaveButton>
                     </>
                     )}

                     {selectedOption === "Mensagem de voz" && (
                     <>
                        <AudioTitle>Título da Mensagem</AudioTitle>
                        <AudioInput placeholder="Ex: Mensagem 1" value={audioTitle} onChange={(e) => setAudioTitle(e.target.value)}/>

                        <RecordingContainer>
                           {isRecording ? (
                              <>
                                 <RecordingText>{isRecording || !audioData ? formatDuration(audioDuration) : formatDuration(currentAudioPosition)}</RecordingText>
                                 <WavesIcon src={IconOndasSonoras} alt="Ondas Sonoras" />

                                 <IconContainer onClick={handleMicClick}>
                                    <img src={IconPause} alt="Pausar gravação" />
                                 </IconContainer>
                              </>

                              ) : (
                              <>
                                 {audioDuration > 0 ? (
                                    <>
                                       <IconContainer onClick={deleteAudio}>
                                          <img src={IconLixeiraTransparente} alt="Deletar gravação" />
                                       </IconContainer>
                                       
                                       <WavesIcon src={IconOndasSonoras} alt="Ondas Sonoras" />

                                       <IconContainer onClick={playAudio}>
                                          <img src={IconPlayAudio} alt="Play gravação" />
                                       </IconContainer>
                                    </>
                                    ) : (
                                    <>
                                       <RecordingText>Pressione para gravar...</RecordingText>
                                       <IconContainer onClick={handleMicClick}>
                                          <img src={IconMic} alt="Começar gravação" />
                                       </IconContainer>
                                    </>
                                 )}
                              </>
                           )}
                        </RecordingContainer>

                        {audioDuration > 0 && !isRecording && (
                           <AudioSaveButton onClick={saveAudio}>SALVAR</AudioSaveButton>
                        )}
                     </>
                     )}

                     
                     {selectedOption === "Imagem" && (
                     <>
                        <ImageInputTitle>Título da Mensagem</ImageInputTitle>
                        <ImageTextInput placeholder="Ex: Imagem para vendas" value={imageTitle} onChange={(e) => setImageTitle(e.target.value)}/>
                        <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} ref={inputRef} />

                        <UploadBox onClick={() => inputRef.current.click()}>
                           <img src={IconSendImage} alt="Upload" />
                           <UploadText>Clique para selecionar uma imagem</UploadText>
                        </UploadBox>

                        {selectedImage && (
                           <SelectedImageBox>
                              <img src={IconImagemSelecionada} alt="Imagem Selecionada" style={{ marginRight: "10px" }} />
                              <ImageName>{selectedImageName}</ImageName>
                              <DeleteIconImg2 src={IconLixeiraBlack} alt="Deletar" onClick={handleDeleteImage} />
                           </SelectedImageBox>
                        )}

                        {selectedImage && (
                           <SaveButton onClick={handleSaveImage}>SALVAR</SaveButton>
                        )}
                     </>
                     )}
                  
                  </>

               ) : (

                  <>
                     <MessageListTitle>Lista de mensagens</MessageListTitle>

                     <MessagesWrapper> 
                        {savedMessages.map((message, index) => (
                           <MessageContainer key={index}>
                              <MessageHeader>
                                 <h3>{message.title}</h3>
                                 <div>
                                    <img src={IconFav} alt="Favoritar" />
                                    <img src={IconLixeira} alt="Deletar" onClick={() => openDeleteModal(message)} />
                                    <img src={IconEdit} alt="Editar" onClick={(e) => openEditor(e, message)} />
                                 </div>
                              </MessageHeader>
                        
                              {message.type === "text" && <TextContent>{message.content}</TextContent>}
                              {message.type === "audio" && <AudioContent controls src={URL.createObjectURL(message.content)} />}
                              {message.type === "image" && <ImageContent src={message.content} alt="Saved" />}
                           </MessageContainer>
                        ))}
                     </MessagesWrapper>
                  </>
               )}
            </LeftColumn>

            <RightColumn>
               {savedMessages && savedMessages.length ? (
                  <ContainerSecudario> 
                     <LeftSubColumn>
                        <ScriptsTitle>Scripts</ScriptsTitle>

                        <div className="info-message2">
                           Um script é um conjunto de mensagens agrupadas que são enviadas em sequência para seu cliente
                        </div>

                        <TitleScript>Título do Script</TitleScript>
                        <InputScriptTitle placeholder="Digite o título" value={inputScriptTitle} onChange={(e) => setInputScriptTitle(e.target.value)}/>
      
                        <SelecionarSequencia>Selecione a sequencia de envio</SelecionarSequencia>

                        <MenuButton isMenuOpen={isMessagesMenuOpen} onClick={handleMessagesMenuToggle}>
                           <span>Selecionar Mensagem</span>
                           <img src={IconSeta} alt="Seta" />
                        </MenuButton>

                        <MessagesDropdownMenu 
                           isOpen={isMessagesMenuOpen} 
                           onClose={() => setMessagesMenuOpen(false)} 
                           messages={savedMessages}
                           onSelectMessage={(selectedMessage) => {
                              setMessagesMenuOpen(false);
                           }}
                        />

                        <SaveButtonScript onClick={handleSaveScript}>SALVAR </SaveButtonScript>
                     </LeftSubColumn>      


                     <RightSubColumn>
                        <SequenciaTitle>Sequencia de mensagens</SequenciaTitle>
                     
                        <TitlePrimeiraMensagem>Primeira mensagem</TitlePrimeiraMensagem>
                     
                        <InputPrimeiraMensagem 
                           placeholder="Ex: Tempo de espera em segundos" 
                           value={inputPrimeiraMensagem}
                           onChange={(e) => setInputPrimeiraMensagem(e.target.value)} 
                        />
                        <ExampleText>Exemplo: Aguardar 5 segundos</ExampleText>
                        <MainText>Para enviar mensagem: <MessageTitle>{selectedMessages[0] ? selectedMessages[0].title : "'Titulo da mensagem'"}</MessageTitle></MainText>


                        <TitleSegundaMensagem>Segunda Mensagem</TitleSegundaMensagem>
                           <InputSegundaMensagem 
                              placeholder="Ex: Tempo de espera em segundos" 
                              value={inputSegundaMensagem} 
                              onChange={(e) => setInputSegundaMensagem(e.target.value)} 
                           />
                        <ExampleText>Exemplo: Aguardar 5 segundos</ExampleText>
                        <MainText>Para enviar mensagem: <MessageTitle>{selectedMessages[1] ? selectedMessages[1].title : "'Titulo da mensagem'"}</MessageTitle></MainText>

                     </RightSubColumn>  
                  </ContainerSecudario>
               ) : (
            
               <>
                  <ContainerInicial>
                     <ScriptsTitle>Scripts</ScriptsTitle>
                     <div className="info-message">
                        Um script é um conjunto de mensagens agrupadas que são enviadas em sequência para seu cliente
                     </div>
                        
                     <div className="alert-message">
                        <img src={IconAlert} alt="Alerta" />
                        Para criar um script você deve ter mensagens salvas
                     </div>
                  </ContainerInicial>
               </>
               )}

               {savedScripts && savedScripts.length > 0 && (
                  <ScriptsWrapper>
                     {savedScripts.map((script, index) => (
                        <ScriptContainer key={index}>
                           <ScriptHeader>
                              <h3>{script.title}</h3>
                                 <div>
                                    <img src={IconFav} alt="Favoritar" />
                                    <img src={IconLixeira} alt="Deletar" onClick={() => openDeleteScriptModal(script)} />
                                    <img src={IconEdit} alt="Editar" onClick={(e) => openScriptEditor(e, script)} />
                                 </div>
                           </ScriptHeader>
                           <div>
                              <p>{script.firstMessage}</p>
                              <p>{script.secondMessage}</p>
                           </div>
                        </ScriptContainer>
                     ))}
                  </ScriptsWrapper>
               )}
            </RightColumn>
         </MainContainer>

         {isDeleteModalOpen && (
            <Overlay>
               <ModalContainer>
                  <ModalHeader>
                     <p>Deseja excluir a mensagem: <HighlightedText>{messageToDelete?.title}</HighlightedText>?</p>
                     <CloseButton onClick={closeDeleteModal}>
                        <CloseIcon src={IconClose} alt="Fechar" />
                     </CloseButton>
                  </ModalHeader>
                  <div>
                     <ButtonModal onClick={closeDeleteModal}>Cancelar</ButtonModal>
                     <ButtonModal onClick={handleDeleteMessage}>Confirmar</ButtonModal>
                  </div>
               </ModalContainer>
            </Overlay>
         )}
   </Container>
   );
};

export default DefinirMsgPage;