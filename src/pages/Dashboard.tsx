import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Clock, AlertTriangle, TrendingUp, Plus, Calendar } from 'lucide-react';
import { useTask } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import StatsCard from '../components/StatsCard';
import TaskCard from '../components/TaskCard';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const Dashboard: React.FC = () => {
  const { tasks } = useTask();
  const { user } = useAuth();

  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const overdueTasks = tasks.filter(task => 
    new Date(task.dueDate) < new Date() && task.status !== 'completed'
  ).length;

  const recentTasks = tasks
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  const upcomingTasks = tasks
    .filter(task => task.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white p-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-blue-100 text-lg">
              You have {pendingTasks + inProgressTasks} active tasks to work on today.
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/create"
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>New Task</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Tasks"
          value={tasks.length}
          icon={CheckSquare}
          color="bg-gradient-to-r from-blue-500 to-blue-600"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Completed"
          value={completedTasks}
          icon={CheckSquare}
          color="bg-gradient-to-r from-green-500 to-green-600"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="In Progress"
          value={inProgressTasks}
          icon={Clock}
          color="bg-gradient-to-r from-yellow-500 to-orange-500"
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Overdue"
          value={overdueTasks}
          icon={AlertTriangle}
          color="bg-gradient-to-r from-red-500 to-red-600"
          trend={{ value: -3, isPositive: false }}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Tasks */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Recent Tasks</h2>
            <Link
              to="/tasks"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              View all
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No tasks yet. Create your first task!</p>
                <Link
                  to="/create"
                  className="inline-flex items-center space-x-2 mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Task</span>
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Deadlines</h2>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map((task) => {
                const isOverdue = new Date(task.dueDate) < new Date();
                const daysUntilDue = Math.ceil(
                  (new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                );
                
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-white rounded-lg border p-4 ${
                      isOverdue ? 'border-red-200 bg-red-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{task.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-medium ${
                          isOverdue ? 'text-red-600' : daysUntilDue <= 1 ? 'text-orange-600' : 'text-gray-600'
                        }`}>
                          {isOverdue ? 'Overdue' : daysUntilDue === 0 ? 'Today' : `${daysUntilDue} days`}
                        </span>
                        <div className={`w-3 h-3 rounded-full mt-1 ml-auto ${
                          task.priority === 'high' ? 'bg-red-500' :
                          task.priority === 'medium' ? 'bg-orange-500' : 'bg-blue-500'
                        }`} />
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No upcoming deadlines</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200/50 p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/create"
            className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
          >
            <Plus className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-blue-700">Create New Task</span>
          </Link>
          
          <Link
            to="/tasks?filter=pending"
            className="flex items-center space-x-3 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors group"
          >
            <Clock className="h-5 w-5 text-orange-600 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-orange-700">View Pending Tasks</span>
          </Link>
          
          <Link
            to="/tasks?filter=overdue"
            className="flex items-center space-x-3 p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors group"
          >
            <AlertTriangle className="h-5 w-5 text-red-600 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-red-700">Check Overdue</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;