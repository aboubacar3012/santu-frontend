'use client';;
import Sidebar from '@/src/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row w-full h-screen gap-10">
      {/* Left Section */}
      <Sidebar />
      {/* Right Section */}
      <div className="w-8/12 h-[98] my-4 overflow-y-auto flex flex-col">
        {children}
      </div>
    </div>
  );
}
