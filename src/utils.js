export function createDate () {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const formatedDate = `${day}.${month.toString().padStart(2, '0')}.${year}`;
  return formatedDate;
}
