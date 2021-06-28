import type { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';
import { GlobalModelState } from './global';
import { UserModelState } from './user';
import {DashboardModelState} from "@/models/dashboard";
import {DeviceModelState} from "@/models/device";
import type { StateType } from './login';

export { GlobalModelState, UserModelState,DeviceModelState,DashboardModelState };

export type Loading = {
  global: boolean;
  effects: Record<string, boolean | undefined>;
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
  };
};

export type ConnectState = {
  global: GlobalModelState;
  loading: Loading;
  settings: ProSettings;
  user: UserModelState;
  login: StateType;
  device: DeviceModelState;
  dashboard: DashboardModelState
};

export type Route = {
  routes?: Route[];
} & MenuDataItem;
