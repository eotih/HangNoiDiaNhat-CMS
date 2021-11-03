/* eslint-disable prettier/prettier */
import axios from 'axios';
import JWTDecode from "jwt-decode";

const token = JWTDecode(localStorage.getItem('token'));
const { REACT_APP_WEB_API } = process.env;
export async function infoUserLogin(){
    const res = await axios.get(`${REACT_APP_WEB_API}Organization/GetAccountById?AccountID=${token.nameid[0]}`);
    return res.data;
}
export async function getAllAccount() {
  const res = await axios.get(`${REACT_APP_WEB_API}Organization/SelectAllAccount`);
  return res.data;
}
export async function getAllBanner() {
  const res = await axios.get(`${REACT_APP_WEB_API}Organization/SelectAllBanner`);
  return res.data;
}
export async function getAllOrganization() {
  const res = await axios.get(`${REACT_APP_WEB_API}Organization/SelectAllOrganization`);
  return res.data;
}
