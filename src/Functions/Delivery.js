import axios from 'axios';

const { REACT_APP_WEB_API } = process.env;
export async function getAllServices() {
  const res = await axios.get(`${REACT_APP_WEB_API}Delivery/SelectAllService`);
  return res.data;
}
export async function getAllShipper() {
  const res = await axios.get(`${REACT_APP_WEB_API}Delivery/SelectAllShipper`);
  return res.data;
}
