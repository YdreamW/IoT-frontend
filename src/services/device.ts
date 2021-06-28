import request from 'umi-request';
import { RequestData } from '@ant-design/pro-table';
import { DeviceListItem } from '@/pages/device/data';
import { TableListParams} from "@/pages/message/data";

export async function fetchDevices() {
  // @ts-ignore
  return request(`/api/device/fetchdevices`, {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
}
export const queryDevices = async (
  params: TableListParams = {},
): Promise<RequestData<{ devices: DeviceListItem[]; total: number }>> => {
  // @ts-ignore
  return request('/api/device/query', {
    method:'GET',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
    params });
};

export const updateDeviceName = async (data:any)=>{
  // @ts-ignore
  return request('/api/device/updatename',{
    method: 'POST',
    data,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  })
}
