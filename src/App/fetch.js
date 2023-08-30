import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postRequest = async (api, body) => {
  const res = await fetch(api, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    redirect: 'follow',
  });
  return await res.json();
};

export const getRequest = async api => {
  const res = await fetch(api, {
    method: 'GET',
    // headers: {
    //   Authorization: AsyncStorage.getItem('token'),
    // },
    headers: {
      'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
      'X-RapidAPI-Key': '962392c32emshd35a2f6ad156d14p149d95jsn285528aa0957',
    },
    // params: param
  });
  return await res.json();
};
//Edit krna ka lia hota hain

export const putRequest = async (api, body) => {
  const res = await fetch(api, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
      Authorization: AsyncStorage.getItem('token'),
    },

    body: JSON.stringify(body),
  });
  return await res.json();
};

export const deleteRequest = async (api, body) => {
  const res = await fetch(api, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      Authorization: AsyncStorage.getItem('token'),
    },

    body: JSON.stringify(body),
  });
  return await res.json();
};

export const getDataByBody = async (api, body) => {
  const res = await axios.request({
    method: 'POST',
    url: api,
    headers: {
      Authorization: AsyncStorage.getItem('token'),
    },
    data: body,
  });
  return await res.data;
};

export const getDataByBodyParams = async (api, body) => {
  const res = await axios.request({
    method: 'GET',
    url: api,
    headers: {
      Authorization: AsyncStorage.getItem('token'),
    },
    params: body,
  });
  return await res.data;
};
