'use client';
import Link from 'next/link';
import { MdDashboard, MdOutlinePhoneInTalk } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/src/redux/features/authSlice';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { FaUserCog, FaUsers } from 'react-icons/fa';
import { Settings } from 'lucide-react';
import { RootState } from '@/src/redux/store';
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
