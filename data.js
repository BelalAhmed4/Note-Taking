export let data = [];
export function checkLocalStorage() {
  if (localStorage.getItem('data')) {
    data = JSON.parse(localStorage.getItem('data'));
  }
}
checkLocalStorage()
export function updateLocalStorageData() {
  localStorage.setItem('data', JSON.stringify(data));
}
export function addTask(task, index) {
  data[index].tasks.push(task);
  updateLocalStorageData();
}