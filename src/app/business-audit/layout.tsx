import { StorageKeysEnum } from "@/constants/app/storage";
import { FiltersProvider } from "@/contexts/persisted-filters";
import {
  OrderPriceConsiderationEnum,
  ReturnOccurrenceReturnTypeEnum,
} from "@/types/business-audit";
import { MarketEnum } from "@/types/sensatta";
import { ReactNode, Suspense } from "react";

/**
 * Nesta pagina em especial, usamos o persisted filters, que se comunica
 * com o local storage, por conta da quantidade de filtros em client e representative > 2000. (dessa forma o URL state nao funciona)
 *
 * Dai o padrão adotado aqui é o PERSISTED FILTERS, sendo que em outras paginas o padrão é useQueryStates (nuqs)
 */

export default function BusinessAuditLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Suspense>
      <PageConfig>{children}</PageConfig>
    </Suspense>
  );
}

const PageConfig = ({ children }: { children: ReactNode }) => {
  "use client";
  const filtersConfig = [
    {
      defaultFilters: [],
      storageKey: StorageKeysEnum.MONITORING_SALES_COMPANIES_FILTER,
    },
    {
      defaultFilters: MarketEnum.MI,
      storageKey: StorageKeysEnum.MONITORING_SALES_MARKET_FILTER,
    },
    {
      defaultFilters: OrderPriceConsiderationEnum.NONE,
      storageKey: StorageKeysEnum.MONITORING_SALES_PRICE_CONSIDERATION_FILTER,
    },
    {
      defaultFilters: [],
      storageKey: StorageKeysEnum.MONITORING_SALES_CLIENT_FILTER,
    },
    {
      defaultFilters: [],
      storageKey: StorageKeysEnum.MONITORING_SALES_REPRESENTATIVE_FILTER,
    },
    {
      defaultFilters: [],
      storageKey:
        StorageKeysEnum.MONITORING_RETURN_OCCURRENCES_COMPANIES_FILTER,
    },
    {
      defaultFilters: "",
      storageKey:
        StorageKeysEnum.MONITORING_RETURN_OCCURRENCES_OCCURRENCE_NUMBER_FILTER,
    },
    {
      defaultFilters: ReturnOccurrenceReturnTypeEnum.NONE,
      storageKey:
        StorageKeysEnum.MONITORING_RETURN_OCCURRENCES_RETURN_TYPES_FILTER,
    },
    {
      defaultFilters: [],
      storageKey: StorageKeysEnum.MONITORING_RETURN_OCCURRENCES_CAUSES_FILTER,
    },
    {
      defaultFilters: [],
      storageKey: StorageKeysEnum.MONITORING_RETURN_OCCURRENCES_CLIENT_FILTER,
    },
    {
      defaultFilters: [],
      storageKey:
        StorageKeysEnum.MONITORING_RETURN_OCCURRENCES_REPRESENTATIVE_FILTER,
    },

    {
      defaultFilters: [],
      storageKey:
        StorageKeysEnum.MONITORING_INVOICE_TRACEABILITY_COMPANIES_FILTER,
    },
    {
      defaultFilters: [],
      storageKey: StorageKeysEnum.MONITORING_INVOICE_TRACEABILITY_CLIENT_FILTER,
    },
    {
      defaultFilters: [],
      storageKey:
        StorageKeysEnum.MONITORING_INVOICE_TRACEABILITY_REPRESENTATIVE_FILTER,
    },
  ];
  return <FiltersProvider configs={filtersConfig}>{children}</FiltersProvider>;
};
