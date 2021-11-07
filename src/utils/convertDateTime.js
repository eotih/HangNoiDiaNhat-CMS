export async function convertDateTime(data) {
  const date = new Date(data);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const millisecond = date.getMilliseconds();
  return `${day}-${month}-${year} ${hour}:${minute}:${second}:${millisecond}`;
}
