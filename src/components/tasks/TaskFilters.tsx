import React from 'react';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

interface TaskFiltersProps {
  searchTerm: string;
  filterPriority: 'all' | 'low' | 'medium' | 'high';
  onSearchChange: (value: string) => void;
  onFilterChange: (value: 'all' | 'low' | 'medium' | 'high') => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  searchTerm,
  filterPriority,
  onSearchChange,
  onFilterChange,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 w-full"
    >
      <div className="w-full md:min-w-[300px] space-y-4">
        <h3 className="font-semibold text-gray-800 mb-2">Filtrer les tâches</h3>

        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Rechercher une tâche..."
            value={searchTerm}
            onChange={e => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-finance-primary/50 focus:border-finance-primary"
          />
        </div>

        <div>
          <label
            htmlFor="filterPriority"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1"
          >
            <Filter size={16} />
            Priorité
          </label>
          <select
            id="filterPriority"
            value={filterPriority}
            onChange={e => onFilterChange(e.target.value as 'all' | 'low' | 'medium' | 'high')}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-finance-primary/50 focus:border-finance-primary appearance-none bg-white"
          >
            <option value="all">Toutes les priorités</option>
            <option value="low">Faible</option>
            <option value="medium">Moyenne</option>
            <option value="high">Élevée</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
};
