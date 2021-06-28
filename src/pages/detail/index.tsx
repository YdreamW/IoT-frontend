import React, { FC } from 'react';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { DeviceModelState, DispatchProps } from '@/models/connect';

interface DetailProps extends DispatchProps {
  device: DeviceModelState;
}

const Detail: FC<DetailProps> = ({ dispatch, match }) => {
  const { params } = match;
  const { ID } = params;
  console.log(ID);

  return <div>fuck!</div>;
};

export default connect()(Detail);
