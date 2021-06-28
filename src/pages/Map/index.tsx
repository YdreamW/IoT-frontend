import React, { FC, useEffect } from 'react';
import { connect } from 'dva';
import { DashboardModelState, Dispatch } from '@@/plugin-dva/connect';
import { Card } from 'antd';
import { ConnectState } from '@/models/connect';
import { LayerEvent, LineLayer, MapboxScene, AMapScene, PointLayer } from '@antv/l7-react';

interface MapProps {
  dispatch: Dispatch;
  dashboard: DashboardModelState;
}

const Map: FC<MapProps> = ({ dispatch, dashboard }) => {
  const { dataMap: myData, dataMapAlert, dataMapNAlert } = dashboard;
  useEffect(() => {
    dispatch({
      type: 'dashboard/fetchMapData',
    });
    dispatch({
      type: 'dashboard/fetchMapPoints',
    });
  }, []);

  console.log(dataMapNAlert);
  const [data, setData] = React.useState();
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://gw.alipayobjects.com/os/basement_prod/32e1f3ab-8588-46cb-8a47-75afb692117d.json',
      );
      const raw = await response.json();
      setData(raw);
    };
    fetchData();
  }, []);

  return (
    <div>
      <AMapScene
        map={{
          center: [120.1, 30.25],
          pitch: 0,
          style: 'dark',
          zoom: 11,
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {data && (
          <LineLayer
            key={'2'}
            source={{
              data,
            }}
            size={{
              values: 1,
            }}
            color={{
              values: '#fff',
            }}
            shape={{
              values: 'line',
            }}
            style={{
              opacity: 1,
            }}
          />
        )}
        {myData && myData.features && (
          <LineLayer
            size={{
              values: 2,
            }}
            animate={{
              interval: 1, // 间隔
              duration: 3, // 持续时间，延时
              trailLength: 2, // 流线长度
            }}
            source={{ data: myData }}
          />
        )}

        {dataMapAlert && dataMapAlert.features && (
          <PointLayer
            size={{ values: 5 }}
            color={{ values: '#CC0033' }}
            source={{ data: dataMapAlert }}
          >
          </PointLayer>
        )}

        {dataMapNAlert && dataMapNAlert.features && (
          <PointLayer
            size={{ values: 5 }}
            color={{ values: '#00CC00' }}
            source={{ data: dataMapNAlert }}
          />
        )}
      </AMapScene>
    </div>
  );
};

export default connect(({ dashboard }: ConnectState) => ({ dashboard }))(Map);
