'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type ComponentCategory = {
  title: string;
  components: {
    name: string;
    path: string;
  }[];
};

const componentCategories: ComponentCategory[] = [
  {
    title: 'Inputs',
    components: [
      { name: 'Button', path: '/ui/buttons' },
      { name: 'Input', path: '/ui/inputs' },
      { name: 'Select', path: '/ui/selects' },
      { name: 'Checkbox', path: '/ui/checkboxes' },
      { name: 'Radio', path: '/ui/radios' },
    ],
  },
  {
    title: 'Data Display',
    components: [
      { name: 'Table', path: '/ui/tables' },
      { name: 'Card', path: '/ui/cards' },
      { name: 'Badge', path: '/ui/badges' },
      { name: 'Avatar', path: '/ui/avatars' },
    ],
  },
  {
    title: 'Feedback',
    components: [
      { name: 'Alert', path: '/ui/alerts' },
      { name: 'Toast', path: '/ui/toasts' },
      { name: 'Progress', path: '/ui/progress' },
    ],
  },
  {
    title: 'Navigation',
    components: [
      { name: 'Tabs', path: '/ui/tabs' },
      { name: 'Breadcrumb', path: '/ui/breadcrumbs' },
      { name: 'Pagination', path: '/ui/pagination' },
    ],
  },
];

const UISidebar = () => {
  const pathname = usePathname();

  return (
    <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
      <nav className="px-3 space-y-6">
        <Link
          href="/ui"
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
            pathname === '/ui' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-900 hover:bg-gray-100'
          }`}
        >
          Vue d'ensemble
        </Link>

        {componentCategories.map(category => (
          <div key={category.title}>
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {category.title}
            </h3>
            <div className="mt-2 space-y-1">
              {category.components.map(component => (
                <Link
                  key={component.path}
                  href={component.path}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    pathname === component.path
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {component.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default UISidebar;
