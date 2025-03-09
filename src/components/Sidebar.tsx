'use client';
import Link from 'next/link';
import { MdDashboard } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/src/redux/features/authSlice';
import { useRouter, usePathname } from 'next/navigation';
import { FaUserCog, FaUsers } from 'react-icons/fa';
import { Settings } from 'lucide-react';
import { RootState } from '@/src/redux/store';
import { motion } from 'framer-motion';
import { useCallback, memo } from 'react';

// Memoize menu item to prevent unnecessary re-renders
const MenuItem = memo(
  ({
    name,
    icon,
    href,
    isActive,
  }: {
    name: string;
    icon: React.ReactNode;
    href: string;
    isActive: boolean;
  }) => {
    return (
      <Link href={href}>
        <motion.div
          className={`flex items-center justify-start w-full rounded-lg my-1 gap-3 p-3 relative overflow-hidden ${
            isActive ? 'text-white' : 'hover:bg-gray-100/80 text-gray-700'
          }`}
          whileHover={{
            scale: isActive ? 1.01 : 1.02,
            transition: { duration: 0.2 },
          }}
        >
          {isActive && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-my-raspberry to-my-eggplant rounded-lg -z-0"
              layoutId="activeMenuItem"
              initial={{ borderRadius: 8 }}
              animate={{ borderRadius: 8 }}
              transition={{
                type: 'spring',
                stiffness: 600,
                damping: 35,
              }}
            />
          )}
          <div className="relative z-10 flex items-center gap-3">
            <motion.div
              initial={false}
              whileHover={{
                rotate: 5,
                transition: { duration: 0.2 },
              }}
            >
              {icon}
            </motion.div>
            <span className="text-base font-medium">{name}</span>
          </div>
        </motion.div>
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

  const menuItems = [
    {
      roles: ['partner'],
      name: 'Tableau de bord',
      icon: <MdDashboard className="w-6 h-6" />,
      href: '/dashboard',
      isActive: pathname === '/dashboard',
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

  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <motion.div
      className="relative flex flex-col w-64 h-screen bg-gray-50/80 backdrop-blur-md text-black rounded-r-xl shadow-lg no-print"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col items-center justify-center h-20 w-full">
        <Link href="/dashboard">
          <motion.h3
            className="text-2xl font-sans font-bold bg-gradient-to-r from-my-raspberry to-my-eggplant bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            Santou Pro
          </motion.h3>
        </Link>
      </div>

      <div className="h-0.5 w-full bg-gray-200/50"></div>

      <div className="flex flex-col items-start justify-center w-full gap-1 px-3 py-4 overflow-y-auto">
        <motion.div className="w-full space-y-1" variants={itemVariants}>
          {menuItems.map(item => (
            <MenuItem
              key={item.name}
              name={item.name}
              icon={item.icon}
              href={item.href}
              isActive={item.isActive}
            />
          ))}
        </motion.div>

        <motion.hr
          className="w-full border-gray-200 my-2"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />

        <motion.div className="w-full space-y-1" variants={itemVariants}>
          <MenuItem
            name="Mon compte"
            icon={<FaUserCog className="w-6 h-6" />}
            href={`/dashboard/account/${accountId}`}
            isActive={pathname.includes('/dashboard/account/')}
          />

          <MenuItem
            name="Administration"
            icon={<Settings className="w-6 h-6" />}
            href={`/dashboard/admin/${accountId}`}
            isActive={pathname.includes('/dashboard/admin/')}
          />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 flex flex-col items-center justify-center w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          className="w-48 p-2 text-lg font-sans font-normal text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-md"
          onClick={handleLogout}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Déconnexion
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;
