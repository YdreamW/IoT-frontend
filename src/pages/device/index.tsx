import React, { Component, FC, useEffect, useState, useRef } from 'react';
import { connect } from 'dva';
import { DeviceModelState, IDevice } from '@/models/device';
import { ConnectState } from '@/models/connect';
import ProTable, {
  ProColumns,
  ActionType,
  RequestData,
  TableDropdown,
  EditableProTable,
} from '@ant-design/pro-table';
import { DeviceListItem } from '@/pages/device/data';
import { queryDevices, updateDeviceName } from '@/services/device';
import { TableListItem, TableListParams } from '@/pages/kefou/data';
import { Input, message, Modal, Row, Col } from 'antd';
import { CreateForm, UpdateForm } from '@/pages/kefou/components';
import styles from './style.less';
import { router } from 'umi';
import { Dispatch } from '@@/plugin-dva/connect';

export interface DeviceProps {
  device: DeviceModelState;
  dispatch: Dispatch;
}

const Device: FC<DeviceProps> = ({ dispatch, device }) => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalDeviceId, setmodelDeviceId] = useState<string>('');
  const [action, setAction] = useState();

  const [deviceName, setDeviceName] = useState<string>('');

  const columns: ProColumns<DeviceListItem>[] = [
    {
      title: '设备ID',
      dataIndex: 'ID',
    },
    {
      title: '设备名称',
      dataIndex: 'name',
      copyable: true,
      ellipsis: true,
      tip: '标题过长会自动收缩',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '设备创建时间',
      dataIndex: 'createdAt',
      valueType: 'date',
      hideInSearch: true,
      sorter: (a, b) => a.createdAt - b.createdAt,
    },
    {
      title: '数据条数',
      dataIndex: 'messages',
      render: messages => messages.length,
      hideInSearch: true,
      sorter: (a, b) => a.messages.length - b.messages.length,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            console.log(record);
            setmodelDeviceId(record.ID);
            setAction(action);
            setVisible(true);
          }}
        >
          编辑
        </a>
      ],
    },
  ];

  const actionRef = useRef<ActionType>();

  const fetchDeviceList = async (
    params: TableListParams,
  ): Promise<RequestData<{ devices: DeviceListItem[]; total: number }>> => {
    console.log(params);
    const { data, code } = await queryDevices(params);
    if (code === 0 && data) {
      const { devices, total } = data;
      return {
        success: true,
        data: devices,
        total,
      };
    }
    return {
      success: false,
      data: [],
      total: 0,
    };
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    const res = await updateDeviceName({ name: deviceName, ID: modalDeviceId });
    const { code } = res;
    if (code === 0) {
      setDeviceName('');
      setVisible(false);
      setConfirmLoading(false);
      action.reload();
    }
  };

  const handleInput = e => {
    setDeviceName(e.target.value);
  };

  return (
    <div>
      <ProTable<DeviceListItem>
        headerTitle="设备列表"
        columns={columns}
        rowKey="_id"
        request={fetchDeviceList}
        actionRef={actionRef}
        editable={{
          editableKeys,
          onChange: setEditableRowKeys,
        }}
      />
      <Modal
        title={'修改设备名称   ID: ' + modalDeviceId + ''}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        设备名称：
        <Input
          className={styles.input}
          value={deviceName}
          placeholder={'请输入设备名称'}
          onChange={handleInput}
        />
      </Modal>
    </div>
  );
};

export default connect(({ device }: ConnectState) => ({ device }))(Device);
