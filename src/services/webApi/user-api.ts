import { CreateUser, UpdateUserDto, User } from "@/types/user";
import {
  DeleteFetch,
  GetFetch,
  PatchFetch,
  PostFetch,
  urls,
} from "../axios/api-base";
import { AxiosResponse } from "axios";

export const GetUsers = async (role: string) => {
  const response = await GetFetch(urls.USER.GET_USERS, { params: { role } });
  return response;
};

export const PostCreateUser = async (params: CreateUser) => {
  const response = await PostFetch(urls.USER.POST_USER, params);
  return response;
};

export const UpdateUser = async (
  id: string,
  params: Partial<UpdateUserDto>
) => {
  const response = await PatchFetch(
    `${urls.USER.PATCH_USER.replace(":id", id)}`,
    params
  );
  return response;
};

export const GetUserProfile = async (
  id: string
): Promise<AxiosResponse<User>> => {
  const response = await GetFetch(urls.USER.GET_PROFILE, { params: { id } });
  return response;
};

export const GetUser = async (id: string): Promise<AxiosResponse<User>> => {
  const response = await GetFetch(urls.USER.GET_USER.concat(`/${id}`));
  return response;
};

export const PostAddUserCompany = async ({
  userId,
  companyCode,
}: {
  userId: string;
  companyCode: string;
}) => {
  const response = await PostFetch(
    urls.USER.USER_COMPANIES.POST_ADD_USER_COMPANY,
    { userId, companyCode }
  );
  return response.data;
};

export const PostAddUserWebpage = async ({
  userId,
  pageId,
}: {
  userId: string;
  pageId: string;
}) => {
  const response = await PostFetch(urls.USER.POST_ADD_USER_APP_WEBPAGE, {
    userId,
    pageId,
  });
  return response.data;
};

export const DeleteUserAppWebpage = async ({ id }: { id: string }) => {
  const response = await DeleteFetch(
    urls.USER.DELETE_USER_APP_WEBPAGE.concat(`/${id}`),
    { id }
  );
  return response.data;
};

export const DeleteUserCompany = async ({ id }: { id: string }) => {
  const response = await DeleteFetch(
    urls.USER.USER_COMPANIES.DELETE_USER_COMPANY.replace(":id", id),
    { id }
  );
  return response.data;
};
