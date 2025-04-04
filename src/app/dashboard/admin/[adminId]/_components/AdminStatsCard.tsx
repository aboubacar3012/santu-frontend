'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AdminStatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  bgColor?: string;
  textColor?: string;
}

const AdminStatsCard = ({
  title,
  value,
  icon,
  trend,
  bgColor = 'from-finance-primary to-finance-secondary',
  textColor = 'text-white',
}: AdminStatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative flex flex-col p-6 rounded-xl overflow-hidden shadow-md bg-gradient-to-r ${bgColor}`}
    >
      <div className={`flex items-center justify-between ${textColor}`}>
        <div>
          <p className="text-sm font-medium opacity-85">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {trend && (
            <div className="flex items-center mt-1 text-sm">
              <span
                className={`mr-1 ${
                  trend.isPositive ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="opacity-75">vs last month</span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-full bg-white/10">{icon}</div>
      </div>
      <div className="absolute -bottom-2 -right-2 opacity-10 text-6xl">{icon}</div>
    </motion.div>
  );
};

export default AdminStatsCard;