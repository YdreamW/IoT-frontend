import React, { FC, useEffect } from 'react';
import { connect } from 'dva';
import { DashboardModelState, Dispatch } from '@@/plugin-dva/connect';
import { Card } from 'antd';
import { ConnectState } from '@/models/connect';
import MyBar from '@/pages/dashboard/MyBar';
import { Sunburst } from '@ant-design/charts';

interface MySunburstProps {
  dispatch: Dispatch;
  dashboard: DashboardModelState;
}

const MySunburst: FC<MySunburstProps> = ({ dispatch, dashboard }) => {
  const { dataSunburst } = dashboard;
  useEffect(() => {
    dispatch({
      type: 'dashboard/fetchSunburst',
    });
  }, []);
  const config = {
    data: dataSunburst,
    innerRadius: 0.3,
    interactions: [{ type: 'element-active' }],
  };
  return (
    <Card title={'各个设备的告警情况'}>
      {dataSunburst && <Sunburst height={250} {...config} />}
    </Card>
  );
};

export default connect(({ dashboard }: ConnectState) => ({ dashboard }))(MySunburst);
