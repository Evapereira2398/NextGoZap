import React, { useState, useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import { KanbanContext } from "../KanbanContext";
import { TaskContainer, TaskImage, TaskTitle, TaskSubtitle, TaskFooter, ColorBar, TagIcon, OptionsIcon, } from "./style";
import ColorPickerMenu from "../../SubMenus/MenuTask";

// ---------------------------- Component -------------------------------- //

const Task = ({ taskData, index }) => {
   const [isColorMenuOpen, setColorMenuOpen] = useState(false);
   const [selectedColor, setSelectedColor] = useState(taskData.color);
   const { updateTaskColor } = useContext(KanbanContext);

// ------------------------- Menu Colors --------------------------------- //

   const toggleColorMenu = () => setColorMenuOpen(!isColorMenuOpen);
   const handleColorSelect = (color) => {
      setSelectedColor(color);
      setColorMenuOpen(false);
      updateTaskColor(taskData.id, color);
   };

// --------------------------- Render ---------------------------- //
   return (
      <Draggable draggableId={String(taskData.id)} index={index}>
         {(provided, snapshot) => (
            <TaskContainer {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} isDragging={snapshot.isDragging} >
               <TaskImage src={taskData.image} alt="Task Image" />
               <div>
                  <TaskTitle>{taskData.name}</TaskTitle>
                  <TaskSubtitle>{taskData.message}</TaskSubtitle>
               </div>
               <TaskFooter hasColorBar={!!selectedColor}>
                  <TagIcon onClick={toggleColorMenu} />
                     {isColorMenuOpen && (
                        <ColorPickerMenu onSelectColor={handleColorSelect} />
                     )}
                  <OptionsIcon />
               </TaskFooter>

               {selectedColor && <ColorBar color={selectedColor} />}
            </TaskContainer>
         )}
      </Draggable>
   );
};

export default Task;
