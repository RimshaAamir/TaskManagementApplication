// 





'use client';

import { useState, useEffect, FormEvent } from 'react';
import TaskCard from '../../components/TaskCard';

interface Task {
  _id: string;
  name: string;
  description: string;
  dueDate: string;
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    dueDate: '',
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  // Utility to get the token from localStorage and set the Authorization header
  const getHeaders = () => {
    const token = localStorage.getItem('token'); // Replace 'token' with your storage key
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchTasks = async () => {
    const response = await fetch('/api/tasks/read', {
      method: 'GET',
      headers: getHeaders(),
    });

    if (response.ok) {
      const data: Task[] = await response.json();
      setTasks(data);
    } else {
      console.error('Failed to fetch tasks');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const url = editingTask
      ? `/api/tasks/update/${editingTask._id}`
      : '/api/tasks/create';
    const method = editingTask ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: getHeaders(),
      body: JSON.stringify(form),
    });

    if (response.ok) {
      setEditingTask(null);
      setForm({ name: '', description: '', dueDate: '' });
      fetchTasks();
    } else {
      console.error('Failed to save task');
    }
  };

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/tasks/delete/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (response.ok) {
      fetchTasks();
    } else {
      console.error('Failed to delete task');
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setForm({
      name: task.name,
      description: task.description,
      dueDate: task.dueDate.split('T')[0], // Format for date input
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Task Management</h1>

      {/* Form for Creating or Editing Tasks */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 shadow rounded mb-4 space-y-4"
      >
        <h2 className="text-2xl font-bold">
          {editingTask ? 'Edit Task' : 'Add Task'}
        </h2>
        <div>
          <label className="block text-sm font-medium">Task Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            className="w-full border p-2 rounded"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">Due Date</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
        {editingTask && (
          <button
            type="button"
            onClick={() => {
              setEditingTask(null);
              setForm({ name: '', description: '', dueDate: '' });
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Task List */}
      <div className="grid grid-cols-1 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onDelete={() => handleDelete(task._id)}
            onEdit={() => handleEdit(task)}
          />
        ))}
      </div>
    </div>
  );
};

export default TasksPage;
