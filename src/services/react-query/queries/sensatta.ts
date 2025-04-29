import { Company, Product, ProductLine } from '@/types/api/sensatta'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '../query-keys'
import { GetCompanies, GetProductLines, GetProducts } from '@/services/webApi/sensatta-api'

export const useGetCompanies = () => {
  return useQuery<Company[]>({
    queryKey: [queryKeys.SENSATTA.GET_COMPANIES],
    queryFn: async () => await GetCompanies(),
  })
}

export const useGetProducts = () => {
  return useQuery<Product[]>({
    queryKey: [queryKeys.SENSATTA.GET_PRODUCT],
    queryFn: async () => await GetProducts(),
  })
}

export const useGetProductLines = () => {
  return useQuery<ProductLine[]>({
    queryKey: [queryKeys.SENSATTA.GET_PRODUCT_LINES],
    queryFn: async () => await GetProductLines(),
  })
}
