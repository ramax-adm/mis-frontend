import { StorageKeysEnum } from "@/constants/app/storage";
import { FiltersProvider } from "@/contexts/persisted-filters";
import { OrderPriceConsiderationEnum } from "@/types/business-audit";
import { MarketEnum } from "@/types/sensatta";
import { ReactNode, Suspense } from "react";
/**
 * Nesta pagina, na seção de /sales em especial, usamos o persisted filters, que se comunica
 * com o local storage, por conta da quantidade de filtros em client e representative > 2000. (dessa forma o URL state nao funciona)
 *
 * Dai o padrão adotado aqui é o PERSISTED FILTERS
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
  ];
  return <FiltersProvider configs={filtersConfig}>{children}</FiltersProvider>;
};
