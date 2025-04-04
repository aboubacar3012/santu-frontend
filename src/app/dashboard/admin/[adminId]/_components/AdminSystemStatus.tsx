'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatusItem {
  name: string;
  status: 'healthy' | 'warning' | 'error';
  message?: string;
  lastUpdated: string;
}

interface AdminSystemStatusProps {
  statuses: StatusItem[];
  onRefresh?: () => void;
}

const AdminSystemStatus = ({ statuses, onRefresh }: AdminSystemStatusProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    if (onRefresh) {
      setIsRefreshing(true);
      
      // Simuler un délai pour l'effet visuel
      setTimeout(() => {
        onRefresh();
        setIsRefreshing(false);
      }, 1000);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden border border-finance-border">
      <div className="p-5 border-b border-finance-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-finance-text-primary">System Status</h2>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-finance-bg-light hover:bg-finance-bg-medium rounded-md transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
        <p className="text-sm text-finance-text-secondary mt-1">
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>

      <div className="p-5">
        <div className="space-y-4">
          {statuses.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${getStatusClass(item.status)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(item.status)}
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    {item.message && (
                      <p className="text-sm mt-0.5">{item.message}</p>
                    )}
                  </div>
                </div>
                <div className="text-xs text-finance-text-secondary">
                  {item.lastUpdated}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSystemStatus;