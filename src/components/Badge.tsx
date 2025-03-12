import { StatusEnum } from '../types';

type BadgeProps = {
  type: StatusEnum;
  text: string;
};
const Badge = ({ type, text }: BadgeProps) => {
  const styleByType = {
    DRAFT: 'bg-amber-100 text-amber-600',
    PAID: 'bg-green-100 text-green-600',
    SENT: 'bg-yellow-100 text-yellow-800',
    CANCELLED: 'bg-red-100 text-red-800',
    UNPAID: 'bg-red-100 text-red-600',
  };

  return (
    <p
      className={`text-xs max-w-min text-nowrap font-medium px-4 py-2 rounded ${styleByType[type]}`}
    >
      {text}
    </p>
  );
};

export default Badge;
