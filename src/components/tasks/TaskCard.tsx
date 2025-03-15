import React from 'react';
import { Edit, Trash2, CheckCircle, X, Save, Calendar, AlertTriangle, Clock } from 'lucide-react';
import { Task } from '@/src/types/task';
import { Tooltip } from '../ui/tooltip';

interface TaskCardProps {
  task: Task;
  columnId: string;
  isDragging: boolean;
  isEditing: boolean;
  editContent: string;
  editDueDate: string;
  editPriority: 'low' | 'medium' | 'high';
  showDeleteConfirm: boolean;
  onEditChange: (field: string, value: string) => void;
  onStartEdit: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onRequestDelete: () => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  isDragging,
  isEditing,
  editContent,
  editDueDate,
  editPriority,
  showDeleteConfirm,
  onEditChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onRequestDelete,
  onConfirmDelete,
  onCancelDelete,
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-600 border-red-300';
      case 'medium':
        return 'bg-amber-100 text-amber-600 border-amber-300';
      case 'low':
        return 'bg-green-100 text-green-600 border-green-300';
      default:
        return 'bg-blue-100 text-blue-600 border-blue-300';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle size={14} className="text-red-600" />;
      case 'medium':
        return <Clock size={14} className="text-amber-600" />;
      case 'low':
        return <CheckCircle size={14} className="text-green-600" />;
      default:
        return null;
    }
  };

  // Calculer la date d'échéance pour affichage
  const getDueDateStatus = (dueDate?: string) => {
    if (!dueDate) return { text: '', color: '' };

    const today = new Date();
    const due = new Date(dueDate);
    today.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { text: 'En retard', color: 'text-red-600' };
    if (diffDays === 0) return { text: "Aujourd'hui", color: 'text-amber-600' };
    if (diffDays === 1) return { text: 'Demain', color: 'text-blue-600' };
    if (diffDays <= 7) return { text: `Dans ${diffDays} jours`, color: 'text-blue-600' };

    return {
      text: new Date(dueDate).toLocaleDateString(),
      color: 'text-gray-500',
    };
  };

  return (
    <div
      className={`bg-white p-3 mb-3 rounded-lg border border-gray-200 ${
        isDragging ? 'shadow-md ring-2 ring-finance-primary/20' : 'shadow-sm'
      } transition-all duration-200`}
    >
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={editContent}
            onChange={e => onEditChange('content', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-finance-primary/30 focus:border-finance-primary transition-all"
            rows={2}
            autoFocus
          />
          <div className="flex gap-2">
            <input
              type="date"
              value={editDueDate}
              onChange={e => onEditChange('dueDate', e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-finance-primary/30 focus:border-finance-primary"
            />
            <select
              value={editPriority}
              onChange={e => onEditChange('priority', e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-finance-primary/30 focus:border-finance-primary"
            >
              <option value="low">Basse</option>
              <option value="medium">Moyenne</option>
              <option value="high">Haute</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={onCancelEdit}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all"
              aria-label="Annuler"
            >
              <X size={16} />
            </button>
            <button
              onClick={onSaveEdit}
              className="p-2 text-finance-primary hover:text-finance-primary/80 hover:bg-finance-primary/10 rounded-full transition-all"
              aria-label="Enregistrer"
            >
              <Save size={16} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="mb-3 text-gray-700 font-medium break-words">{task.content}</p>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2 flex-wrap">
              {task.dueDate && (
                <div className="flex items-center gap-1">
                  <Calendar size={14} className={getDueDateStatus(task.dueDate).color} />
                  <span className={`text-xs ${getDueDateStatus(task.dueDate).color}`}>
                    {getDueDateStatus(task.dueDate).text}
                  </span>
                </div>
              )}
              <div
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${getPriorityColor(
                  task.priority
                )}`}
              >
                {getPriorityIcon(task.priority)}
                <span>
                  {task.priority === 'high'
                    ? 'Haute'
                    : task.priority === 'medium'
                    ? 'Moyenne'
                    : 'Basse'}
                </span>
              </div>
            </div>
            <div className="flex gap-1">
              <Tooltip content="Modifier">
                <button
                  onClick={onStartEdit}
                  className="p-1.5 text-gray-500 hover:text-finance-primary hover:bg-finance-primary/10 rounded-full transition-all"
                  aria-label="Modifier"
                >
                  <Edit size={14} />
                </button>
              </Tooltip>

              {showDeleteConfirm ? (
                <div className="flex items-center gap-1 bg-red-50 rounded-full px-1">
                  <Tooltip content="Confirmer">
                    <button
                      onClick={onConfirmDelete}
                      className="p-1.5 text-red-600 hover:bg-red-100 rounded-full transition-all"
                      aria-label="Confirmer la suppression"
                    >
                      <CheckCircle size={14} />
                    </button>
                  </Tooltip>
                  <Tooltip content="Annuler">
                    <button
                      onClick={onCancelDelete}
                      className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full transition-all"
                      aria-label="Annuler la suppression"
                    >
                      <X size={14} />
                    </button>
                  </Tooltip>
                </div>
              ) : (
                <Tooltip content="Supprimer">
                  <button
                    onClick={onRequestDelete}
                    className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                    aria-label="Supprimer"
                  >
                    <Trash2 size={14} />
                  </button>
                </Tooltip>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
