import axios from 'axios';

const { REACT_APP_WEB_API } = process.env;
export async function getAllRole() {
  const res = await axios.get(`${REACT_APP_WEB_API}Component/SelectAllRole`);
  return res.data;
}
export async function getAllPayment() {
  const res = await axios.get(`${REACT_APP_WEB_API}Component/SelectAllPayment`);
  return res.data;
}
