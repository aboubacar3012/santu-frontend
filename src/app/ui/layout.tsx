'use client';
import UISidebar from '@/src/app/ui/UISidebar';
import { useState } from 'react';

export default function UILayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar pour mobile - s'affiche comme un tiroir */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        ></div>
        <div className="fixed inset-y-0 left-0 flex flex-col w-72 bg-white border-r border-gray-200 shadow-xl">
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">SantuUI</h2>
            <button
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
              onClick={() => setSidebarOpen(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <UISidebar />
        </div>
      </div>

      {/* Sidebar pour desktop */}
      <div className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:bg-white">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">SantuUI</h2>
        </div>
        <UISidebar />
      </div>

      {/* Contenu principal */}
      <div className="lg:pl-72 flex flex-col flex-1">
        <div className="lg:hidden sticky top-0 z-10 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm">
          <button
            className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="flex-1 text-sm font-medium">SantuUI</div>
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
