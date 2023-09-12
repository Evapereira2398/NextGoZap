import { createContext, useState } from 'react';
import logo from '../../assets/LOGO BONECO 1.png';

export const KanbanContext = createContext();

export const KanbanProvider = ({ children }) => {
  const initialData = [
    {
      title: 'Conversas Recentes',
      tasks: [
        { id: 'task-1', name: 'Task 1', message: 'This is task 1', unread: 3, image: logo, color: null },
        { id: 'task-2', name: 'Task 2', message: 'This is task 1', unread: 3, image: logo, color: null },
        { id: 'task-3', name: 'Task 3', message: 'This is task 1', unread: 3, image: logo, color: null },
        { id: 'task-4', name: 'Task 4', message: 'This is task 1', unread: 3, image: logo, color: null },
        { id: 'task-5', name: 'Task 5', message: 'This is task 1', unread: 3, image: logo, color: null },
        { id: 'task-6', name: 'Task 6', message: 'This is task 1', unread: 3, image: logo, color: null },
        { id: 'task-7', name: 'Task 7', message: 'This is task 1', unread: 3, image: logo, color: null },
        { id: 'task-8', name: 'Task 8', message: 'This is task 1', unread: 3, image: logo, color: null },
      ]
    }
  ];

    const [kanbanData, setKanbanData] = useState(initialData);

    const updateTaskColor = (taskId, color) => {
      const newData = [...kanbanData];
      
      // Encontre a coluna e a tarefa para atualizar
      for (let col of newData) {
          const task = col.tasks.find(t => t.id === taskId);
          if (task) {
              task.color = color;
              break;
          }
      }                              
      
      setKanbanData(newData);
  };

   return (
      <KanbanContext.Provider value={{ kanbanData, setKanbanData, updateTaskColor }}>
         {children}
      </KanbanContext.Provider>
   );
};
