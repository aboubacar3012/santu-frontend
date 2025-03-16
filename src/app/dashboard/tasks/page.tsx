'use client';

import { useState, useRef, useEffect } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Clock,
  PlusCircle,
  Search,
  Filter,
  Plus,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Column, Task } from '@/src/types/task';
import { TaskForm } from '@/src/components/tasks/TaskForm';
import { TaskFilters } from '@/src/components/tasks/TaskFilters';
import { TaskColumn } from '@/src/components/tasks/TaskColumn';
import Modal from '@/src/components/ui/Modal';

const TasksPage = () => {
  const [columns, setColumns] = useState<{ [key: string]: Column }>({
    todo: {
      id: 'todo',
      title: 'À faire',
      tasks: [
        {
          id: 'task-1',
          content: 'Envoyer la facture au client ABC',
          dueDate: '2023-12-25',
          priority: 'high',
        },
        {
          id: 'task-2',
          content: 'Relancer le paiement du client XYZ',
          dueDate: '2023-12-20',
          priority: 'medium',
        },
      ],
      icon: <ArrowRight className="text-amber-500" />,
      color: 'border-amber-500',
    },
    inProgress: {
      id: 'inProgress',
      title: 'En cours',
      tasks: [
        {
          id: 'task-3',
          content: 'Préparer les états financiers du mois',
          dueDate: '2023-12-15',
          priority: 'high',
        },
      ],
      icon: <Clock className="text-blue-500" />,
      color: 'border-blue-500',
    },
    done: {
      id: 'done',
      title: 'Terminé',
      tasks: [
        {
          id: 'task-4',
          content: 'Vérifier les paiements entrants',
          dueDate: '2023-12-10',
          priority: 'low',
        },
      ],
      icon: <CheckCircle className="text-green-500" />,
      color: 'border-green-500',
    },
  });

  const [newTaskContent, setNewTaskContent] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [editingTask, setEditingTask] = useState<{ id: string; columnId: string } | null>(null);
  const [editContent, setEditContent] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [editPriority, setEditPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  // Référence pour scroll horizontal des colonnes sur mobile
  const columnContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollIcons, setShowScrollIcons] = useState(false);

  // Vérifier si on doit afficher les icônes de scroll sur les petits écrans
  useEffect(() => {
    const checkForScroll = () => {
      if (columnContainerRef.current) {
        const container = columnContainerRef.current;
        setShowScrollIcons(container.scrollWidth > container.clientWidth);
      }
    };

    checkForScroll();
    window.addEventListener('resize', checkForScroll);

    return () => window.removeEventListener('resize', checkForScroll);
  }, []);

  const scrollColumns = (direction: 'left' | 'right') => {
    if (columnContainerRef.current) {
      const scrollAmount = 300;
      columnContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    if (sourceColumn === destColumn) {
      const newTasks = Array.from(sourceColumn.tasks);
      const movedTask = newTasks.splice(source.index, 1)[0];
      newTasks.splice(destination.index, 0, movedTask);

      const newColumn = {
        ...sourceColumn,
        tasks: newTasks,
      };

      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      });
    } else {
      const sourceTasks = Array.from(sourceColumn.tasks);
      const destTasks = Array.from(destColumn.tasks);
      const movedTask = sourceTasks.splice(source.index, 1)[0];
      destTasks.splice(destination.index, 0, movedTask);

      setColumns({
        ...columns,
        [sourceColumn.id]: {
          ...sourceColumn,
          tasks: sourceTasks,
        },
        [destColumn.id]: {
          ...destColumn,
          tasks: destTasks,
        },
      });
    }
  };

  const addTask = () => {
    if (newTaskContent.trim() === '') return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      content: newTaskContent,
      dueDate: newTaskDueDate || undefined,
      priority: newTaskPriority,
    };

    const todoColumn = columns.todo;
    const updatedTodoColumn = {
      ...todoColumn,
      tasks: [...todoColumn.tasks, newTask],
    };

    setColumns({
      ...columns,
      todo: updatedTodoColumn,
    });

    setNewTaskContent('');
    setNewTaskDueDate('');
    setNewTaskPriority('medium');

    // Fermer le modal après l'ajout
    setIsAddTaskModalOpen(false);
  };

  const deleteTask = (taskId: string, columnId: string) => {
    const column = columns[columnId];
    const updatedTasks = column.tasks.filter(task => task.id !== taskId);

    setColumns({
      ...columns,
      [columnId]: {
        ...column,
        tasks: updatedTasks,
      },
    });

    setShowDeleteConfirm(null);
  };

  const startEditTask = (task: Task, columnId: string) => {
    setEditingTask({ id: task.id, columnId });
    setEditContent(task.content);
    setEditDueDate(task.dueDate || '');
    setEditPriority(task.priority);
  };

  const saveEditedTask = () => {
    if (!editingTask) return;

    const column = columns[editingTask.columnId];
    const updatedTasks = column.tasks.map(task =>
      task.id === editingTask.id
        ? {
            ...task,
            content: editContent,
            dueDate: editDueDate || undefined,
            priority: editPriority,
          }
        : task
    );

    setColumns({
      ...columns,
      [editingTask.columnId]: {
        ...column,
        tasks: updatedTasks,
      },
    });

    setEditingTask(null);
  };

  const handleEditChange = (field: string, value: string) => {
    if (field === 'content') setEditContent(value);
    else if (field === 'dueDate') setEditDueDate(value);
    else if (field === 'priority') setEditPriority(value as 'low' | 'medium' | 'high');
  };

  // Filtrer les tâches selon la recherche et la priorité
  const getFilteredColumns = () => {
    const filtered = { ...columns };

    Object.keys(filtered).forEach(columnKey => {
      const column = filtered[columnKey];
      filtered[columnKey] = {
        ...column,
        tasks: column.tasks.filter(task => {
          const matchesSearch =
            searchTerm === '' || task.content.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
          return matchesSearch && matchesPriority;
        }),
      };
    });

    return filtered;
  };

  const filteredColumns = getFilteredColumns();

  // État pour suivre l'onglet actif sur mobile
  const [activeTab, setActiveTab] = useState<'add' | 'filter'>('add');

  // État pour gérer l'ouverture du modal d'ajout de tâche
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  return (
    <div className="relative p-4 md:p-8 bg-gray-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 flex items-center gap-3">
          <span className="bg-finance-primary/15 p-2.5 rounded-lg shadow-sm">
            <CheckCircle size={28} className="text-finance-primary" />
          </span>
          Tableau des tâches
        </h1>
        <p className="text-gray-600 text-lg">Gérez et organisez vos tâches professionnelles</p>
      </motion.div>

      {/* Section de filtre avec ajustements */}
      <div className="mb-10">
        <motion.div
          initial={{ opacity: 0, x: 0, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 w-full"
        >
          <TaskFilters
            searchTerm={searchTerm}
            filterPriority={filterPriority}
            onSearchChange={setSearchTerm}
            onFilterChange={setFilterPriority}
          />
        </motion.div>
      </div>

      <div className="relative">
        {showScrollIcons && (
          <>
            <button
              onClick={() => scrollColumns('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 p-3 rounded-full shadow-md hover:bg-gray-100 transition-all md:hidden"
              aria-label="Défiler vers la gauche"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => scrollColumns('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 p-3 rounded-full shadow-md hover:bg-gray-100 transition-all md:hidden"
              aria-label="Défiler vers la droite"
            >
              <ArrowRight size={20} />
            </button>
          </>
        )}

        <div
          ref={columnContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 md:overflow-visible snap-x snap-mandatory md:snap-none md:grid md:grid-cols-3"
        >
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.values(filteredColumns).map((column, index) => (
              <motion.div
                key={column.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
              >
                <TaskColumn
                  column={column}
                  editingTask={editingTask}
                  showDeleteConfirm={showDeleteConfirm}
                  editContent={editContent}
                  editDueDate={editDueDate}
                  editPriority={editPriority}
                  onEditChange={handleEditChange}
                  onStartEdit={startEditTask}
                  onSaveEdit={saveEditedTask}
                  onCancelEdit={() => setEditingTask(null)}
                  onDeleteTask={deleteTask}
                  onToggleDeleteConfirm={setShowDeleteConfirm}
                />
              </motion.div>
            ))}
          </DragDropContext>
        </div>
      </div>

      {/* Bouton flottant pour ouvrir le modal d'ajout de tâche */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay: 0.5,
        }}
        onClick={() => setIsAddTaskModalOpen(true)}
        className="absolute right-6 bottom-6 z-30 flex items-center justify-center w-14 h-14 rounded-full bg-finance-primary shadow-lg hover:bg-finance-primary-dark transition-colors"
        aria-label="Ajouter une tâche"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus size={24} className="text-white" />
      </motion.button>

      {/* Modal pour l'ajout de tâche */}
      <Modal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        title="Ajouter une nouvelle tâche"
        size="medium"
      >
        <TaskForm
          content={newTaskContent}
          dueDate={newTaskDueDate}
          priority={newTaskPriority}
          onContentChange={setNewTaskContent}
          onDueDateChange={setNewTaskDueDate}
          onPriorityChange={setNewTaskPriority}
          onAddTask={addTask}
        />
      </Modal>
    </div>
  );
};

export default TasksPage;
