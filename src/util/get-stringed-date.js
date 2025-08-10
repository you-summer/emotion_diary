export const getStringedDate = (target) => {
  const year = target.getFullYear();
  let month = target.getMonth() + 1;
  let day = target.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
};
