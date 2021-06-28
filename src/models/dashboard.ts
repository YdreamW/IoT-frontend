import { Effect } from 'dva';
import { Reducer } from 'redux';
import { DvaModel } from '@/models/connect';
import {
  fetchMsgPerDev,
  fetchMsgPerDay,
  fetchMapData,
  fetchMapPoints,
  fetchSunburst,
} from '@/services/dashboard';
import { IMsgPerDayItem, IMsgPerDevItem, IDataMap, ISunbusrt } from '@/models/charts';

export interface DashboardModelState {
  dataMsgPerDev: IMsgPerDevItem[];
  dataMsgPerDay: IMsgPerDayItem[];
  dataMap: IDataMap;
  dataMapAlert: IDataMap;
  dataMapNAlert: IDataMap;
  dataSunburst: ISunbusrt;
}

export interface DashboardModelStore {
  namespace: string;
  state: DashboardModelState;
  effects: {
    fetchDataDevices: Effect;
    fetchMsgPerDev: Effect;
    fetchMsgPerDay: Effect;
    fetchMapData: Effect;
    fetchMapPoints: Effect;
    fetchSunburst: Effect;
  };
  reducers: {
    save: Reducer<DashboardModelState>;
  };
}

const DashboardModel: DashboardModelStore = {
  namespace: 'dashboard',
  state: {
    dataMsgPerDev: [],
    dataMsgPerDay: [],
    dataMap: {} as IDataMap,
    dataMapAlert: {} as IDataMap,
    dataMapNAlert: {} as IDataMap,
    dataSunburst: {} as ISunbusrt,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *fetchDataDevices({ payload }, { put, call }) {
      console.log(123);
      // const res = yield call(fetchChartsDeviceMessage);
      const { code, data } = res;
      if (code === 0) {
        const devices = data;
        yield put({ type: 'save', payload: { devicesData: { ...data } } });
      }
    },
    *fetchMsgPerDev(_, { put, call }) {
      const res = yield call(fetchMsgPerDev);
      const { code, data } = res;
      if (code === 0) {
        const dataMsgPerDev = data;
        console.log(dataMsgPerDev);
        yield put({
          type: 'save',
          payload: { dataMsgPerDev },
        });
      }
    },
    *fetchMsgPerDay({ payload }, { put, call }) {
      console.log(13);
      const res = yield call(fetchMsgPerDay);
      const { code, data } = res;
      if (code === 0) {
        const dataMsgPerDay = data;
        console.log(dataMsgPerDay);
        yield put({
          type: 'save',
          payload: { dataMsgPerDay },
        });
      }
    },
    //获取轨迹信息
    *fetchMapData({ payload }, { put, call }) {
      const res = yield call(fetchMapData);
      const { code, data } = res;
      if (code === 0) {
        const dataMap = data;
        console.log(dataMap);
        yield put({
          type: 'save',
          payload: { dataMap },
        });
      }
    },

    *fetchMapPoints({ payload }, { put, call }) {
      const res = yield call(fetchMapPoints);
      const { code, data } = res;
      if (code === 0) {
        const { alert: dataMapAlert, nAlert: dataMapNAlert } = data;
        yield put({
          type: 'save',
          payload: { dataMapAlert, dataMapNAlert },
        });
      }
    },
    *fetchSunburst({ payload }, { put, call }) {
      const { code, data } = yield call(fetchSunburst);
      if (code === 0) {
        yield put({
          type: 'save',
          payload: { dataSunburst: data },
        });
      }
    },
  },
};

export default DashboardModel;
