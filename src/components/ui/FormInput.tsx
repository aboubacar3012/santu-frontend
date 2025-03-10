import React, { ReactNode, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormInputProps {
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
  required?: boolean;
  error?: string | null;
  className?: string;
  rows?: number;
  min?: number;
  max?: number;
}

// Définir les variants d'animation en dehors du composant
// pour éviter de les recréer à chaque rendu
const labelVariants = {
  unfocused: { opacity: 0.8, color: '#374151' },
  focused: { opacity: 1, color: '#10b981' },
};

const iconVariants = {
  unfocused: { color: '#9ca3af', scale: 1 },
  focused: { color: '#10b981', scale: 1.05 },
};

const inputVariants = {
  normal: { borderColor: '#e5e7eb', boxShadow: 'none' },
  focused: {
    borderColor: '#10b981',
    boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.2)',
  },
  error: { borderColor: '#fca5a5', boxShadow: 'none' },
};

const errorVariants = {
  hidden: { opacity: 0, y: -8, height: 0 },
  visible: { opacity: 1, y: 0, height: 'auto' },
};

const FormInput: React.FC<FormInputProps> = React.memo(
  ({
    label,
    value,
    onChange,
    type = 'text',
    placeholder,
    icon,
    required = false,
    error,
    className = '',
    rows = 2,
    min,
    max,
  }) => {
    const [isFocused, setIsFocused] = useState(false);

    // Déterminer l'état de l'input une seule fois par rendu
    const inputState = useMemo(() => {
      if (error) return 'error';
      if (isFocused) return 'focused';
      return 'normal';
    }, [error, isFocused]);

    const isTextarea = type === 'textarea';

    // Base styles for both inputs and textareas
    const baseStyles = `${icon ? 'pl-10' : 'pl-3'} w-full rounded-md border 
      ${
        error
          ? 'border-red-300'
          : isFocused
          ? 'border-green-500'
          : 'border-gray-200'
      } 
      py-2.5 pe-10 shadow-sm sm:text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 
      transition-colors duration-200`;

    return (
      <div className={`space-y-2 ${className}`}>
        <motion.label
          className="block text-sm font-medium text-gray-700"
          initial="unfocused"
          animate={isFocused ? 'focused' : 'unfocused'}
          variants={labelVariants}
          transition={{ duration: 0.2 }}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>
        <div className="relative">
          {icon && (
            <motion.span
              className={`absolute left-0 ${
                isTextarea ? 'top-3.5 pl-3' : 'inset-y-0 flex items-center pl-3'
              } pointer-events-none text-gray-400`}
              initial="unfocused"
              animate={isFocused ? 'focused' : 'unfocused'}
              variants={iconVariants}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.span>
          )}

          {isTextarea ? (
            <textarea
              value={value}
              onChange={onChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={baseStyles}
              placeholder={placeholder}
              rows={rows}
              style={{
                boxShadow: isFocused
                  ? '0 0 0 2px rgba(16, 185, 129, 0.2)'
                  : 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
            />
          ) : (
            <input
              value={value}
              onChange={onChange}
              type={type}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={baseStyles}
              placeholder={placeholder}
              min={min}
              max={max}
              style={{
                boxShadow: isFocused
                  ? '0 0 0 2px rgba(16, 185, 129, 0.2)'
                  : 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
            />
          )}
        </div>
        <AnimatePresence>
          {error && (
            <motion.p
              className="text-xs text-red-500 mt-1"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={errorVariants}
              transition={{ duration: 0.2 }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
