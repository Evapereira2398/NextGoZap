import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  MainContainer,
  LeftColumn,
  ColumnTitle,
  OptionDiv,
  OptionIcon,
  MiddleColumn,
  RightColumn,
  ColumnHeading,
  OptionTitle,
  OptionButton, 
  RightIcon, 
  InfoText, 
  ShootButton,
  AddAllContainer, 
  CheckBoxIcon,
  AddAllText,
  SearchBar,
  SearchIcon,
  SearchInput,
  SelecionarTudo,
  InfoDiv, 
  InfoTextCSV, 
  ImportButton,
  ContactsContainer,
  ContactDiv,
  ContactCheckbox,
  ContactImage,
  ContactName

} from "./style";
import IconMoreOptions from "../../assets/IconMoreOptions.svg";
import IconSeta from '../../assets/IconDefiirMensagemSeta.svg';
import IconSearch from '../../assets/Iconsearch.svg';
import HeaderComponent from '../../components/Header';
import userImage from '../../assets/LOGO BONECO 1.png';

import Swal from 'sweetalert2';

const optionTitles = [
   "Selecionar por conversas",
   "Selecionar por contatos",
   "Selecionar contatos de grupos",
   "Selecionar por listas do CRM",
   "Selecionar por tags",
   "Selecionar por atendentes",
   "Selecionar por etiquetas (Business)",
   "Selecionar por não lidas",
   "Selecionar por (Aguardando atendimento)",
   "Selecionar por (Sem resposta do cliente)",
   "Selecionar para grupos",
   "Importar de CSV",
   "Digitar avulso",
];

const DisparoPage = () => {
   const [selectedOption, setSelectedOption] = useState(null);
   const [showColumns, setShowColumns] = useState(false);
   const [isAllSelected, setIsAllSelected] = useState(false);


   // ------------------------------ SweetAlert ----------------------------------- //

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


   // ------------------------ Função para o botão 'IMPORTAR' ------------------------- //

   const handleFileChange = (event) => {
      const file = event.target.files[0];
   
      if (file && (file.name.endsWith('.csv') || file.name.endsWith('.txt'))) {
         console.log("Arquivo selecionado:", file);
      } else {
         Toast.fire({
            icon: 'error',
            title: "Por favor, escolha um arquivo CSV ou TXT para importar os contatos."
         });
      }
   }
   
   // ---------------------------------- Render ---------------------------------- //
   return (
      <Container>
      <HeaderComponent />
         <MainContainer>
            <LeftColumn>
               <ColumnTitle>Selecionar contatos</ColumnTitle>
                     {optionTitles.map((title, index) => (
                        <OptionDiv key={index} onClick={() => setSelectedOption(index)} className={selectedOption === index ? "selected" : ""}>
                           <span>{title}</span>
                           <OptionIcon src={IconMoreOptions} alt="Mais opções" />
                        </OptionDiv>
                    ))}
                  </LeftColumn>
                
                  {selectedOption !== null && (
                  
                  <>
                     <MiddleColumn>
                        <ColumnHeading>{optionTitles[selectedOption]}</ColumnHeading>
                        
                        {selectedOption === optionTitles.indexOf("Importar de CSV") ? (
                           <>
                                 <InfoDiv>
                                    <InfoTextCSV>O arquivo CSV deve conter uma única coluna com os números (um por linha). Os números devem conter o código do país. 5511990000000</InfoTextCSV>
                                 </InfoDiv>
                                 
                                 <ImportButton onClick={() => document.getElementById('fileInput').click()}>IMPORTAR</ImportButton>
                                 <input 
                                    type="file" 
                                    id="fileInput" 
                                    style={{ display: 'none' }} 
                                    accept=".csv,.txt"
                                    onChange={handleFileChange}
                                 />
                           </>
                        ) : selectedOption === optionTitles.indexOf("Digitar avulso") ? null : (
                           <>
                                 <SelecionarTudo>
                                    <AddAllContainer>   
                                       <CheckBoxIcon onClick={() => setIsAllSelected(prev => !prev)} className={isAllSelected ? "selected" : ""}></CheckBoxIcon>
                                       <AddAllText>Adicionar todos</AddAllText>
                                    </AddAllContainer>

                                    <SearchBar>
                                       <SearchIcon src={IconSearch} alt="Ícone de busca" />
                                       <SearchInput placeholder="Digite para buscar..." />
                                    </SearchBar>
                                 </SelecionarTudo>
                                 
                                 <ContactsContainer>
                                    {/* Vamos apenas adicionar alguns contatos estáticos por enquanto */}
                                    {['João', 'Maria', 'Pedro', 'Ana', 'Luan', 'Angeluz', 'Evanderson'].map((name, idx) => (
                                       <ContactDiv key={idx}>
                                          <ContactCheckbox />
                                          <img src={userImage} alt={name} className="contact-image"/>
                                          <ContactName>{name}</ContactName>
                                       </ContactDiv>
                                    ))}
                                 </ContactsContainer>
                           </>
                        )}
                     </MiddleColumn>

                        
                     <RightColumn>
                        <ColumnHeading>Contatos selecionados (00)</ColumnHeading>
                            
                        <OptionTitle>Intervalo de segundo por mensagem enviada</OptionTitle>
                        <OptionButton><span>Selecione</span> <RightIcon src={IconSeta} alt="Ícone seta" /></OptionButton>

                        <OptionTitle>Pausar o envio a cada:</OptionTitle>
                        <OptionButton><span>Selecione</span> <RightIcon src={IconSeta} alt="Ícone seta" /></OptionButton>

                        <OptionTitle>Voltar a enviar com:</OptionTitle>
                        <OptionButton><span>Selecione</span> <RightIcon src={IconSeta} alt="Ícone seta" /></OptionButton>

                        <OptionTitle>Mensagem</OptionTitle>
                        <OptionButton><span>Selecione</span> <RightIcon src={IconSeta} alt="Ícone seta" /></OptionButton>

                        <OptionTitle>Após enviar, mover para lista:</OptionTitle>
                        <OptionButton><span>Nenhuma</span> <RightIcon src={IconSeta} alt="Ícone seta" /></OptionButton>

                        <InfoText>Os parâmetros são necessários para que os envios de mensagem sejam realizados de forma progressiva. Diante da política do WhatsApp, não recomendamos o envio para mais de 100 contatos.</InfoText>

                        <ShootButton>DISPARAR</ShootButton>
                     </RightColumn>
                  </>
                )}
            </MainContainer>
      </Container>
      );
};

export default DisparoPage;