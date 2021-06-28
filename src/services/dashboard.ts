import request from 'umi-request';

export async function fetchMsgPerDev() {
  // @ts-ignore
  return request(`/api/dashboard/fetchMsgPerDev`, {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
}

export async function fetchMsgPerDay(data) {
  return request('/api/dashboard/fetchMsgPerDay', {
    method: 'POST',
    data,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
}

export async function fetchMapData() {
  return request('/api/dashboard/fetchMapData', {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
}

export async function fetchMapPoints() {
  return request('/api/dashboard/fetchMapPoints', {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
}

export async function fetchSunburst() {
  return request('/api/dashboard/fetchSunburst', {
    method: 'GET',
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  });
}
