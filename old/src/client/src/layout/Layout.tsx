import React, { useState } from 'react';
import { Layout } from '@arco-design/web-react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { TushanBreadcrumb } from './Breadcrumb';
import { Outlet } from 'react-router';
import { useLayoutStore } from '../store/layout';
import { useEffect } from 'react';

const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

export const BasicLayout: React.FC = React.memo((props) => {
  const [collapsed, setCollapsed] = useState(false);
  const navbarHeight = 64;
  const menuWidth = collapsed ? 48 : 220;
  const { init } = useLayoutStore();

  useEffect(() => {
    init();
  }, []);

  return (
    <Layout className="h-full w-full overflow-y-auto min-h-full">
      <Header className="fixed w-full top-0 left-0 z-50 border-b border-arco-border bg-arco-bg-1">
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
          className="fixed left-0 top-0 h-full"
        >
          <Sidebar />
        </Sider>
        <Layout
          className="bg-arco-fill-2 p-4 transition-all"
          style={{ paddingTop: navbarHeight + 16, paddingLeft: menuWidth + 16 }}
        >
          <TushanBreadcrumb />
          <Content className="flex-1">
            <Outlet />
          </Content>
          <Footer className="text-center text-gray-500 py-1 text-xs">
            本项目由涂山强力驱动 · Powered by Tushan
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
});
BasicLayout.displayName = 'BasicLayout';
