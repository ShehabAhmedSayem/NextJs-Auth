'use client';

import { SidebarHideIcon, SidebarShowIcon } from '@/icons';
import { filterNavigationItemsByRole } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Sidebar = ({ userRole }: { userRole: string }) => {
  const pathname = usePathname();
  const filteredNavItems = filterNavigationItemsByRole(userRole);
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = (): void => {
    setIsMinimized((prevState) => !prevState);
  };

  return (
    <div
      className={`${isMinimized ? 'w-[88px]' : 'w-[264px]'} flex h-full flex-col bg-neutral transition-all duration-300 ease-in-out`}
    >
      <nav className=" h-full w-full p-4">
        <ul className="flex w-full flex-col gap-4">
          {filteredNavItems.map((item) => (
            <li
              key={item.path}
              className="flex cursor-pointer gap-2 rounded-lg bg-neutral-100 px-4 py-2 hover:bg-neutral-200"
            >
              <div>{item.icon}</div>
              <p
                className={`${isMinimized ? 'scale-0' : 'scale-100'} ${pathname === item.path ? 'font-semibold' : ''} transform transition-all duration-150 ease-in-out`}
              >
                {item.title}
              </p>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <button
          onClick={toggleMinimize}
          type="button"
          className="flex w-full gap-2 rounded-lg px-4 py-2 hover:bg-neutral-100"
        >
          <div>
            {' '}
            {isMinimized ? (
              <SidebarShowIcon className="text-2xl" />
            ) : (
              <SidebarHideIcon className="text-2xl" />
            )}
          </div>
          <p
            className={`${isMinimized ? 'scale-0' : 'scale-100'} transform transition-all duration-150 ease-in-out`}
          >
            Minimize
          </p>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
