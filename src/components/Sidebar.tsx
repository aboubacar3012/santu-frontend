'use client';
import Link from 'next/link';
import { MdDashboard } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/src/redux/features/authSlice';
import { useRouter, usePathname } from 'next/navigation';
import { FaUserCog, FaUsers } from 'react-icons/fa';
import { LogOut, Settings, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { RootState } from '@/src/redux/store';
import { useCallback, memo, useState } from 'react';
import Button from './shared/Button';

// Memoize menu item to prevent unnecessary re-renders
const MenuItem = memo(
  ({
    name,
    icon,
    href,
    isActive,
    collapsed,
  }: {
    name: string;
    icon: React.ReactNode;
    href: string;
    isActive: boolean;
    collapsed: boolean;
  }) => {
    return (
      <Link href={href}>
        <div
          className={`flex items-center ${
            collapsed ? 'justify-center' : 'justify-start'
          } w-full rounded-lg my-1 gap-3 p-3 relative overflow-hidden ${
            isActive ? 'text-white' : 'hover:bg-gray-100/80 text-gray-900'
          }`}
          title={collapsed ? name : ''}
        >
          {isActive && (
            <div className="absolute inset-0 bg-gradient-to-r from-finance-primary to-finance-secondary rounded-lg -z-0" />
          )}
          <div
            className={`relative z-10 flex items-center ${collapsed ? 'justify-center' : ''} ${
              collapsed ? 'gap-0' : 'gap-3'
            }`}
          >
            <div>{icon}</div>
            {!collapsed && <span className="text-base font-medium">{name}</span>}
          </div>
        </div>
      </Link>
    );
  }
);

MenuItem.displayName = 'MenuItem';

const Sidebar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);
  const accountId = auth.loggedAccountInfos?._id;
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    {
      roles: ['partner'],
      name: 'Tableau de bord',
      icon: <MdDashboard className="w-6 h-6" />,
      href: '/dashboard',
      isActive: pathname === '/dashboard' || pathname.includes('/dashboard/invoice'),
    },
    {
      roles: ['partner'],
      name: 'Clients',
      icon: <FaUsers className="w-6 h-6" />,
      href: `/dashboard/clients`,
      isActive: pathname.includes('/dashboard/clients'),
    },
  ];

  const handleLogout = useCallback(() => {
    dispatch(logout());
    return router.push('/');
  }, [dispatch, router]);

  return (
    <div
      className={`relative flex flex-col h-screen bg-finance-bg-light backdrop-blur-md text-finance-text-primary rounded-r-xl shadow-lg no-print overflow-hidden ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex justify-between items-center h-20 w-full px-3">
        {!collapsed && (
          <Link href="/dashboard">
            <h3 className="text-2xl text-center font-sans font-bold bg-gradient-to-r from-finance-primary to-finance-tertiary bg-clip-text text-transparent">
              Santou Pro
            </h3>
          </Link>
        )}

        <button
          className={`${
            collapsed ? 'mx-auto' : 'ml-auto'
          } p-2 rounded-full bg-finance-bg-medium hover:bg-finance-border transition-colors`}
          onClick={toggleSidebar}
          aria-label={collapsed ? 'Déplier le panneau' : 'Replier le panneau'}
        >
          {collapsed ? (
            <PanelLeftOpen className="w-5 h-5" />
          ) : (
            <PanelLeftClose className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="h-0.5 w-full bg-finance-border"></div>

      <div className="flex flex-col items-start justify-center w-full gap-1 px-3 py-4 overflow-y-auto">
        <div className="w-full space-y-1">
          {menuItems.map(item => (
            <MenuItem
              key={item.name}
              name={item.name}
              icon={item.icon}
              href={item.href}
              isActive={item.isActive}
              collapsed={collapsed}
            />
          ))}
        </div>

        <hr className="w-full border-finance-border my-2" />

        <div className="w-full space-y-1">
          <MenuItem
            name="Mon compte"
            icon={<FaUserCog className="w-6 h-6" />}
            href={`/dashboard/account/${accountId}`}
            isActive={pathname.includes('/dashboard/account/')}
            collapsed={collapsed}
          />

          <MenuItem
            name="Administration"
            icon={<Settings className="w-6 h-6" />}
            href={`/dashboard/admin/${accountId}`}
            isActive={pathname.includes('/dashboard/admin/')}
            collapsed={collapsed}
          />
        </div>
      </div>

      <div className="absolute bottom-8 flex flex-col items-center justify-center w-full">
        {collapsed ? (
          <Button
            onClick={handleLogout}
            variant="danger"
            className="flex items-center justify-start gap-2 hover:bg-finance-bg-medium transition-colors"
            icon={<LogOut className="w-5 h-5" />}
            iconPosition="left"
          >
            {''}
          </Button>
        ) : (
          <Button
            onClick={handleLogout}
            variant="danger"
            className="flex items-center justify-start gap-2 hover:bg-finance-bg-medium transition-colors"
            icon={<LogOut className="w-5 h-5" />}
            iconPosition="left"
          >
            Déconnexion
          </Button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
