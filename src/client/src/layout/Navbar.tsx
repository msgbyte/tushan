import React from 'react';

export const Navbar: React.FC = React.memo(() => {
  return (
    <div className="flex justify-between items-center h-11">
      <div className="px-3 text-lg">涂山 · Tushan</div>

      <div>User</div>
    </div>
  );
});
Navbar.displayName = 'Navbar';
