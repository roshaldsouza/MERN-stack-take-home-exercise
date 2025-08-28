import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit } from 'lucide-react';
import { useTask } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import { Task } from '../types';
import { motion } from 'framer-motion';

const EditTask: React.FC = () => {
  const { updateTask, getTaskById, isLoading } = useTask();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const task = id ? getTaskById(id) : undefined;

  if (!task) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Task Not Found</h1>
        <p className="text-gray-600 mb-6">The task you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/tasks')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Back to Tasks
        </button>
      </div>
    );
  }

  const handleSubmit = (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    const processedData = {
      ...data,
      tags: typeof data.tags === 'string' 
        ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : data.tags || []
    };
    
    updateTask(task.id, processedData);
    navigate('/tasks');
  };

  const initialData = {
    ...task,
    tags: task.tags?.join(', ') || ''
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
        </motion.button>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
            <Edit className="h-8 w-8 text-blue-600" />
            <span>Edit Task</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Update your task details and keep everything current
          </p>
        </div>
      </motion.div>

      {/* Form */}
      <TaskForm 
        onSubmit={handleSubmit} 
        initialData={initialData}
        isLoading={isLoading} 
      />
    </div>
  );
};

export default EditTask;