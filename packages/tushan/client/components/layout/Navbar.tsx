import React from 'react';
import { Avatar, Button, Space } from '@arco-design/web-react';
import { IconLanguage, IconUser } from '@arco-design/web-react/icon';
import { Dropdown } from '@arco-design/web-react';
import { Menu } from '@arco-design/web-react';
import styled from 'styled-components';
import { useLogout } from '../../api/auth';
import { useTranslation } from '../../i18n';
import { useTushanContext } from '../../context/tushan';

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
    display: flex;

    .avatar {
      cursor: pointer;
    }
  }
`;

export const Navbar: React.FC = React.memo(() => {
  const logout = useLogout();
  const { i18n: i18nConfig, header } = useTushanContext();
  const { t, i18n, ready } = useTranslation();

  return (
    <Root className="navbar">
      <div className="title">{header ?? t('tushan.navbar.title')}</div>

      <Space className="actions">
        {i18nConfig && ready && i18nConfig.languages.length >= 2 && (
          <Dropdown
            droplist={
              <Menu selectedKeys={[i18n.language]}>
                {i18nConfig.languages.map((item) => (
                  <Menu.Item
                    key={item.key}
                    onClick={() => i18n.changeLanguage(item.key)}
                  >
                    {item.label}
                  </Menu.Item>
                ))}
              </Menu>
            }
            position="br"
            trigger={'click'}
          >
            <div>
              <Button shape="circle" icon={<IconLanguage />} />
            </div>
          </Dropdown>
        )}

        <Dropdown
          droplist={
            <Menu>
              <Menu.Item key="logout" onClick={() => logout()}>
                {t('tushan.navbar.logout')}
              </Menu.Item>
            </Menu>
          }
          position="br"
          trigger={'click'}
        >
          <div>
            <Avatar size={32} className="avatar">
              <IconUser />
            </Avatar>
          </div>
        </Dropdown>
      </Space>
    </Root>
  );
});
Navbar.displayName = 'Navbar';
