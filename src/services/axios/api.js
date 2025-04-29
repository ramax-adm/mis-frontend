import axios, { AxiosError } from 'axios'
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_API_URL,
  // baseURL: process.env.REACT_APP_API_URL,

  // headers: {
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Credentials': true,
  //   'Access-Control-Allow-Headers': 'Content-Type',
  //   'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
  // },
  // baseURL: 'https://cors-anywhere.herokuapp.com/https://api.finpec.tk/app',
})
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const messages = {
      400: {
        defaultMessage: 'bad request',
        message:
          'Erro nos dados enviados na requisição. Por favor, verifique se todos os valores foram informados corretamente.',
      },
      401: {
        message: 'Acesso não autorizado. Por favor, refaça o login e tente novamente.',
      },
      403: {
        message: 'Acesso não permitido ao recurso solicitado.',
      },
      500: {
        defaultMessage: 'internal server error',
        message: 'Ocorreu um erro inesperado no sistema. Por favor, tente novamente mais tarde.',
      },
    }

    if (error instanceof AxiosError) {
      let errorMessage =
        'Ocorreu um erro inesperado no sistema. Por favor, tente novamente mais tarde.'

      console.log({ error })

      if (error.response) {
        console.log('aqui')

        const { status, data } = error.response

        const currentMessage = messages[status]
        const { defaultMessage, message } = currentMessage

        if (currentMessage) {
          if (defaultMessage && data.message.toLowerCase() !== defaultMessage) {
            errorMessage = data.message
          } else {
            errorMessage = message
          }
        }
      } else if (error.request) {
        errorMessage = 'Erro na comunicação com o servidor. Por favor, tente novamente mais tarde.'
      } else {
        errorMessage =
          'Ocorreu um erro inesperado no sistema. Por favor, tente novamente mais tarde.'
      }

      Object.assign(error, {
        response: {
          data: { ...error?.response?.data, message: errorMessage },
        },
      })
    }
    return Promise.reject(error)
  },
)

export default api
