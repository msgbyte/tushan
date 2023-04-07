import React from 'react';
import { Avatar } from '@arco-design/web-react';
import { IconUser } from '@arco-design/web-react/icon';
import { Dropdown } from '@arco-design/web-react';
import { Menu } from '@arco-design/web-react';
import { useHref } from 'react-router';
import styled from 'styled-components';

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;

  .title {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    font-size: 1.125rem;
    line-height: 1.75rem;
  }

  .actions {
    padding-left: 0.75rem;
    padding-right: 0.75rem;

    .avatar {
      cursor: pointer;
    }
  }
`;

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
    <Root className="navbar">
      <div className="title">涂山 · Tushan</div>

      <div className="actions">
        <Dropdown droplist={dropList} position="br" trigger={'click'}>
          <div>
            <Avatar size={32} className="avatar">
              <IconUser />
            </Avatar>
          </div>
        </Dropdown>
      </div>
    </Root>
  );
});
Navbar.displayName = 'Navbar';
