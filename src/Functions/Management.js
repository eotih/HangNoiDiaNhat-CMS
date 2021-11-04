import axios from 'axios';

const { REACT_APP_WEB_API } = process.env;
export async function getAllCustomer() {
  const res = await axios.get(`${REACT_APP_WEB_API}Management/SelectAllCustomer`);
  return res.data;
}
export async function getAllContact() {
  const res = await axios.get(`${REACT_APP_WEB_API}Management/SelectAllContact`);
  return res.data;
}
export async function getAllProduct() {
  const res = await axios.get(`${REACT_APP_WEB_API}Management/SelectAllProduct`);
  return res.data;
}
export async function getAllOrder() {
  const res = await axios.get(`${REACT_APP_WEB_API}Management/SelectAllOrders`);
  return res.data;
}
export async function getAllOrderDetailByOrderID(OrderID) {
  const res = await axios.get(
    `${REACT_APP_WEB_API}Management/GetOrderDetailByOrderID?OrderID=${OrderID}`
  );
  return res.data;
}
