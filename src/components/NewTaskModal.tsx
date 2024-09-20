'use client';

import '@/styles/_newTaskModal.scss';
import Button from './ui/button';
import { useState } from 'react';

const NewTaskModal = ({
  onCancel,
  onSave,
}: {
  onSave: (task: string) => void;
  onCancel: () => void;
}) => {
  const [task, setTask] = useState('');

  const handleSaveTask = () => {
    const existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    const updatedTasks = [...existingTasks, task];

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    onSave(task);
    setTask('');
    onCancel();
  };

  return (
    <div className="new-task-modal">
      <h2>Nova tarefa</h2>
      <div>
        <p>Título</p>
        <input
          value={task}
          onChange={(ev) => setTask(ev.target.value)}
          type="text"
          placeholder="Digite"
          autoFocus
        />
      </div>
      <div className="div-buttons">
        <Button onClick={onCancel} text="Cancelar" className="cancel-task" />
        <Button
          onClick={handleSaveTask}
          text="Adicionar"
          className="add-task"
        />
      </div>
    </div>
  );
};

export default NewTaskModal;
