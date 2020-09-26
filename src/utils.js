export function createDate () {
  const date = new Date();

  const formatedDate = date.toDateString();
  return formatedDate;
}
