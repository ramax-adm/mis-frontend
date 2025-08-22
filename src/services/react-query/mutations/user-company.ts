import {
  DeleteUserCompany,
  PostAddUserCompany,
} from "@/services/webApi/user-api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";

export const useAddUserCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      companyCode,
    }: {
      userId: string;
      companyCode: string;
    }) => await PostAddUserCompany({ userId, companyCode }),

    onSuccess(_, vars) {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.USERS.FIND_ALL],
        exact: false,
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.USERS.FIND_ONE.concat(vars.userId)],
        exact: false,
        refetchType: "all",
      });
    },
  });
};

export const useRemoveUserCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string; userId?: string }) =>
      await DeleteUserCompany({ id }),

    onSuccess(_, vars) {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.USERS.FIND_ALL],
        exact: false,
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.USERS.FIND_ONE.concat(vars.userId ?? "")],
        exact: false,
        refetchType: "all",
      });
    },
  });
};
