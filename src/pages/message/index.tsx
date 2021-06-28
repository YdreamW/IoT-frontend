import React, { Component, FC, useEffect, useState, useRef } from 'react';
import { connect } from 'dva';
import { DeviceModelState, IDevice } from '@/models/device';
import { ConnectState, DispatchProps } from '@/models/connect';
import ProTable, {
  ProColumns,
  ActionType,
  RequestData,
  TableDropdown,
  EditableProTable,
} from '@ant-design/pro-table';
import { TableListParams } from '@/pages/kefou/data';
import { router } from 'umi';
import { queryMessage } from '@/services/message';

export interface MessageProps extends DispatchProps {
  device: DeviceModelState;
}

export interface MessageListItem {
  _id: string;
  device: IDevice;
  info: string;
  value: number;
  lng: number;
  lat: number;
  alert: number;
  time: Date;
}

const Message: FC<MessageProps> = ({ dispatch }) => {
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalDeviceId, setmodelDeviceId] = useState<string>('');
  const [action, setAction] = useState();

  const [deviceName, setDeviceName] = useState<string>('');

  const columns: ProColumns<MessageListItem>[] = [
    {
      title: '设备ID',
      dataIndex: 'device',
      render: device => device.ID,
    },
    {
      title: '设备名称',
      dataIndex: 'device',
      render: device => device.name,
      hideInSearch: true,
    },
    {
      title: '信息内容',
      dataIndex: 'info',
      copyable: true,
      hideInSearch: true,
    },
    {
      title: 'value',
      dataIndex: 'value',
      copyable: true,
      hideInSearch: true,
      sorter: (a, b) => a.value - b.value,
    },
    {
      title: '是否告警',
      dataIndex: 'alert',
      hideInSearch: true,
      render: alert => (alert === 1 ? '是' : '否'),
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '是',
          status: 'Error',
        },
        closed: {
          text: '否',
          status: 'Success',
        },
      },
    },
    {
      title: '消息发送时间',
      dataIndex: 'time',
      valueType: 'date',
      hideInSearch: true,
      sorter: (a, b) => a.createdAt - b.createdAt,
    },
    {
      title: '经度',
      hideInSearch: true,
      copyable: true,
      dataIndex: 'lng',
    },
    {
      title: '纬度',
      hideInSearch: true,
      copyable: true,
      dataIndex: 'lat',
    },
  ];

  const actionRef = useRef<ActionType>();

  const fetchMessageList = async (
    params: TableListParams,
  ): Promise<RequestData<{ devices: MessageListItem[]; total: number }>> => {
    console.log(params);
    const { data, code } = await queryMessage(params);
    if (code === 0 && data) {
      const { messages, total } = data;
      console.log(messages);
      return {
        success: true,
        data: messages,
        total,
      };
    }
    return {
      success: false,
      data: [],
      total: 0,
    };
  };

  return (
    <div>
      <ProTable<MessageListItem>
        headerTitle="信息列表"
        columns={columns}
        rowKey="_id"
        request={fetchMessageList}
        actionRef={actionRef}
        editable={{
          editableKeys,
          onChange: setEditableRowKeys,
        }}
      />
    </div>
  );
};

export default connect()(Message);
