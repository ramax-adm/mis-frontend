import { Company, Product, ProductLine } from "@/types/api/sensatta";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import {
  GetCompanies,
  GetCompany,
  GetFreightsCompanies,
  GetMarkets,
  GetProductLines,
  GetProducts,
} from "@/services/webApi/sensatta-api";
import { UseGetProductLinesRequest } from "@/types/queries/stock";

export const useGetCompanies = ({ token }: { token?: string }) => {
  return useQuery<Company[]>({
    // TODO: auth context provide JWT TOKEN
    queryKey: [queryKeys.SENSATTA.GET_COMPANIES, token],
    queryFn: async () => await GetCompanies(),
  });
};

export const useGetCompany = (id: string) => {
  return useQuery<Company>({
    queryKey: [queryKeys.SENSATTA.GET_COMPANY.concat(id)],
    queryFn: async () => await GetCompany(id),
  });
};

export const useGetFreightCompanies = () => {
  return useQuery<any[]>({
    queryKey: [queryKeys.SENSATTA.GET_FREIGHT_COMPANIES],
    queryFn: async () => await GetFreightsCompanies(),
  });
};

export const useGetProducts = () => {
  return useQuery<Product[]>({
    queryKey: [queryKeys.SENSATTA.GET_PRODUCT],
    queryFn: async () => await GetProducts(),
  });
};

export const useGetMarkets = () => {
  return useQuery<{ label: string; value: string; key: string }[]>({
    queryKey: [queryKeys.SENSATTA.GET_MARKETS],
    queryFn: async () => await GetMarkets(),
  });
};

export const useGetProductLines = ({ market }: UseGetProductLinesRequest) => {
  return useQuery<ProductLine[]>({
    queryKey: [queryKeys.SENSATTA.GET_PRODUCT_LINES, market],
    queryFn: async () => await GetProductLines({ market }),
  });
};
