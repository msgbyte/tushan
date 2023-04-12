import { Card, Link } from '@arco-design/web-react';
import { Grid } from '@arco-design/web-react';
import React from 'react';

const { GridItem } = Grid;

export const Dashboard: React.FC = React.memo(() => {
  return (
    <div>
      <Grid cols={3} colGap={12} rowGap={16}>
        <GridItem index={0}>
          <DashboardItem title="title">children</DashboardItem>
        </GridItem>
        <GridItem index={0}>
          <DashboardItem title="title">children</DashboardItem>
        </GridItem>
        <GridItem index={0}>
          <DashboardItem title="title">children</DashboardItem>
        </GridItem>
        <GridItem index={0}>
          <DashboardItem title="title">children</DashboardItem>
        </GridItem>
        <GridItem index={0}>
          <DashboardItem title="title">children</DashboardItem>
        </GridItem>
        <GridItem index={0}>
          <DashboardItem title="title">children</DashboardItem>
        </GridItem>
        <GridItem index={0}>
          <DashboardItem title="title">children</DashboardItem>
        </GridItem>
        <GridItem index={0}>
          <DashboardItem title="title">children</DashboardItem>
        </GridItem>
        <GridItem index={0}>
          <DashboardItem title="title">children</DashboardItem>
        </GridItem>
      </Grid>
    </div>
  );
});
Dashboard.displayName = 'Dashboard';

const DashboardItem: React.FC<
  React.PropsWithChildren<{
    title: string;
  }>
> = React.memo((props) => {
  return (
    <Card
      title={props.title}
      extra={<Link>More</Link>}
      bordered={false}
      style={{ overflow: 'hidden' }}
    >
      {props.children}
    </Card>
  );
});
DashboardItem.displayName = 'DashboardItem';
