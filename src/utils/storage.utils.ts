import { StorageKeysEnum } from "@/constants/app/storage";

export function getFromLocalStorage(key: StorageKeysEnum | string) {
  return localStorage.getItem(key) ?? "";
}

export function setToLocalStorage(
  key: StorageKeysEnum | string,
  value: string
) {
  return localStorage.setItem(key, value);
}

export function getFromSessionStorage(key: StorageKeysEnum | string) {
  return sessionStorage.getItem(key) ?? "";
}

export function setToSessionStorage(
  key: StorageKeysEnum | string,
  value: string
) {
  return sessionStorage.setItem(key, value);
}
