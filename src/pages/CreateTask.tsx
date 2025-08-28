import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { useTask } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';
import { Task } from '../types';
import { motion } from 'framer-motion';

const CreateTask: React.FC = () => {
  const { addTask, isLoading } = useTask();
  const navigate = useNavigate();

  const handleSubmit = (data: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    const processedData = {
      ...data,
      tags: typeof data.tags === 'string' 
        ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : data.tags || []
    };
    
    addTask(processedData);
    navigate('/tasks');
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
            <Plus className="h-8 w-8 text-blue-600" />
            <span>Create New Task</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Add a new task to your workflow and stay organized
          </p>
        </div>
      </motion.div>

      {/* Form */}
      <TaskForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

export default CreateTask;