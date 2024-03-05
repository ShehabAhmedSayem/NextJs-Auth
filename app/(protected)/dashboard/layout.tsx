import React from 'react';

type StudentLayoutProps = {
  children: React.ReactNode;
};

const StudentsLayout = ({ children }: StudentLayoutProps) => {
  return <div>{children}</div>;
};

export default StudentsLayout;
