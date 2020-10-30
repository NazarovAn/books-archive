function getId() {
  return `_${Math.random().toString(36).substr(2, 9)}`;
}

function sortByAddTime(arr) {
  return arr.sort((a, b) => a.addTime - b.addTime);
}

function sortByReadStatus(arr) {
  return arr.sort((a, b) => a.read - b.read);
}

function sortBooks(arr) {
  let sortedArr = sortByAddTime(arr);
  sortedArr = sortByReadStatus(arr);
  return sortedArr;
}

export { getId, sortBooks };
