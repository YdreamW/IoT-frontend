import request from 'umi-request';
import { RequestData } from '@ant-design/pro-table';
import { MessageListItem } from '@/pages/message';
import { TableListParams } from '@/pages/TableList/data';

export async function fetchMessages() {
  // @ts-ignore
  return request(`/api/device/fetchdevices`, {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
}
export const queryMessage = async (
  params: TableListParams = {},
): Promise<RequestData<{ messages: MessageListItem[]; total: number }>> => {
  // @ts-ignore
  return request('/api/message/query', {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
    params,
  });
};
