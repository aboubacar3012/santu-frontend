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
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 space-y-4 md:space-y-0">
        <div className="relative flex-grow">
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

        <div className="md:w-52">
          <label
            htmlFor="filterPriority"
            className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1 md:sr-only"
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
            <option value="low">Priorité: Faible</option>
            <option value="medium">Priorité: Moyenne</option>
            <option value="high">Priorité: Élevée</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
};
