'use client';

import { ReactNode, useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, item: any) => ReactNode;
}

interface AdminDataTableProps {
  columns: Column[];
  data: any[];
  title: string;
  onRowClick?: (item: any) => void;
  searchable?: boolean;
  filterable?: boolean;
}

const AdminDataTable = ({
  columns,
  data,
  title,
  onRowClick,
  searchable = true,
  filterable = true,
}: AdminDataTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  // Filtrer les données en fonction de la recherche
  const filteredData = data.filter((item) => 
    Object.values(item).some(
      (value) => 
        value && 
        value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );
  
  // Paginer les données
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden border border-finance-border">
      <div className="p-5 border-b border-finance-border">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-finance-text-primary">{title}</h2>
          
          <div className="flex items-center gap-3">
            {searchable && (
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-finance-text-secondary" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-finance-border rounded-lg text-sm focus:ring-1 focus:ring-finance-primary focus:border-finance-primary outline-none"
                />
              </div>
            )}
            
            {filterable && (
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 border border-finance-border rounded-lg hover:bg-finance-bg-light"
              >
                <Filter className="h-5 w-5 text-finance-text-secondary" />
              </button>
            )}
          </div>
        </div>
        
        {showFilters && (
          <div className="mt-4 p-4 border border-finance-border rounded-lg bg-finance-bg-light">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-finance-text-secondary mb-1">
                  Status
                </label>
                <select className="w-full border border-finance-border rounded-lg p-2 text-sm">
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-finance-text-secondary mb-1">
                  Date Range
                </label>
                <input 
                  type="date" 
                  className="w-full border border-finance-border rounded-lg p-2 text-sm" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-finance-text-secondary mb-1">
                  Sort By
                </label>
                <select className="w-full border border-finance-border rounded-lg p-2 text-sm">
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-finance-bg-light">
              {columns.map((column) => (
                <th 
                  key={column.key} 
                  className="px-6 py-3 text-left text-xs font-medium text-finance-text-secondary uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-finance-border">
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr 
                  key={index}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={onRowClick ? "hover:bg-finance-bg-light cursor-pointer" : ""}
                >
                  {columns.map((column) => (
                    <td 
                      key={column.key} 
                      className="px-6 py-4 whitespace-nowrap text-sm text-finance-text-primary"
                    >
                      {column.render 
                        ? column.render(item[column.key], item)
                        : item[column.key]
                      }
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length}
                  className="px-6 py-4 text-center text-sm text-finance-text-secondary"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="px-5 py-4 border-t border-finance-border flex items-center justify-between">
          <div className="text-sm text-finance-text-secondary">
            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, filteredData.length)}
            </span>{' '}
            of <span className="font-medium">{filteredData.length}</span> results
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md border border-finance-border disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = currentPage <= 3 
                  ? i + 1 
                  : currentPage >= totalPages - 2 
                    ? totalPages - 4 + i 
                    : currentPage - 2 + i;
                    
                if (pageNum > 0 && pageNum <= totalPages) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === pageNum
                          ? 'bg-finance-primary text-white'
                          : 'hover:bg-finance-bg-light'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
                return null;
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md border border-finance-border disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDataTable;