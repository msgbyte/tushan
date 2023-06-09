import {
  Card,
  Link,
  Space,
  Grid,
  Divider,
  Typography,
} from '@arco-design/web-react';
import { IconApps, IconUser, IconUserGroup } from '../../icon';
import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from '../../chart';
import { useUserStore } from '../../store/user';
import { createSelector } from '../../utils/createSelector';
import { useTranslation } from 'react-i18next';

const { GridItem } = Grid;

export const Dashboard: React.FC = React.memo(() => {
  const { userIdentity } = useUserStore(createSelector('userIdentity'));
  const { t } = useTranslation();

  return (
    <div>
      <div>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Card bordered={false}>
            <Typography.Title heading={5}>
              {t('tushan.dashboard.welcome', {
                name: userIdentity.fullName,
              })}
            </Typography.Title>

            <Divider />

            <Grid.Row justify="center">
              <Grid.Col flex={1} style={{ paddingLeft: '1rem' }}>
                <DataItem
                  icon={<IconUser />}
                  title={t('tushan.dashboard.user')}
                  count={1000}
                />
              </Grid.Col>

              <Divider type="vertical" style={{ height: 40 }} />

              <Grid.Col flex={1} style={{ paddingLeft: '1rem' }}>
                <DataItem
                  icon={<IconUserGroup />}
                  title={t('tushan.dashboard.group')}
                  count={1000}
                />
              </Grid.Col>

              <Divider type="vertical" style={{ height: 40 }} />

              <Grid.Col flex={1} style={{ paddingLeft: '1rem' }}>
                <DataItem
                  icon={<IconApps />}
                  title={t('tushan.dashboard.item')}
                  count={1000}
                />
              </Grid.Col>
            </Grid.Row>

            <Divider />

            <MockChart />
          </Card>

          <Grid cols={3} colGap={12} rowGap={16}>
            <GridItem>
              <DashboardItem title="Docs" href="https://tushan.msgbyte.com/">
                {t('tushan.dashboard.tip.docs')}
              </DashboardItem>
            </GridItem>
            <GridItem>
              <DashboardItem
                title="Github"
                href="https://github.com/msgbyte/tushan"
              >
                {t('tushan.dashboard.tip.github')}
              </DashboardItem>
            </GridItem>
            <GridItem>
              <DashboardItem
                title="Design System"
                href="https://arco.design/docs/spec/introduce"
              >
                {t('tushan.dashboard.tip.design')}
              </DashboardItem>
            </GridItem>
          </Grid>
        </Space>
      </div>
    </div>
  );
});
Dashboard.displayName = 'Dashboard';

const DashboardItem: React.FC<
  React.PropsWithChildren<{
    title: string;
    href?: string;
  }>
> = React.memo((props) => {
  const { t } = useTranslation();

  return (
    <Card
      title={props.title}
      extra={
        props.href && (
          <Link target="_blank" href={props.href}>
            {t('tushan.dashboard.more')}
          </Link>
        )
      }
      bordered={false}
      style={{ overflow: 'hidden' }}
    >
      {props.children}
    </Card>
  );
});
DashboardItem.displayName = 'DashboardItem';

const DataItem: React.FC<{
  icon: React.ReactElement;
  title: string;
  count: number;
}> = React.memo((props) => {
  return (
    <Space>
      <div
        style={{
          fontSize: 20,
          padding: '0.5rem',
          borderRadius: '9999px',
          border: '1px solid #ccc',
          width: 24,
          height: 24,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {props.icon}
      </div>
      <div>
        <div style={{ fontWeight: 700 }}>{props.title}</div>
        <div>{props.count}</div>
      </div>
    </Space>
  );
});
DataItem.displayName = 'DataItem';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const MockChart: React.FC = React.memo(() => {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="pv"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
});
MockChart.displayName = 'MockChart';
