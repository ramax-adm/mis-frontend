import api from '../axios/api'
import { urls } from '../axios/api-base'

interface PostForgotPasswordRequest {
  email: string
}
export async function PostForgotPassword({ email }: PostForgotPasswordRequest) {
  const response = await api.post(urls.AUTH.POST_FORGOT_PASSWORD, { email })

  return response.data
}

interface PostCheckTokenRequest {
  email: string
  token: string
}
export async function PostCheckToken({ email, token }: PostCheckTokenRequest) {
  const response = await api.post(urls.AUTH.POST_CHECK_TOKEN, { email, token })

  return response.data
}

interface PostResetPasswordRequest {
  email: string
  password: string
  token: string
}
export async function PostResetPassword({ email, password, token }: PostResetPasswordRequest) {
  const response = await api.post(urls.AUTH.POST_RESET_PASSWORD, { email, password, token })

  return response.data
}

interface PostLoginRequest {
  email: string
  password: string
}
export async function PostLogin({ email, password }: PostLoginRequest) {
  const response = await api.post(urls.AUTH.DO_LOGIN, { email, password })

  return response
}
