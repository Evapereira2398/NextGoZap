import React, { useState } from 'react';
import { KanbanContainer, KanbanContent, Layout } from './style.js';
import KanbanBoard from '../../components/Kanban/KanbanBoard/index.js';

const demoData = [ 
  {
    title: 'Conversas Recentes',
    tasks: [
      { id: 'task-1', name: 'Task 1', message: 'This is task 1', unread: 3, image: 'https://via.placeholder.com/30' },
      { id: 'task-2', name: 'Task 2', message: 'This is task 1', unread: 3, image: 'https://via.placeholder.com/30' },
      { id: 'task-3', name: 'Task 3', message: 'This is task 1', unread: 3, image: 'https://via.placeholder.com/30' },
      { id: 'task-4', name: 'Task 4', message: 'This is task 1', unread: 3, image: 'https://via.placeholder.com/30' },
    ]
  }
];


const KanbanPage = () => {
  const [kanbanData, setKanbanData] = useState(demoData);

  const handleDataUpdate = (newData) => {
    setKanbanData(newData);
  };

  return (
    <Layout>
      <KanbanContainer>
        <KanbanContent>
          <KanbanBoard data={kanbanData} updateData={handleDataUpdate} />
        </KanbanContent>
      </KanbanContainer>
    </Layout>
  );
};

export default KanbanPage;
