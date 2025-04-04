'use client';

import { useState, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Save } from 'lucide-react';

interface SettingItem {
  id: string;
  label: string;
  description?: string;
  type: 'toggle' | 'text' | 'number' | 'select' | 'textarea';
  value: any;
  options?: { label: string; value: any }[];
}

interface AdminSettingsCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  settings: SettingItem[];
  onSave?: (settings: SettingItem[]) => void;
  defaultExpanded?: boolean;
}

const AdminSettingsCard = ({
  title,
  description,
  icon,
  settings,
  onSave,
  defaultExpanded = false,
}: AdminSettingsCardProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [settingsValues, setSettingsValues] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSettingChange = (id: string, value: any) => {
    setSettingsValues((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const handleSave = () => {
    if (onSave) {
      setIsSaving(true);
      
      // Simuler un délai pour l'effet visuel
      setTimeout(() => {
        onSave(settingsValues);
        setIsSaving(false);
      }, 800);
    }
  };

  const renderSettingControl = (setting: SettingItem) => {
    switch (setting.type) {
      case 'toggle':
        return (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={setting.value}
              onChange={(e) => handleSettingChange(setting.id, e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-finance-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-finance-primary"></div>
          </label>
        );
      
      case 'text':
        return (
          <input
            type="text"
            value={setting.value}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-finance-border rounded-md shadow-sm focus:outline-none focus:ring-finance-primary focus:border-finance-primary sm:text-sm"
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={setting.value}
            onChange={(e) => handleSettingChange(setting.id, parseFloat(e.target.value))}
            className="mt-1 block w-full px-3 py-2 bg-white border border-finance-border rounded-md shadow-sm focus:outline-none focus:ring-finance-primary focus:border-finance-primary sm:text-sm"
          />
        );
      
      case 'select':
        return (
          <select
            value={setting.value}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-finance-border rounded-md shadow-sm focus:outline-none focus:ring-finance-primary focus:border-finance-primary sm:text-sm"
          >
            {setting.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'textarea':
        return (
          <textarea
            value={setting.value}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            rows={3}
            className="mt-1 block w-full px-3 py-2 bg-white border border-finance-border rounded-md shadow-sm focus:outline-none focus:ring-finance-primary focus:border-finance-primary sm:text-sm"
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow overflow-hidden border border-finance-border"
    >
      <div
        className="p-5 border-b border-finance-border cursor-pointer hover:bg-finance-bg-light transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && <div className="text-finance-primary">{icon}</div>}
            <div>
              <h3 className="text-lg font-semibold text-finance-text-primary">{title}</h3>
              {description && (
                <p className="text-sm text-finance-text-secondary mt-1">{description}</p>
              )}
            </div>
          </div>
          <div>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-finance-text-secondary" />
            ) : (
              <ChevronDown className="h-5 w-5 text-finance-text-secondary" />
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <>
          <div className="p-5 space-y-6">
            {settingsValues.map((setting) => (
              <div key={setting.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium text-finance-text-primary">
                      {setting.label}
                    </label>
                    {setting.description && (
                      <p className="mt-1 text-xs text-finance-text-secondary">
                        {setting.description}
                      </p>
                    )}
                  </div>
                  {setting.type === 'toggle' && renderSettingControl(setting)}
                </div>
                {setting.type !== 'toggle' && renderSettingControl(setting)}
              </div>
            ))}
          </div>

          <div className="px-5 py-4 bg-finance-bg-light border-t border-finance-border flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 bg-finance-primary text-white rounded-md hover:bg-finance-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-finance-primary disabled:opacity-70 transition-colors"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default AdminSettingsCard;