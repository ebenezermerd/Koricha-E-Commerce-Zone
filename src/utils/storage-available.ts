// ----------------------------------------------------------------------

export function localStorageAvailable() {
  try {
    const key = '__some_random_key_you_are_not_going_to_use__';
    window.localStorage.setItem(key, key);
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
}

export function localStorageSetItem(key: string, value: string) {
  const storageAvailable = localStorageAvailable();

  if (storageAvailable) {
    localStorage.setItem(key, value);
  }

  return value;
}

export function localStorageGetItem(key: string, defaultValue = '') {
  const storageAvailable = localStorageAvailable();

  if (storageAvailable) {
    const item = localStorage.getItem(key);
    return item || defaultValue;
  }

  return defaultValue;
}
