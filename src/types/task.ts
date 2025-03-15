export type Task = {
  id: string;
  content: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
};

export type Column = {
  id: string;
  title: string;
  tasks: Task[];
  icon: React.ReactNode;
  color: string;
};
