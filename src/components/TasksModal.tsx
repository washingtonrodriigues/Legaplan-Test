'use client';

import '@/styles/_tasksModal.scss';
import Checkbox from './ui/checkbox';
import { useEffect, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import DeleteTaskModal from './DeleteTaskModal';
import Button from './ui/button';
import NewTaskModal from './NewTaskModal';

const TasksModal = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [checkedTasks, setCheckedTasks] = useState<Set<string>>(new Set());
  const [taskToDelete, setTaskToDelete] = useState('');
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    const storedCompletedTasks = localStorage.getItem('completedTasks');

    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }

    if (storedCompletedTasks) {
      setCompletedTasks(JSON.parse(storedCompletedTasks));
    }
  }, []);

  const handleCheckboxChange = (task: string) => {
    setCheckedTasks((prevCheckedTasks) => {
      const updatedCheckedTasks = new Set(prevCheckedTasks);
      const isChecked = updatedCheckedTasks.has(task);

      if (isChecked) {
        updatedCheckedTasks.delete(task);

        setCompletedTasks((prevCompletedTasks) => {
          const updatedCompletedTasks = prevCompletedTasks.filter(
            (t) => t !== task,
          );
          localStorage.setItem(
            'completedTasks',
            JSON.stringify(updatedCompletedTasks),
          );
          return updatedCompletedTasks;
        });
        setTasks((prevTasks) => {
          if (!prevTasks.includes(task)) {
            const updatedTasks = [...prevTasks, task];
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return updatedTasks;
          }
          return prevTasks;
        });
      } else {
        updatedCheckedTasks.add(task);

        setTasks((prevTasks) => {
          const updatedTasks = prevTasks.filter((t) => t !== task);
          localStorage.setItem('tasks', JSON.stringify(updatedTasks));
          return updatedTasks;
        });
        setCompletedTasks((prevCompletedTasks) => {
          if (!prevCompletedTasks.includes(task)) {
            const updatedCompletedTasks = [...prevCompletedTasks, task];
            localStorage.setItem(
              'completedTasks',
              JSON.stringify(updatedCompletedTasks),
            );
            return updatedCompletedTasks;
          }
          return prevCompletedTasks;
        });
      }
      return updatedCheckedTasks;
    });
  };

  const openDeleteModal = (task: string) => {
    setTaskToDelete(task);
    setShowDeleteTaskModal(true);
  };

  const handleAddTask = (newTask: string) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const handleDeleteTask = (task: string) => {
    if (taskToDelete) {
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter((t) => t !== task);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return updatedTasks;
      });
      setCompletedTasks((prevCompletedTasks) => {
        const updatedCompletedTasks = prevCompletedTasks.filter(
          (t) => t !== task,
        );
        localStorage.setItem(
          'completedTasks',
          JSON.stringify(updatedCompletedTasks),
        );
        return updatedCompletedTasks;
      });
    }
    setShowDeleteTaskModal(false);
  };

  return (
    <div className="container">
      <div className="tasks-modal">
        <h2>Suas tarefas de hoje</h2>
        <ul>
          {tasks.map((task) => (
            <li className="task" key={task}>
              <Checkbox
                checked={checkedTasks.has(task)}
                onChange={() => handleCheckboxChange(task)}
              />
              <p onClick={() => handleCheckboxChange(task)}>{task}</p>
              <FiTrash
                className="trash-icon"
                onClick={() => openDeleteModal(task)}
              />
            </li>
          ))}
        </ul>
        <h2>Tarefas finalizadas</h2>
        <ul>
          {completedTasks.map((task) => (
            <li className="task" key={task}>
              <Checkbox
                checked={true}
                onChange={() => handleCheckboxChange(task)}
              />
              <p
                className="completed-task-text"
                onClick={() => handleCheckboxChange(task)}
              >
                {task}
              </p>
              <FiTrash
                className="trash-icon"
                onClick={() => openDeleteModal(task)}
              />
            </li>
          ))}
        </ul>
      </div>
      <Button
        onClick={() => setShowNewTaskModal(true)}
        text="Adicionar nova tarefa"
        className="add-new-task"
      />
      {showNewTaskModal && (
        <>
          <div className="overlay"></div>
          <NewTaskModal
            onSave={handleAddTask}
            onCancel={() => setShowNewTaskModal(false)}
          />
        </>
      )}
      {showDeleteTaskModal && (
        <>
          <div className="overlay"></div>
          <DeleteTaskModal
            task={taskToDelete}
            onDelete={handleDeleteTask}
            onCancel={() => setShowDeleteTaskModal(false)}
          />
        </>
      )}
    </div>
  );
};

export default TasksModal;
