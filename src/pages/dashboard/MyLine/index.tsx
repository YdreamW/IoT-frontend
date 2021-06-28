import React, { FC, useEffect } from 'react';
import { connect } from 'dva';
import { DashboardModelState, Dispatch } from '@@/plugin-dva/connect';
import { Card } from 'antd';
import { ConnectState } from '@/models/connect';
import MyBar from '@/pages/dashboard/MyBar';
import { Line } from '@ant-design/charts';

interface MyLineProps {
  dispatch: Dispatch;
  dashboard: DashboardModelState;
}

const MyLine: FC<MyLineProps> = ({ dispatch, dashboard }) => {
  useEffect(() => {
    dispatch({
      type: 'dashboard/fetchMsgPerDay',
      payload: 'default',
    });
  }, []);

  const { dataMsgPerDay: data } = dashboard;

  const config = {
    data: data,
    xField: 'day',
    yField: 'value',
    seriesField: 'ID',
    slider:{
      start:0.1,
      end:0.6
    },
    legend: { position: 'top' },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };

  return (
    <Card title={"各个设备消息总量随时间变化图"}>
      <Line height={250} {...config} />
    </Card>
  );
};

export default connect(({ dashboard }: ConnectState) => ({ dashboard }))(MyLine);
