import axios from 'axios';

const { REACT_APP_WEB_API } = process.env;
export async function getAllField() {
  const res = await axios.get(`${REACT_APP_WEB_API}Article/SelectAllField`);
  return res.data;
}
