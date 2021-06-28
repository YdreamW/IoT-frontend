import React, { FC, useEffect, useState } from 'react';
import { Dispatch } from '@@/plugin-dva/connect';
import { connect } from 'dva';
import { Line } from '@ant-design/charts';
import { DashboardModelState } from '@@/plugin-dva/connect';
import { ConnectState } from '@/models/connect';
import MyBar from '@/pages/dashboard/MyBar';
import MyLine from '@/pages/dashboard/MyLine';
import MyArea from '@/pages/dashboard/MyArea';
import MySunburst from "@/pages/dashboard/MySunburst";
import IntroduceRow from "@/pages/dashboard/analysis/components/IntroduceRow";
import SalesCard from "@/pages/dashboard/analysis/components/SalesCard";
import {Col, Row} from "antd";
import TopSearch from "@/pages/dashboard/analysis/components/TopSearch";
import ProportionSales from "@/pages/dashboard/analysis/components/ProportionSales";
import OfflineData from "@/pages/dashboard/analysis/components/OfflineData";
import {GridContent} from "@ant-design/pro-layout";

interface DashboardProps {
  dispatch: Dispatch;
  dashboard: DashboardModelState;
}

const Dashboard: FC<DashboardProps> = ({ dispatch, dashboard }) => {
  useEffect(() => {
    dispatch({
      type: 'dashboard/fetchMsgPerDay',
      payload: 'default',
    });
  });

  return (
    <div>
      <GridContent>
        <React.Fragment>

          <Row
            gutter={24}
            style={{
              marginTop: 24,
            }}
          >
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <MyBar />
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <MyArea />
            </Col>
          </Row>
          <Row
            gutter={24}
            style={{
              marginTop: 24,
            }}
          >
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <MyLine />
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <MySunburst />
            </Col>
          </Row>
        </React.Fragment>
      </GridContent>

    </div>
  );
};

export default connect(({ dashboard }: ConnectState) => ({ dashboard }))(Dashboard);
