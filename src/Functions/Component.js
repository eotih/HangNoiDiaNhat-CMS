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
export async function getAllCategory() {
  const res = await axios.get(`${REACT_APP_WEB_API}Component/SelectAllCategory`);
  return res.data;
}
export async function getAllBrands() {
  const res = await axios.get(`${REACT_APP_WEB_API}Component/SelectAllBrand`);
  return res.data;
}
