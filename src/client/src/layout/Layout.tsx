import React from 'react';
import { Breadcrumb, Layout, Menu } from '@arco-design/web-react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

interface BasicLayoutProps {
  children: React.ReactNode;
}
export const BasicLayout: React.FC<BasicLayoutProps> = React.memo((props) => {
  return (
    <Layout className="h-screen overflow-hidden">
      <Header>
        <Navbar />
      </Header>
      <Layout>
        <Sider collapsible breakpoint="lg">
          <Sidebar />
        </Sider>
        <Layout className="bg-arco-fill-2 p-4">
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content>{props.children}</Content>
          <Footer className="text-center text-gray-500 py-1 text-xs">
            本项目由涂山强力驱动 · Power by Tushan
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
});
BasicLayout.displayName = 'BasicLayout';
