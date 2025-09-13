import { StorageKeysEnum } from "@/constants/app/storage";
import { AxiosInstance } from "axios";
// TODO: use this to improve unexpected errors
const API_ERROR_MESSAGES = {
  400: {
    defaultMessage: "bad request",
    message:
      "Erro nos dados enviados na requisição. Por favor, verifique se todos os valores foram informados corretamente.",
  },
  401: {
    message:
      "Acesso não autorizado. Por favor, refaça o login e tente novamente.",
  },
  403: {
    message: "Acesso não permitido ao recurso solicitado.",
  },

  404: {
    message: "Recurso não encontrado.",
  },
  409: {
    defaultMessage: "conflict exception",
    message: "Conflito, reveja o cadastro e tente novamente",
  },
  500: {
    defaultMessage: "internal server error",
    message:
      "Ocorreu um erro inesperado no sistema. Por favor, tente novamente mais tarde.",
  },
};

export class ApiCustomError {
  message?: string;
  status?: number;

  constructor({ message = "", status = null }) {
    Object.assign(this, { message, status });
  }

  isForbidden() {
    return this.status === 403;
  }

  isUnauthorized() {
    return this.status === 401;
  }

  isRequestError() {
    return [
      400, // Bad Request
      401, // Unauthorized
      403, // Forbidden
      405, // Method Not Allowed
      409, // Conflict
      415, // Unsupported Media Type
      422, // Unprocessable Entity
    ].includes(this.status ?? 0);
  }

  isNotFound() {
    return this.status === 404;
  }

  isServerError() {
    return this.status || 0 > 500;
  }

  toEntity() {
    return this;
  }

  set setMessage(message: string) {
    this.message = message;
  }

  set setStatus(status: number) {
    this.status = status;
  }
}

export const normalizeError = (error: any): ApiCustomError => {
  const customError = new ApiCustomError({});
  if (error instanceof Error || error?.isAxiosError === undefined) {
    customError.setMessage = error?.message ?? "Erro desconhecido da API";
    return customError;
  }

  if (
    !error?.response ||
    !error?.response?.data ||
    !error?.response?.data?.message
  ) {
    customError.setMessage = error?.message ?? "Erro desconhecido da API";
    customError.setStatus = error?.response?.status;
    return customError;
  }

  customError.setMessage = error?.response?.data?.message;
  customError.setStatus = error?.response?.status;

  return customError.toEntity();
};

export const setRequestBearerToken = (api: AxiosInstance) => {
  const JWT = localStorage.getItem(StorageKeysEnum.AUTH_SESSION_TOKEN);
  api.defaults.headers.authorization = `Bearer ${JWT}`;
};
