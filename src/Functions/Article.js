import axios from 'axios';

const { REACT_APP_WEB_API } = process.env;
export async function getAllField() {
  const res = await axios.get(`${REACT_APP_WEB_API}Article/SelectAllField`);
  return res.data;
}
export async function getAllPosts() {
  const res = await axios.get(`${REACT_APP_WEB_API}Article/SelectAllPost`);
  return res.data;
}
export async function getPostBySlug(Slug) {
  const res = await axios.get(`${REACT_APP_WEB_API}Article/GetPostBySlug?Slug=${Slug}`);
  return res.data;
}
