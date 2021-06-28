import React, { FC, useEffect } from 'react';
import { DashboardModelState, Dispatch } from '@@/plugin-dva/connect';
import { Card } from 'antd';
import { ConnectState } from '@/models/connect';
import { Column } from '@ant-design/charts';
import { connect } from 'dva';

interface MyBarProps {
  dispatch: Dispatch;
  dashboard: DashboardModelState;
}

const MyBar: FC<MyBarProps> = ({ dispatch, dashboard }) => {
  useEffect(() => {
    dispatch({
      type: 'dashboard/fetchMsgPerDev',
    });
  }, []);

  const { dataMsgPerDev: data } = dashboard;

  const config = {
    data: data,
    isStack: true,
    xField: 'ID',
    yField: 'value',
    seriesField: 'type',
    label: {
      position: 'middle',
      layout: [
        { type: 'interval-adjust-position' },
        { type: 'interval-hide-overlap' },
        { type: 'adjust-color' },
      ],
    },
  };

  return <Card title={"各个设备的消息总量"} >{<Column height={250} {...config} />}</Card>;
};

export default connect(({ dashboard }: ConnectState) => ({ dashboard }))(MyBar);
