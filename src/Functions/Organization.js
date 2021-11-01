/* eslint-disable prettier/prettier */
import axios from 'axios';

export default async function getAllAccount() {
    const res = await axios.get('http://localhost:33333/API/Organization/SelectAllAccount');
    return res.data;
};