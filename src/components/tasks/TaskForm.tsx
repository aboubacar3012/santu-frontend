import React from 'react';
import { PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface TaskFormProps {
  content: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  onContentChange: (value: string) => void;
  onDueDateChange: (value: string) => void;
  onPriorityChange: (value: 'low' | 'medium' | 'high') => void;
  onAddTask: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  content,
  dueDate,
  priority,
  onContentChange,
  onDueDateChange,
  onPriorityChange,
  onAddTask,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div>
          <label htmlFor="taskContent" className="block text-sm font-medium text-gray-700 mb-1">
            Description de la tâche
          </label>
          <textarea
            id="taskContent"
            placeholder="Entrez la description de la tâche..."
            value={content}
            onChange={e => onContentChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-finance-primary/50 focus:border-finance-primary transition-all text-gray-800 resize-none"
            rows={3}
            required
            autoFocus
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
              Date d'échéance
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={e => onDueDateChange(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-finance-primary/50 focus:border-finance-primary"
            />
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priorité
            </label>
            <select
              id="priority"
              value={priority}
              onChange={e => onPriorityChange(e.target.value as 'low' | 'medium' | 'high')}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-finance-primary/50 focus:border-finance-primary"
            >
              <option value="low">Faible</option>
              <option value="medium">Moyenne</option>
              <option value="high">Élevée</option>
            </select>
          </div>
        </div>

        <div className="pt-3">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-finance-primary text-white py-3 px-4 rounded-lg hover:bg-finance-primary-dark transition-colors font-medium"
          >
            <PlusCircle size={18} />
            <span>Ajouter la tâche</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
};
