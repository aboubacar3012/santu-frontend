import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type IconPosition = 'left' | 'right';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  fullWidth?: boolean;
}

const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  className = '',
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
}: ButtonProps) => {
  // Définitions des classes en fonction des variants
  const variantClasses = {
    primary:
      'bg-gradient-to-r from-finance-primary to-finance-secondary text-white shadow-[0_4px_9px_-4px_rgba(30,77,216,0.5)]',
    secondary:
      'bg-white text-finance-text-primary border border-finance-border hover:bg-finance-bg-medium shadow-sm',
    danger:
      'bg-finance-error hover:bg-red-600 text-white shadow-[0_4px_9px_-4px_rgba(229,62,62,0.5)]',
  };

  // Définitions des tailles
  const sizeClasses = {
    sm: 'text-xs py-2 px-3 rounded-md',
    md: 'text-sm py-2.5 px-4 rounded-lg',
    lg: 'text-base py-3 px-6 rounded-lg',
  };

  // États et animations
  const isDisabled = disabled || loading;

  // Animations
  const buttonVariants = {
    initial: {
      y: 0,
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    hover: {
      y: -3,
      boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.97,
      y: 0,
      boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.1 },
    },
    disabled: {
      opacity: 0.6,
      boxShadow: 'none',
      y: 0,
    },
  };

  // Animation pour l'icône
  const iconAnimation = {
    hover: {
      rotate: iconPosition === 'right' ? 10 : -10,
      scale: 1.2,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        select-none font-sans font-medium text-center transition-colors
        flex items-center justify-center gap-2
        ${variantClasses[variant]} 
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
        ${className}
      `}
      initial="initial"
      whileHover={!isDisabled ? 'hover' : 'disabled'}
      whileTap={!isDisabled ? 'tap' : 'disabled'}
      animate={isDisabled ? 'disabled' : 'initial'}
      variants={buttonVariants}
    >
      {loading && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mr-2"
        >
          <Loader2 className="h-4 w-4 animate-spin" />
        </motion.span>
      )}

      {icon && iconPosition === 'left' && !loading && (
        <motion.span variants={iconAnimation}>{icon}</motion.span>
      )}

      <span>{children}</span>

      {icon && iconPosition === 'right' && !loading && (
        <motion.span variants={iconAnimation}>{icon}</motion.span>
      )}
    </motion.button>
  );
};

export default Button;
