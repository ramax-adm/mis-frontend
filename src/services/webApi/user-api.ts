import { CreateUser, UpdateUserDto, User } from '@/types/user'
import { GetFetch, PatchFetch, PostFetch, urls } from '../axios/api-base'
import { AxiosResponse } from 'axios'

export const GetUsers = async (role: string) => {
  const response = await GetFetch(urls.USER.GET_USERS, { params: { role } })
  return response
}

export const PostCreateUser = async (params: CreateUser) => {
  const response = await PostFetch(urls.USER.POST_USER, params)
  return response
}

export const UpdateUser = async (id: string, params: Partial<UpdateUserDto>) => {
  const response = await PatchFetch(`${urls.USER.PATCH_USER.replace(':id', id)}`, params)
  return response
}

export const GetUserProfile = async (id: string): Promise<AxiosResponse<User>> => {
  const response = await GetFetch(urls.USER.GET_PROFILE, { params: { id } })
  return response
}
