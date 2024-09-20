'use client';

import Header from '@/components/Header';
// import NewTaskModal from '@/components/NewTaskModal';
import TasksModal from '@/components/TasksModal';
// import Button from '@/components/ui/button';
import '@/styles/index.css';
// import { useState } from 'react';

const Home = () => {
  // const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  return (
    <>
      <Header />
      {/* <main> */}
      <TasksModal />
      {/* <Button
          onClick={() => setShowNewTaskModal(true)}
          text="Adicionar nova tarefa"
          className="add-new-task"
        />
        {showNewTaskModal && (
          <>
            <div className="overlay"></div>
            <NewTaskModal onCancel={() => setShowNewTaskModal(false)} />
          </>
        )} */}
      {/* </main> */}
    </>
  );
};

export default Home;
