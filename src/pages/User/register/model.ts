import type { Effect, Reducer } from 'umi';

import { Register } from './service';
import {message} from "antd";
import {history} from "umi";

export interface StateType {
  status?: 'ok' | 'error';
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submit: Effect;
  };
  reducers: {
    registerHandle: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userAndregister',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      console.log(123);
      console.log(payload);
      const response = yield call(Register, payload);
      const {code,data,msg} = response;
      if(code === 0){
        message.success("注册成功！");
        localStorage.setItem('token',data.token);
        history.push('/dashboard');
      }else{
        message.error(msg);
      }
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};

export default Model;
