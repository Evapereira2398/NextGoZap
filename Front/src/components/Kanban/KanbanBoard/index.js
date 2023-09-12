import React, { useState, useRef, useContext, useEffect} from "react";
import Task from "../Task";
import DeleteColumnModal from "../../Modal/DeleteColumnModal";
import AddNewColumnModal from "../../Modal/AddNewColumnModal";
import HeaderComponent from "../../Header";
import { KanbanContext } from "../KanbanContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {ScrollContainer, KanbanContainer, Column, FloatingButton } from'./style';


const reorder = (list, startIndex, endIndex) => {
   const result = Array.from(list);
   const [removed] = result.splice(startIndex, 1);
   result.splice(endIndex, 0, removed);
   return result;
};

// ------------------------------ Component --------------------------------------- //

const KanbanBoard = ({ data: propsData, updateData: propsUpdateData }) => {
   const { kanbanData: data, setKanbanData: updateData } = useContext(KanbanContext);
   const [isEditing, setIsEditing] = useState(null);
   const [columnName, setColumnName] = useState("");
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [columnToRemove, setColumnToRemove] = useState(null);
   const [isNewColumnModalOpen, setNewColumnModalOpen] = useState(false);
   const [newColumnName, setNewColumnName] = useState("");
   const [isDragging, setIsDragging] = useState(false);
   const [startX, setStartX] = useState(0);
   const [scrollLeft, setScrollLeft] = useState(0);
   const kanbanContainerRef = useRef(null);
   const [editDuplicateColumnNameError, setEditDuplicateColumnNameError] = useState(false);
   const [duplicateColumnNameError, setDuplicateColumnNameError] = useState(false);
   const titleContainerParentRef = useRef(null);
   const scrollContainerRef = useRef(null);

   // ------------------------------------ AddColumn -------------------------------------- //

   const handleAddColumn = () => {
      setNewColumnName("");
      setNewColumnModalOpen(true);
   };

   const handleCreateNewColumn = () => {
      if (data.some(col => col.title === newColumnName)) {
         setDuplicateColumnNameError(true);
         return;
      }

   const newData = [
      ...data,
      {
         title: newColumnName,
         tasks: [],
      },
   ];
      updateData(newData);
      setNewColumnModalOpen(false); 
   };

   const handleCloseNewColumnModal = () => {
      setNewColumnName(""); 
      setDuplicateColumnNameError(false); 
      setNewColumnModalOpen(false); 
   };


   // -------------------------------------- EditNameColumn ------------------------------------ // 

   const doesColumnNameExist = (currentColumnName, newColumnName) => {
      return data.some(col => col.title === newColumnName && col.title !== currentColumnName);
   };
  
   const handleEditColumnName = (oldTitle, newTitle) => {
      if (doesColumnNameExist(oldTitle, newTitle)) {
         setEditDuplicateColumnNameError(true);
         return;
      }

   const newData = data.map((col) => {
      if (col.title === oldTitle) {
         return { ...col, title: newTitle };
      }

      return col;
   });

      updateData(newData);
      setIsEditing(null);
   };

   const handleColumnNameChange = (e) => {
      const value = e.target.value;
      setNewColumnName(value);

      if (data.some(col => col.title === value)) {
         setDuplicateColumnNameError(true);
      } else {
         setDuplicateColumnNameError(false);
      }
   };

   const handleColumnNameSubmit = (title) => {
      const newData = data.map((col) => {
         if (col.title === title) {
            return { ...col, title: columnName };
         }
            
         return col;
      });

      updateData(newData);
      setIsEditing(null);
   };

   // ---------------------------------- RemoveColumn -------------------------------------- //

   const handleRemoveColumn = (title) => {
      const newData = data.filter((col) => col.title !== title);
      updateData(newData);
   };

   const confirmRemoveColumn = () => {
      const newData = data.filter((col) => col.title !== columnToRemove);
      updateData(newData);
      setIsModalOpen(false);
      setColumnToRemove(null);
   };


   // ----------------------------------- Drag and Drop ----------------------------------- //

   const startDrag = (e) => {
      if (e.target !== kanbanContainerRef.current) return;

      setIsDragging(true);
      kanbanContainerRef.current.classList.add("dragging");
      setStartX(e.pageX - kanbanContainerRef.current.offsetLeft);
      setScrollLeft(kanbanContainerRef.current.scrollLeft);
   };

   const stopDrag = () => {
      setIsDragging(false);
      if (kanbanContainerRef.current) {
         kanbanContainerRef.current.classList.remove("dragging");
      }
   }; 

   const performDrag = (e) => {
      if (!isDragging) return;
      const x = e.pageX - kanbanContainerRef.current.getBoundingClientRect().left;
      const walk = (x - startX) * 2;
      const newScrollPosition = scrollLeft - walk;
      kanbanContainerRef.current.scrollLeft = newScrollPosition;
   };

   const move = (source, destination, droppableSource, droppableDestination) => {
      const sourceClone = Array.from(source);
      const destClone = Array.from(destination);
      const [removed] = sourceClone.splice(droppableSource.index, 1);

      destClone.splice(droppableDestination.index, 0, removed);

      return {
         [droppableSource.droppableId]: sourceClone,
         [droppableDestination.droppableId]: destClone,
      };
   };

   // ---------------------------- Atalho para adicionar nova coluna -------------------------- //
  
   useEffect(() => {
      let keysPressed = {};

      const handleKeyDown = (event) => {
         keysPressed[event.key] = true;

         if (keysPressed["Control"] && keysPressed["Alt"] && keysPressed["n"]) {
            event.preventDefault();
            handleAddColumn();
         }
      };

      const handleKeyUp = (event) => {
         delete keysPressed[event.key];
      };

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);

      return () => {
         document.removeEventListener('keydown', handleKeyDown);
         document.removeEventListener('keyup', handleKeyUp);
      }
   }, [handleAddColumn]);


   
   // ---------------------- Invalidando 'Conversas recentes' para não receber task --------------------- //

   const onDragEnd = (result) => {
      const { source, destination } = result;

      if (!destination || destination.droppableId === "Conversas Recentes") {
         return;
      }

      if (source.droppableId === destination.droppableId) {
         const items = reorder(
            data.find((col) => col.title === source.droppableId).tasks,
            source.index,
            destination.index
         );

         const updatedData = data.map((col) =>
            col.title === source.droppableId ? { ...col, tasks: items } : col
         );

         updateData(updatedData);
      } else {
         const result = move(
            data.find((col) => col.title === source.droppableId).tasks,
            data.find((col) => col.title === destination.droppableId).tasks,
            source,
            destination
         );

         const updatedData = data.map((col) => {
            if (col.title === source.droppableId)
               return { ...col, tasks: result[source.droppableId] };
            if (col.title === destination.droppableId)
               return { ...col, tasks: result[destination.droppableId] };
            return col;
         });

         updateData(updatedData);
      }
   };


   // ------------------------------------------------ Render ---------------------------------------- //

   return (
      <div>
         <HeaderComponent 
            data={data}
            handleEditColumnName={handleEditColumnName} 
            handleRemoveColumn={handleRemoveColumn}
            scrollContainerRef={scrollContainerRef}
         />

         <DragDropContext onDragEnd={onDragEnd}>
            <ScrollContainer ref={scrollContainerRef}>
               <KanbanContainer ref={kanbanContainerRef}>
                  {data.map((column, index) => (
                     <Droppable 
                        droppableId={String(column.title)} 
                        key={index} 
                        isDropDisabled={column.title === "Conversas Recentes"}>
                        {(provided) => (
                           <Column {...provided.droppableProps} ref={provided.innerRef}>
                              {column.tasks.map((task, taskIndex) => (
                              <Task key={task.id} taskData={task} index={taskIndex} />
                              ))}
                              {provided.placeholder}
                           </Column>
                        )}
                     </Droppable>
                  ))}

                     <DeleteColumnModal 
                        isOpen={isModalOpen} 
                        onClose={() => setIsModalOpen(false)} 
                        columnName={columnToRemove} 
                        onConfirm={confirmRemoveColumn} 
                     />

               </KanbanContainer>
            </ScrollContainer>
         </DragDropContext>

         <AddNewColumnModal
            isOpen={isNewColumnModalOpen}
            onClose={handleCloseNewColumnModal}
            columnName={newColumnName}
            onConfirm={handleCreateNewColumn}
            onChange={handleColumnNameChange}
            duplicateColumnNameError={duplicateColumnNameError}
            setDuplicateColumnNameError={setDuplicateColumnNameError}
         />


         <FloatingButton onClick={handleAddColumn}>+</FloatingButton>

      </div>
	)
};

export default KanbanBoard;