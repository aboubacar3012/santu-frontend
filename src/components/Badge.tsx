type BadgeProps = {
  type: 'success' | 'error' | 'info' | 'warning' | 'neutral';
  text: string;
};
const Badge = ({ type, text }: BadgeProps) => {
  const styleByType = {
    success: 'bg-finance-success bg-opacity-20 text-finance-success',
    error: 'bg-finance-error bg-opacity-20 text-finance-error',
    info: 'bg-finance-info bg-opacity-20 text-finance-info',
    warning: 'bg-finance-warning bg-opacity-20 text-finance-warning',
    neutral: 'bg-finance-border text-finance-text-secondary',
  };

  return (
    <p className={`text-xs font-medium px-4 py-2 rounded ${type} ${styleByType[type]}`}>{text}</p>
  );
};

export default Badge;
