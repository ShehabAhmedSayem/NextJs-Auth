import Sidebar from '@/components/sidebar';
import React from 'react';

const ProtectedRouteLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex h-full w-full">
      <Sidebar userRole="admin" />
      <div className="h-full w-full overflow-y-scroll">
        <div className="m-6 2xl:mx-8">
          <div className="max-w-8xl">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRouteLayout;
