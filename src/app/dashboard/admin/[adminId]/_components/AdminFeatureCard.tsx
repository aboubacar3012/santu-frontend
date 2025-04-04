'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface AdminFeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  bgColor?: string;
}

const AdminFeatureCard = ({
  title,
  description,
  icon,
  href,
  bgColor = 'bg-white',
}: AdminFeatureCardProps) => {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className={`flex flex-col p-6 rounded-xl ${bgColor} shadow-md border border-finance-border hover:shadow-lg cursor-pointer transition-shadow`}
      >
        <div className="p-3 rounded-full bg-finance-primary/10 w-fit mb-4">
          <div className="text-finance-primary">{icon}</div>
        </div>
        <h3 className="text-lg font-semibold text-finance-text-primary mb-2">{title}</h3>
        <p className="text-sm text-finance-text-secondary mt-1">{description}</p>
      </motion.div>
    </Link>
  );
};

export default AdminFeatureCard;