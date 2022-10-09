import React from 'react';
import { Avatar } from '@arco-design/web-react';
import { IconUser } from '@arco-design/web-react/icon';
import { Dropdown } from '@arco-design/web-react';
import { Menu } from '@arco-design/web-react';
import { useHref } from 'react-router';

export const Navbar: React.FC = React.memo(() => {
  const logoutUrl = useHref('/logout');

  const dropList = (
    <Menu>
      <Menu.Item
        key="logout"
        onClick={() => (window.location.href = logoutUrl)}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex justify-between items-center h-16">
      <div className="px-3 text-lg">涂山 · Tushan</div>

      <div className="px-3">
        <Dropdown droplist={dropList} position="br">
          <Avatar size={32} className="cursor-pointer">
            <IconUser />
          </Avatar>
        </Dropdown>
      </div>
    </div>
  );
});
Navbar.displayName = 'Navbar';
