import React, { FC, useEffect } from 'react';
import { connect } from 'dva';
import { DashboardModelState, Dispatch } from '@@/plugin-dva/connect';
import { Card } from 'antd';
import { ConnectState } from '@/models/connect';
import { Area } from '@ant-design/charts';

interface MyAreaProps {
  dispatch: Dispatch;
  dashboard: DashboardModelState;
}

const MyArea: FC<MyAreaProps> = ({ dispatch, dashboard }) => {
  const { dataMsgPerDay: data } = dashboard;
  const config = {
    data: data,
    xField: 'day',
    yField: 'value',
    seriesField: 'ID',
    slider: {
      start: 0.1,
      end: 0.9,
    },
  };

  return (
    <Card title={"设备消息总量随时间变化图"} >
      <Area height={250} {...config} />
    </Card>
  );
};

export default connect(({ dashboard }: ConnectState) => ({ dashboard }))(MyArea);
