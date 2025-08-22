import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { SetStateAction } from "react";
import { CreateUser } from "@/types/user";
import {
  DeleteUserAppWebpage,
  DeleteUserCompany,
  PostAddUserCompany,
  PostAddUserWebpage,
  PostCreateUser,
} from "../../webApi/user-api";
import { queryKeys } from "../query-keys";

interface UseCreateUserProps {
  setSubmitCreateUserError: (value: SetStateAction<string | null>) => void;
}
export function useCreateUser({
  setSubmitCreateUserError,
}: UseCreateUserProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateUser) => await PostCreateUser(payload),

    onError(error) {
      if (error instanceof AxiosError)
        setSubmitCreateUserError(error.response?.data?.message);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.USERS.FIND_ALL],
        exact: false,
        refetchType: "all",
      });
    },
  });
}

export const useAddUserWebpage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      pageId,
    }: {
      userId: string;
      pageId: string;
    }) => await PostAddUserWebpage({ userId, pageId }),

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

export const useRemoveUserAppWebpage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string; userId?: string }) =>
      await DeleteUserAppWebpage({ id }),

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
