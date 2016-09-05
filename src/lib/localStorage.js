export function storeDataToLocalStore(namespace, data) {
  if (data) {
    localStorage.setItem(namespace, JSON.stringify(data));
  }
}

export function getDataFromLocalStore(namespace) {
  const store = localStorage.getItem(namespace);
  return (store && JSON.parse(store)) || [];
}

export function removeDataFromLocalStore(namespace) {
  localStorage.removeItem(namespace);
}
