import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Trash2, Edit, X, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { TaskCard } from './TaskCard';
import { Column, Task } from '@/src/types/task';

interface TaskColumnProps {
  column: Column;
  editingTask: { id: string; columnId: string } | null;
  showDeleteConfirm: string | null;
  editContent: string;
  editDueDate: string;
  editPriority: 'low' | 'medium' | 'high';
  onEditChange: (field: string, value: string) => void;
  onStartEdit: (task: Task, columnId: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDeleteTask: (taskId: string, columnId: string) => void;
  onToggleDeleteConfirm: (taskId: string | null) => void;
}

export const TaskColumn: React.FC<TaskColumnProps> = ({
  column,
  editingTask,
  showDeleteConfirm,
  editContent,
  editDueDate,
  editPriority,
  onEditChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDeleteTask,
  onToggleDeleteConfirm,
}) => {
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high':
        return { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' };
      case 'medium':
        return { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' };
      case 'low':
        return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' };
    }
  };

  return (
    <div className="min-w-[300px] bg-white rounded-xl shadow-sm border border-gray-200 flex-1 snap-center h-full">
      <div className={`p-4 border-b ${column.color} flex items-center justify-between`}>
        <div className="flex items-center gap-2 font-medium">
          {column.icon}
          <h2 className="text-lg font-bold">{column.title}</h2>
          <span className="ml-1 bg-gray-100 text-gray-700 text-sm px-2 py-0.5 rounded-full">
            {column.tasks.length}
          </span>
        </div>
      </div>

      <Droppable droppableId={column.id}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="p-3 h-[calc(100%-3.5rem)] min-h-[50vh] overflow-y-auto"
          >
            {column.tasks.length === 0 ? (
              <div className="flex items-center justify-center h-24 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 text-sm">
                Aucune tâche
              </div>
            ) : (
              column.tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`mb-3 p-3 bg-white border rounded-lg shadow-sm hover:shadow-md transition-all ${
                        editingTask?.id === task.id ? 'ring-2 ring-finance-primary' : ''
                      }`}
                    >
                      {editingTask?.id === task.id ? (
                        <div className="space-y-3">
                          <textarea
                            value={editContent}
                            onChange={e => onEditChange('content', e.target.value)}
                            className="w-full p-2 border rounded resize-none focus:outline-none focus:ring-1 focus:ring-finance-primary"
                            rows={2}
                          />
                          <div className="flex flex-col space-y-2">
                            <input
                              type="date"
                              value={editDueDate}
                              onChange={e => onEditChange('dueDate', e.target.value)}
                              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-finance-primary"
                            />
                            <select
                              value={editPriority}
                              onChange={e => onEditChange('priority', e.target.value)}
                              className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-finance-primary"
                            >
                              <option value="low">Faible</option>
                              <option value="medium">Moyenne</option>
                              <option value="high">Élevée</option>
                            </select>
                          </div>
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={onCancelEdit}
                              className="p-2 rounded hover:bg-gray-100"
                              aria-label="Annuler"
                            >
                              <X size={18} className="text-gray-500" />
                            </button>
                            <button
                              onClick={onSaveEdit}
                              className="p-2 rounded hover:bg-green-100"
                              aria-label="Enregistrer"
                            >
                              <Check size={18} className="text-green-600" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between items-start mb-2">
                            <p className="text-gray-900 font-medium break-words pr-2 flex-1">
                              {task.content}
                            </p>
                            <div className="flex shrink-0 ml-1">
                              <button
                                onClick={() => onStartEdit(task, column.id)}
                                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                                aria-label="Modifier"
                              >
                                <Edit size={14} className="text-gray-500" />
                              </button>
                              <button
                                onClick={() => onToggleDeleteConfirm(task.id)}
                                className="p-1.5 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
                                aria-label="Supprimer"
                              >
                                <Trash2 size={14} className="text-gray-500" />
                              </button>
                            </div>
                          </div>

                          {showDeleteConfirm === task.id && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-red-50 p-2 rounded-md mb-2 text-sm"
                            >
                              <p className="text-red-800 mb-1">Supprimer cette tâche ?</p>
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => onToggleDeleteConfirm(null)}
                                  className="px-2 py-1 bg-white rounded border border-gray-300 text-xs"
                                >
                                  Annuler
                                </button>
                                <button
                                  onClick={() => onDeleteTask(task.id, column.id)}
                                  className="px-2 py-1 bg-red-600 text-white rounded text-xs"
                                >
                                  Confirmer
                                </button>
                              </div>
                            </motion.div>
                          )}

                          <div className="flex items-center justify-between text-xs mt-2">
                            {task.dueDate && (
                              <div className="bg-gray-100 px-2 py-1 rounded text-gray-700">
                                Échéance : {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                              </div>
                            )}
                            {task.priority && (
                              <div
                                className={`${getPriorityStyles(task.priority).bg} ${
                                  getPriorityStyles(task.priority).text
                                } px-2 py-1 rounded ml-auto`}
                              >
                                {task.priority === 'high'
                                  ? 'Élevée'
                                  : task.priority === 'medium'
                                  ? 'Moyenne'
                                  : 'Faible'}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
