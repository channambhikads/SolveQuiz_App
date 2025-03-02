import React from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import PageTitle from "../PageTitle";

const { Content } = Layout;

function Home() {
  return (
    <Layout>
      <PageTitle title="Home Page" />
      <Breadcrumb style={{ margin: '16px 0' }}
        items={[
          {
            href: '/dashboard',
            title: <HomeOutlined />,
          },
          {
            title: 'Home',
          },
        ]}
      />
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <h1>Welcome to the Quiz app!</h1>
        </div>
      </Content>
      <div className="divider"></div>
    </Layout>
  );
}

export default Home;
