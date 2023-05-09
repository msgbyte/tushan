import React, { useState } from 'react';
import { Layout } from '@arco-design/web-react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { TushanBreadcrumb } from './Breadcrumb';
import { Outlet } from 'react-router';
import styled from 'styled-components';

const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

const Root = styled(Layout)`
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  min-height: 100%;

  .header {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 50;
    border-bottom-width: 1px;
    border-color: var(--color-border);
    background-color: var(--color-bg-1);
  }

  .sider {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
  }

  .content {
    background-color: var(--color-fill-2);
    padding: 1rem;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;

    .body {
      flex: 1;
    }

    .footer {
      text-align: center;
      color: rgb(107 114 128);
      font-size: 0.75rem;
      line-height: 1rem;
      margin-top: 1rem;
    }
  }
`;

export const BasicLayout: React.FC = React.memo((props) => {
  const [collapsed, setCollapsed] = useState(false);
  const navbarHeight = 64;
  const menuWidth = collapsed ? 48 : 220;

  return (
    <Root className="basic-layout">
      <Header className="header">
        <Navbar />
      </Header>

      <Layout>
        <Sider
          style={{ paddingTop: navbarHeight }}
          width={220}
          collapsible
          collapsed={collapsed}
          onCollapse={(collapse) => setCollapsed(collapse)}
          breakpoint="lg"
          className="sider"
        >
          <Sidebar />
        </Sider>
        <Layout
          className="content"
          style={{ paddingTop: navbarHeight + 16, paddingLeft: menuWidth + 16 }}
        >
          <TushanBreadcrumb />
          <Content className="body">
            <Outlet />
          </Content>
          <Footer className="footer">
            本项目由涂山强力驱动 · Powered by Tushan
          </Footer>
        </Layout>
      </Layout>
    </Root>
  );
});
BasicLayout.displayName = 'BasicLayout';
