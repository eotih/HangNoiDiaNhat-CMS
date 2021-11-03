import axios from 'axios';

const { REACT_APP_WEB_API } = process.env;
export async function getAllCustomer() {
  const res = await axios.get(`${REACT_APP_WEB_API}Management/SelectAllCustomer`);
  return res.data;
}
