import Link from 'next/link';

interface TaskCardProps {
  task: {
    _id: string;
    name: string;
    description: string;
    dueDate: string;
  };
  onDelete: () => void;
  onEdit: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onEdit }) => {
  return (
    <div className="border rounded-md p-4 shadow-md">
      <h2 className="text-xl font-bold">{task.name}</h2>
      <p>{task.description}</p>
      <p className="text-gray-500">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>
      <div className="flex items-center mt-4 space-x-2">
        <button
          onClick={onEdit}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
        <Link href={`/tasks/${task._id}`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TaskCard;
