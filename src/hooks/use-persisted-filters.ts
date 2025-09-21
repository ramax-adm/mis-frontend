"use client";
import { StorageKeysEnum } from "@/constants/app/storage";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/storage.utils";
import { useState, useEffect, useRef } from "react";

export function usePersistedFilters<T>({
  defaultFilters,
  storageKey,
}: {
  storageKey: StorageKeysEnum;
  defaultFilters: T;
}) {
  const [filters, setState] = useState<T>(defaultFilters);

  // Atualizar com valor do localStorage depois que montar no cliente
  useEffect(() => {
    const saved = getFromLocalStorage(storageKey);

    if (saved) {
      setState(JSON.parse(saved) as T);
    }
  }, [storageKey]);

  // Atualizar sempre que mudar

  const setFilters = (value: T) =>
    setState(() => {
      setToLocalStorage(storageKey, JSON.stringify(value));
      return value;
    });

  return { filters, setFilters };
}
