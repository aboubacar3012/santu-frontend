import { CheckCircle, XCircle, FileEdit } from 'lucide-react';
import { StatusEnum } from '@/src/types';

type StampType = keyof typeof StatusEnum;

interface StampProps {
  type?: StampType;
}

const Stamp = ({ type = StatusEnum.PAID }: StampProps) => {
  // Configuration pour chaque type de tampon
  const stampConfig = {
    PAID: {
      borderColor: 'border-green-500',
      textColor: 'text-green-600',
      shadowColor: 'rgba(34, 197, 94, 0.3)',
      icon: <CheckCircle size={32} className="text-green-600" />,
      text: 'PAYÉ',
    },
    DRAFT: {
      borderColor: 'border-amber-500',
      textColor: 'text-amber-600',
      shadowColor: 'rgba(245, 158, 11, 0.3)',
      icon: <FileEdit size={32} className="text-amber-600" />,
      text: 'BROUILLON',
    },
    CANCELLED: {
      borderColor: 'border-red-500',
      textColor: 'text-red-600',
      shadowColor: 'rgba(239, 68, 68, 0.3)',
      icon: <XCircle size={32} className="text-red-600" />,
      text: 'ANNULÉ',
    },
    PENDING: {
      borderColor: 'border-blue-500',
      textColor: 'text-blue-600',
      shadowColor: 'rgba(59, 130, 246, 0.3)',
      icon: <FileEdit size={32} className="text-blue-600" />,
      text: 'EN ATTENTE',
    },
  };

  const config = stampConfig[type];

  return (
    <div className="relative">
      <div
        className={`flex w-64 justify-center items-center gap-4 border-4 ${config.borderColor} ${config.textColor} px-4 py-2 rounded-lg text-lg font-bold opacity-90`}
        style={{
          transform: 'rotate(-12deg)',
          boxShadow: `0 0 0 2px ${config.shadowColor}`,
        }}
      >
        {config.icon}
        <span className="text-2xl">{config.text}</span>
      </div>
    </div>
  );
};

export default Stamp;
