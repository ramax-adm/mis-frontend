"use client";
import { GetUserProfile } from "@/services/webApi/user-api";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query-keys";
import { Dispatch } from "react";
import { getFromLocalStorage } from "@/utils/storage.utils";
import { StorageKeysEnum } from "@/constants/app/storage";

export const useGetUserProfile = () => {
  let userId = "";
  if (typeof window !== "undefined") {
    const localUser = getStoredUser();

    userId = localUser?.id ?? "";
  }
  return useQuery<User>({
    queryKey: [queryKeys.AUTH.GET_PROFILE.concat(userId ?? "")],
    queryFn: async () => {
      const response = await GetUserProfile(userId ?? "");
      const profile = response.data;

      return profile;
    },
    enabled: typeof window !== "undefined" && !!userId,
  });
};

const getStoredUser = () => {
  const storedUser = getFromLocalStorage(StorageKeysEnum.AUTH_SESSION_USER);

  if (storedUser === "") {
    return undefined;
  }

  return JSON.parse(storedUser) as User;
};
