export type User = {
  id: string
  name: string
  cpf: string
  email: string
  username: string
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
