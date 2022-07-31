import React from 'react';
import { Avatar } from '@arco-design/web-react';
import { IconUser } from '@arco-design/web-react/icon';

export const Navbar: React.FC = React.memo(() => {
  return (
    <div className="flex justify-between items-center h-11">
      <div className="px-3 text-lg">涂山 · Tushan</div>

      <div className="px-3">
        <Avatar size={32}>
          <IconUser />
        </Avatar>
      </div>
    </div>
  );
});
Navbar.displayName = 'Navbar';
