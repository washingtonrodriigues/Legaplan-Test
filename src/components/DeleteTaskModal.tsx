import Button from './ui/button';

import '@/styles/_deleteTaskModal.scss';

type DeleteTaskModalProps = {
  onDelete: (task: string) => void;
  onCancel: () => void;
  task: string;
};

const DeleteTaskModal = ({
  onDelete,
  onCancel,
  task,
}: DeleteTaskModalProps) => {
  return (
    <div className="delete-task-modal">
      <h2>Deletar tarefa</h2>
      <p>Tem certeza que você deseja deletar essa tarefa?</p>
      <div className="div-buttons">
        <Button text="Cancelar" className="cancel-task" onClick={onCancel} />
        <Button
          text="Deletar"
          className="delete-task"
          onClick={() => onDelete(task)}
        />
      </div>
    </div>
  );
};

export default DeleteTaskModal;
