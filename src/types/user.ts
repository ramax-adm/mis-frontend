import { AppWebpage } from './application'

export type UserCompanies = {
  id: string
  userId: string
  companyCode: string
}

export type UserAppWebpage = {
  id: string
  userId: string
  user: User
  pageId: string
  page: AppWebpage
  createdAt: Date
}

export type User = {
  id: string
  name: string
  cpf: string
  email: string
  username: string
  userCompanies: UserCompanies[]
  userWebpages: UserAppWebpage[]
  refreshToken: string
  role: string
  isActive?: boolean
}

export type UserRoles = {
  admin: string
  commercial: string
  directory: string
  industry: string
}
export enum UserRoleEnum {
  Admin = 'admin',
  Directory = 'directory',
  Commercial = 'commercial',
  Industry = 'industry',
}

export type UserObject = {
  name: string
  cpf: string
  email: string
  username: string
  role: string
}

export type CreateUser = {
  name: string
  email: string
  password: string
  cpf: string
  role: string
}

export type UpdateUserDto = {
  name?: string
  email?: string
  password?: string
  cpf?: string
  role?: string
  isActive?: boolean
}
