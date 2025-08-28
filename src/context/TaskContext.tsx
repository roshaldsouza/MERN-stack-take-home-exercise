import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task, TaskContextType } from '../types';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Load tasks from localStorage
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks);
        setTasks(parsedTasks.filter((task: Task) => task.userId === user.id));
      } else {
        // Initialize with sample tasks
        const sampleTasks: Task[] = [
          {
            id: '1',
            title: 'Complete Project Proposal',
            description: 'Finish the quarterly project proposal and submit to management',
            status: 'in-progress',
            priority: 'high',
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            userId: user.id,
            tags: ['work', 'urgent']
          },
          {
            id: '2',
            title: 'Review Code Changes',
            description: 'Review and approve pending pull requests from the development team',
            status: 'pending',
            priority: 'medium',
            dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            userId: user.id,
            tags: ['development', 'review']
          },
          {
            id: '3',
            title: 'Team Meeting Preparation',
            description: 'Prepare agenda and materials for the weekly team meeting',
            status: 'completed',
            priority: 'low',
            dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            userId: user.id,
            tags: ['meeting', 'planning']
          }
        ];
        setTasks(sampleTasks);
        localStorage.setItem('tasks', JSON.stringify(sampleTasks));
      }
    }
  }, [user]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    if (!user) return;
    
    setIsLoading(true);
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: user.id
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    
    // Update localStorage with all tasks
    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const filteredTasks = allTasks.filter((task: Task) => task.userId !== user.id);
    localStorage.setItem('tasks', JSON.stringify([...filteredTasks, ...updatedTasks]));
    
    toast.success('Task created successfully!');
    setIsLoading(false);
  };

  const updateTask = (id: string, taskData: Partial<Task>) => {
    if (!user) return;
    
    setIsLoading(true);
    const updatedTasks = tasks.map(task =>
      task.id === id
        ? { ...task, ...taskData, updatedAt: new Date().toISOString() }
        : task
    );
    
    setTasks(updatedTasks);
    
    // Update localStorage
    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const filteredTasks = allTasks.filter((task: Task) => task.userId !== user.id);
    localStorage.setItem('tasks', JSON.stringify([...filteredTasks, ...updatedTasks]));
    
    toast.success('Task updated successfully!');
    setIsLoading(false);
  };

  const deleteTask = (id: string) => {
    if (!user) return;
    
    setIsLoading(true);
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    
    // Update localStorage
    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const filteredTasks = allTasks.filter((task: Task) => task.userId !== user.id);
    localStorage.setItem('tasks', JSON.stringify([...filteredTasks, ...updatedTasks]));
    
    toast.success('Task deleted successfully!');
    setIsLoading(false);
  };

  const getTaskById = (id: string): Task | undefined => {
    return tasks.find(task => task.id === id);
  };

  const value: TaskContextType = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
    isLoading
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};