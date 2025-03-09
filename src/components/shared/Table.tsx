import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type Column<T> = {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  className?: string;
  headerClassName?: string;
  rowClassName?: (item: T, index: number) => string;
};

const Table = <T extends Record<string, any>>({
  columns,
  data,
  onRowClick,
  className = 'w-full text-sm text-left text-black',
  headerClassName = 'text-xs uppercase bg-gradient-to-r from-my-raspberry to-my-eggplant',
  rowClassName = (item, index) => 'border-b cursor-pointer hover:bg-gray-200',
}: TableProps<T>) => {
  // État pour suivre la ligne survolée
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.05,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="relative overflow-hidden shadow-md rounded-lg mt-4 bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      whileHover={{ boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.08)' }}
      transition={{ duration: 0.4 }}
    >
      <motion.div className="overflow-x-auto overflow-y-hidden" layout>
        <table className={className}>
          <motion.thead className={headerClassName} variants={headerVariants}>
            <tr>
              {columns.map((column, index) => (
                <motion.th
                  key={index}
                  scope="col"
                  className={`px-4 py-3 text-white ${column.className || ''}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  {column.header}
                </motion.th>
              ))}
            </tr>
          </motion.thead>
          <AnimatePresence>
            <motion.tbody layout>
              {data.map((item, index) => (
                <motion.tr
                  key={index}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={`${rowClassName(item, index)} relative`}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  onMouseEnter={() => setHoveredRowIndex(index)}
                  onMouseLeave={() => setHoveredRowIndex(null)}
                  transition={{
                    duration: 0.2,
                    delay: index * 0.03,
                  }}
                  layout
                  whileHover={{
                    // backgroundColor: 'rgba(229, 231, 235, 0.7)',
                    scaleY: 1.05, // Étirement vertical uniquement
                    scaleX: 1, // Pas d'étirement horizontal
                    transition: { duration: 0.2 },
                  }}
                >
                  {columns.map((column, colIndex) => (
                    <motion.td
                      key={colIndex}
                      className={`px-4 ${column.className || ''}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: colIndex * 0.02, duration: 0.2 }}
                      style={{
                        paddingTop:
                          hoveredRowIndex === index ? '1.1rem' : '1rem',
                        paddingBottom:
                          hoveredRowIndex === index ? '1.1rem' : '1rem',
                        transition: 'padding 0.2s ease',
                      }}
                    >
                      {typeof column.accessor === 'function'
                        ? column.accessor(item)
                        : item[column.accessor]}
                    </motion.td>
                  ))}
                </motion.tr>
              ))}
            </motion.tbody>
          </AnimatePresence>
        </table>
      </motion.div>

      {data.length === 0 && (
        <motion.div
          className="flex justify-center items-center p-8 text-gray-500"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Aucune donnée disponible
        </motion.div>
      )}
    </motion.div>
  );
};

export default Table;
