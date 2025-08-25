import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import { GetUser, GetUserProfile, GetUsers } from "../../webApi/user-api";
import { User, UserRoleEnum, UserRoles } from "@/types/user";
import { GetFetch, urls } from "@/services/axios/api-base";

export function useGetUsers(username?: string) {
  return useQuery<User[]>({
    queryKey: [queryKeys.USERS.FIND_ALL, username],
    queryFn: async () => {
      const { data } = await GetUsers(username || "");
      return data;
    },
  });
}

export function useGetUser(id?: string) {
  return useQuery<User | undefined>({
    queryKey: [queryKeys.USERS.FIND_ONE.concat(id ?? "")],
    queryFn: async () => {
      if (!id) {
        return;
      }
      const { data } = await GetUser(id);
      return data;
    },
    enabled: !!id,
  });
}

export function useGetUserDepartmentsFilters() {
  return useQuery<
    {
      label: string;
      value: UserRoleEnum;
      key: UserRoleEnum;
    }[]
  >({
    queryKey: [queryKeys.USERS.GET_DEPARTMENTS_FILTERS],
    queryFn: async () => {
      const response = await GetFetch(urls.USER.GET_DEPARTMENTS_FILTERS);
      return response.data;
    },
  });
}
