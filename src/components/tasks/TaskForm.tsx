import React from 'react';
import { PlusCircle, Calendar } from 'lucide-react';
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 w-full flex-grow"
    >
      <form onSubmit={handleSubmit} className="w-full md:min-w-[350px] space-y-3">
        <h3 className="font-semibold text-gray-800 mb-2">Ajouter une nouvelle tâche</h3>

        <div>
          <textarea
            placeholder="Entrez la description de la tâche..."
            value={content}
            onChange={e => onContentChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-finance-primary/50 focus:border-finance-primary transition-all text-gray-800 resize-none"
            rows={2}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
              Date d'échéance
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={e => onDueDateChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-finance-primary/50 focus:border-finance-primary"
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
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-finance-primary/50 focus:border-finance-primary"
            >
              <option value="low">Faible</option>
              <option value="medium">Moyenne</option>
              <option value="high">Élevée</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-finance-primary text-white py-2.5 px-4 rounded-lg hover:bg-finance-primary-dark transition-colors font-medium"
        >
          <PlusCircle size={18} />
          <span>Ajouter la tâche</span>
        </button>
      </form>
    </motion.div>
  );
};
