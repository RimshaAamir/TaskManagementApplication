'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Task {
  _id: string;
  name: string;
  description: string;
  dueDate: string;
}

const TaskDetails: React.FC = () => {
  const { id } = useParams() as { id: string }; // Extract the dynamic route parameter
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await fetch(`/api/tasks/list/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data: Task = await response.json();
        setTask(data);
      } else {
        console.error('Failed to fetch task');
      }
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{task.name}</h1>
      <p>{task.description}</p>
      <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
    </div>
  );
};

export default TaskDetails;
