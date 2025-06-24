import { GetFetch, urls } from '../axios/api-base'

export async function GetAppWebpages() {
  const response = await GetFetch(urls.APPLICATION.GET_WEBPAGES)

  return response.data
}
