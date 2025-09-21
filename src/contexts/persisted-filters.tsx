"use client";
import { createContext, useContext, ReactNode } from "react";
import { StorageKeysEnum } from "@/constants/app/storage";
import { usePersistedFilters } from "@/hooks/use-persisted-filters";

type PersistedFilterConfig<T> = {
  storageKey: StorageKeysEnum;
  defaultFilters: T;
};

type FiltersContextType = Record<
  StorageKeysEnum,
  {
    filters: any;
    setFilters: (value: any) => void;
  }
>;

const FiltersContext = createContext<FiltersContextType | null>(null);

type FiltersProviderProps = {
  children: ReactNode;
  configs: PersistedFilterConfig<any>[];
};

export function FiltersProvider({ children, configs }: FiltersProviderProps) {
  // Montamos um objeto com todos os filtros
  const filtersMap = configs.reduce<FiltersContextType>((acc, config) => {
    const { filters, setFilters } = usePersistedFilters({
      storageKey: config.storageKey,
      defaultFilters: config.defaultFilters,
    });

    acc[config.storageKey] = { filters, setFilters };
    return acc;
  }, {} as FiltersContextType);

  return (
    <FiltersContext.Provider value={filtersMap}>
      {children}
    </FiltersContext.Provider>
  );
}

export function useAllFilters() {
  const ctx = useContext(FiltersContext);
  if (!ctx) {
    throw new Error("useAllFilters precisa estar dentro de FiltersProvider");
  }
  return ctx;
}

export function useFilter<T>(storageKey: StorageKeysEnum) {
  const ctx = useContext(FiltersContext);
  if (!ctx) {
    throw new Error("useFilter precisa estar dentro de FiltersProvider");
  }
  return ctx[storageKey] as { filters: T; setFilters: (value: T) => void };
}
