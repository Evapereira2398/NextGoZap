import React, { useState, useEffect, useRef, useContext} from 'react';  
import { 
HeaderComponent, 
ColumnTitleContainer, 
RightSession, 
Title, 
WhiteLine,
NumberBox, 
NumberText, 
OtherPagesTitleContainer, 
TitlesContainer, 
TaskCount,
TitleContainer,
StyledTitle,
TitleContainerParent,
SubMenu,
SubMenuItem,
DropdownMenu,
DropdownItem,
StyledInput,
} from "./style";

import DrawerIcon from "../../assets/DrawerIcon.png";
import IconSino from "../../assets/IconSino.png";
import IconAddNewColumn from "../../assets/IconADDKanban.svg";
import IconSearchKanban from "../../assets/IconSearchKanban.svg";
import IconMoreOptionsKanban from "../../assets/IconMoreOptionKanban.svg";
import DeleteColumnModal from "../Modal/DeleteColumnModal";
import ClearColumnModal from '../../components/Modal/ClearColumnModal';
import { useLocation } from 'react-router-dom';
import { KanbanContext } from "../../components/Kanban/KanbanContext";

import Swal from 'sweetalert2';


const Header = ({handleEditColumnName, handleRemoveColumn, editDuplicateColumnNameError, scrollContainerRef}) => {
   const TitlesContainerRef = useRef(null);
   const { kanbanData: data } = useContext(KanbanContext);
   const location = useLocation();
   const titleContainerParentRef = useRef(null);
   const [dropdownTop, setDropdownTop] = useState(null);
   const [dropdownLeft, setDropdownLeft] = useState(null);
   const [showSubMenu, setShowSubMenu] = useState(false);
   const drawerIconRef = useRef(null);
   const subMenuRef = useRef(null);
   const [showDropdown, setShowDropdown] = useState(null);
   const dropdownRefs = useRef({});
   const [tempColumnName, setTempColumnName] = useState("");  
   const [editingColumnName, setEditingColumnName] = useState(null);
   const { kanbanData, setKanbanData } = useContext(KanbanContext);
   const [columnToClear, setColumnToClear] = useState(null);
   const [columnToDelete, setColumnToDelete] = useState(null);
   const [displayName, setDisplayName] = useState('Evanderson');
   const [isEditingName, setIsEditingName] = useState(false);

   
   // ------------------------------------------------  MenuHeader ----------------------------------------------------- //
   
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (showSubMenu && !drawerIconRef.current.contains(event.target) && !subMenuRef.current.contains(event.target)) {
            setShowSubMenu(false);
         }
      };
            
      document.addEventListener('mousedown', handleClickOutside);
         return () => {
               document.removeEventListener('mousedown', handleClickOutside);
            };
   }, [showSubMenu]);


   const handleSubMenuOptionClick = (option) => {
      setShowSubMenu(false);
      if (option === 'editName') {
         setIsEditingName(true);
      }
   };


   // ----------------------------------------- Scroll Kanban + Scroll Header ------------------------------------- //
   
   useEffect(() => {
      const handleKanbanScroll = () => {
         if(titleContainerParentRef && titleContainerParentRef.current) {
            titleContainerParentRef.current.scrollLeft = scrollContainerRef.current.scrollLeft;
         }
      };
        
      if(scrollContainerRef && scrollContainerRef.current) {
         scrollContainerRef.current.addEventListener('scroll', handleKanbanScroll);
      }
        
      return () => {
         if(scrollContainerRef && scrollContainerRef.current) {
            scrollContainerRef.current.removeEventListener('scroll', handleKanbanScroll);
         }
      };

   }, []);
        
        
   const handleIconClick = (event, title) => {
      const rect = event.target.getBoundingClientRect();
      setDropdownTop(rect.bottom + window.scrollY);
      setDropdownLeft(rect.left + window.scrollX);
      toggleDropdown(title);
   };


   // ------------------------------------------- Menu editName/Delete Column  -------------------------------------- //
   
   const toggleDropdown = (title) => {
      if (showDropdown === title) {
         setShowDropdown(null);

      } else {
         setShowDropdown(title);
      }
   };


   useEffect(() => {
      const handleClickOutside = (event) => {
         if (showDropdown && !dropdownRefs.current[showDropdown].current.contains(event.target)) {
            setShowDropdown(null);
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
         return () => {
            document.removeEventListener('mousedown', handleClickOutside);
         };

   }, [showDropdown]);


   // ------------------------------------------------ EditColumnName ------------------------------------------------- //
   
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
    

   const beginEditColumnName = (colTitle) => {
      setEditingColumnName(colTitle);
      setTempColumnName(colTitle);
      setShowDropdown(null);
   };
 

   const doesColumnNameExist = (currentName, newName) => {
      if (currentName === newName) return false;
      return data.some(column => column.title === newName);
   };

   const submitColumnNameEdit = () => {
      if (doesColumnNameExist(editingColumnName, tempColumnName)) {
           Toast.fire({
             icon: 'error',
             title: `Já existe uma coluna com o nome "${tempColumnName}".`
           });
           return;
      }
          
      handleEditColumnName(editingColumnName, tempColumnName);
      setEditingColumnName(null);
      setTempColumnName("");
   };

   const EditErrorAlert = ({ show, name }) => {
      if (!show) return null;
            
      return (
         <p style={{ color: 'red', fontSize: '13px' }}>
            O nome <b>{name}</b> já foi definido para outra coluna.
         </p>
      );
   };


   // -------------------------------------------- ClearTaskOfColumn --------------------------------------- //
   
   const handleClearColumnRequest = (title) => {
      setColumnToClear(title);
   };

   const clearColumn = (title) => {            
      const updatedData = kanbanData.map(column => {
         if (column.title === title) {
            return {
               ...column,
               tasks: []
            };
         }
             
         return column;
      });
     
      setKanbanData(updatedData);
      setColumnToClear(null);
   };

     
   const handleModalClose = () => {
      setColumnToClear(null);  
   };
  

   // ------------------------------------------ Render -------------------------------- // 
   return (
      <HeaderComponent>
         {location.pathname !== "/kanban" ? (
            <TitlesContainer ref={TitlesContainerRef}>
               {data.map((column) => (
                  <OtherPagesTitleContainer key={column.title}>
                     <Title>{column.title}</Title>
                     <NumberBox>
                        <NumberText>{column.tasks.length}</NumberText>
                     </NumberBox>
                     <WhiteLine />
                  </OtherPagesTitleContainer>
               ))}
            </TitlesContainer>
               
         ) : (
               
            <TitleContainerParent ref={titleContainerParentRef}>
               {data.map((column) => {
                  if (!dropdownRefs.current[column.title]) {
                     dropdownRefs.current[column.title] = React.createRef();
                  } 
                     return (
                        <ColumnTitleContainer key={column.title}>
                           <TitleContainer>
                              {editingColumnName === column.title ? (
                                 <>
                                    <StyledInput 
                                       type="text" 
                                       value={tempColumnName} 
                                       onChange={(e) => setTempColumnName(e.target.value)}
                                       onKeyDown={(e) => {
                                          if (e.key === "Enter") {
                                             submitColumnNameEdit();
                                          }
                                       }}
                                       
                                       onBlur={() => setEditingColumnName(null)}
                                    />

                                    <EditErrorAlert show={editDuplicateColumnNameError} name={tempColumnName} />
                                 </>

                              ) : (
                                 <>
                                    <StyledTitle>{column.title}</StyledTitle>
                                    <TaskCount>{column.tasks.length}</TaskCount>
                                 </>
                              )}
                           </TitleContainer>
         
                           {location.pathname === "/kanban" && 
                              <div ref={dropdownRefs.current[column.title]}>
                                 <img src={IconSearchKanban} alt="Search" />
         
                                 {column.title !== "Conversas Recentes" && (
                                    <img 
                                       src={IconMoreOptionsKanban} 
                                       alt="More Options" 
                                       style={{ cursor: 'pointer' }} 
                                       onClick={(event) => handleIconClick(event, column.title)} 
                                    />
                                 )}
                                             
                                 <DropdownMenu show={showDropdown === column.title} style={{ top: dropdownTop, left: dropdownLeft }}>
                                    <DropdownItem onClick={() => { beginEditColumnName(column.title); setShowDropdown(null); }}>
                                       Alterar o nome da coluna
                                    </DropdownItem>

                                    <DropdownItem onClick={() => setColumnToClear(column.title)}>
                                       Limpar coluna
                                    </DropdownItem>

                                    <DropdownItem onClick={() => { setColumnToDelete(column.title); setShowDropdown(null); }}>
                                       Remover coluna
                                    </DropdownItem>
                                 </DropdownMenu>
                              </div>
                           }
                        </ColumnTitleContainer>
                     );
               })}
            </TitleContainerParent>
         )}
         
         <RightSession display={location.pathname !== "/kanban"}> 
            <div className="icon-box" id="NewColumn">
               <img src={IconAddNewColumn} alt="AddNewColumn" />
            </div>

            <div className="icon-box">
               <img src={IconSino} alt="Notification" />
            </div>

            <div className="icon-box" ref={drawerIconRef} onClick={() => setShowSubMenu(prev => !prev)}>
               <img src={DrawerIcon} alt="Icon" style={{ cursor: 'pointer' }} />
            </div>
         
            {showSubMenu && (
               <SubMenu ref={subMenuRef}>
               <SubMenuItem onClick={() => handleSubMenuOptionClick('editName')}>Alterar nome de exibição</SubMenuItem>
               <SubMenuItem onClick={handleSubMenuOptionClick}>Adicionar assistente</SubMenuItem>
               <SubMenuItem onClick={handleSubMenuOptionClick}>Ajuda</SubMenuItem>
               </SubMenu>
            )}

            <div id="session">
               {isEditingName ? (
                  <StyledInput 
                     type="text" 
                     value={displayName}
                     onChange={(e) => setDisplayName(e.target.value)}
                     onKeyDown={(e) => {
                     if (e.key === "Enter") {
                           setIsEditingName(false);
                        }
                     }}
                  />
               ) : (
                  <span className="name">{displayName}</span>
               )}
                  <span className="phone">+5541992347486</span>
            </div>
         </RightSession> 
         
         <DeleteColumnModal 
            isOpen={columnToDelete !== null}
            onClose={() => setColumnToDelete(null)}
            columnName={columnToDelete}
            onConfirm={() => {
               handleRemoveColumn(columnToDelete);
               setColumnToDelete(null);
            }}
         />

         <ClearColumnModal 
            isOpen={!!columnToClear} 
            onClose={handleModalClose} 
            columnName={columnToClear} 
            onConfirm={() => clearColumn(columnToClear)} 
         />
      </HeaderComponent>
   );    
};

export default Header;