import { Effect } from 'dva';
import { Reducer } from 'redux';
import { DvaModel } from '@/models/connect';
import { setAuthority } from '@/utils/utils';
import { router } from 'umi';
import { CurrentUser } from '@/models/user';
import { fetchDevices } from '@/services/device';

export interface IDevice {
  ID: string;
  name: string;
}

export interface DeviceModelState {
  devices: IDevice[];
}

export interface DeviceModelStore extends DvaModel<DeviceModelState> {
  reducers: {
    save: Reducer;
  };
}

const DeviceModel: DeviceModelStore = {
  namespace: 'device',
  state: {
    devices: [],
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * fetchDevices({ payload }, { put, call }) {
      const res = yield call(fetchDevices);
      const { code, data } = res;
      if (code === 0) {
        const devices = data;
        yield put({ type: 'save', payload: { devices } });
      }
    },
  },
};

export default DeviceModel;
