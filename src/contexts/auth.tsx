"use client";
import { StorageKeysEnum } from "@/constants/app/storage";
import { useGetAppWebpages } from "@/services/react-query/queries/application";
import { useGetUserProfile } from "@/services/react-query/queries/auth";
import { queryKeys } from "@/services/react-query/query-keys";
import { PostLogin } from "@/services/webApi/auth-api";
import { GetUserProfile } from "@/services/webApi/user-api";
import { AppWebpage } from "@/types/application";
import { User, UserRoleEnum, UserRoles } from "@/types/user";
import { PageRoutes } from "@/utils/appRoutes";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/storage.utils";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter, usePathname, useParams } from "next/navigation";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const userDefault: User = {
  id: "",
  name: "",
  cpf: "",
  email: "",
  username: "",
  userCompanies: [],
  userWebpages: [],
  refreshToken: "",
  role: "",
};

export const userRoles: UserRoles = {
  admin: "admin",
  commercial: "commercial",
  directory: "directory",
  industry: "industry",
};

type AuthContext = {
  user: User;
  isFetchingUser: boolean;
  userRoles: UserRoles;
  loadingLogin: boolean;
  loginError: boolean;
  loginErrorMessage: string;
  setLoadingLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginError: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingLoginMessage: React.Dispatch<React.SetStateAction<string>>;
  loginUser: ({
    data: { email, password },
    setError,
    setErrorMessage,
  }: {
    data: {
      email: string;
      password: string;
    };
    setError: React.Dispatch<React.SetStateAction<boolean>>;
    setErrorMessage: Dispatch<SetStateAction<string>>;
  }) => Promise<void>;
  logoutUser: () => void;
};

export const AuthContext = createContext<AuthContext | null>(null);

// TODO: provide JWT token
export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginErrorMessage, setLoadingLoginMessage] = useState("");
  const {
    data: profile,
    isFetching: isFetchingProfile,
    isError: isProfileError,
    error: profileError,
  } = useGetUserProfile();
  const { data: appWebpages = [] } = useGetAppWebpages();

  const getAuthRoutes = () => {
    const storedWebpages = getStoredWebpages();

    const localWebpages = appWebpages && storedWebpages;

    return localWebpages?.filter((i) => i.isAuthPage).map((i) => i.page);
  };

  const getStoredUser = () => {
    const storedUser = getFromLocalStorage(StorageKeysEnum.AUTH_SESSION_USER);

    if (storedUser === "") {
      return undefined;
    }

    return JSON.parse(storedUser) as User;
  };

  const getStoredToken = () => {
    const storedToken = getFromLocalStorage(StorageKeysEnum.AUTH_SESSION_TOKEN);

    if (storedToken === "") {
      return undefined;
    }

    return storedToken;
  };

  const getStoredWebpages = () => {
    const storedWebPages = getFromLocalStorage(
      StorageKeysEnum.AUTH_SESSION_WEBPAGES
    );

    if (storedWebPages === "") {
      return undefined;
    }

    return JSON.parse(storedWebPages) as AppWebpage[];
  };

  const loginUser = async ({
    data: { email, password },
    setError,
    setErrorMessage,
  }: {
    data: {
      email: string;
      password: string;
    };
    setError: Dispatch<SetStateAction<boolean>>;
    setErrorMessage: Dispatch<SetStateAction<string>>;
  }) => {
    setLoadingLogin(true);
    try {
      const params = {
        email: email.toString(),
        password: password.toString(),
      };

      const response = await PostLogin({
        email: params.email,
        password: params.password,
      });

      if (response.data.access_token) {
        localStorage.setItem(
          StorageKeysEnum.AUTH_SESSION_TOKEN,
          response.data.access_token
        );

        const array = {
          id: response.data.user.id,
          name: response.data.user.name,
          cpf: response.data.user.cpf,
          email: response.data.user.email,
          username: response.data.user.name,
          refreshToken: response.data.user.refreshToken,
          userCompanies: response.data.user.userCompanies,
          userWebpages: response.data.user.userWebpages,
          role: response.data.user.role,
          isActive: response.data.user.isActive,
        };

        localStorage.setItem(
          StorageKeysEnum.AUTH_SESSION_USER,
          JSON.stringify(array)
        );
        queryClient.invalidateQueries({
          queryKey: [queryKeys.APPLICATION.WEBPAGES],
          refetchType: "all",
          exact: false,
        });

        setError(false);
        return router.push(PageRoutes.home());
      } else {
        return router.push(PageRoutes.login());
      }
    } catch (error: unknown) {
      setError(true);

      if (error instanceof AxiosError) {
        setErrorMessage(error?.response?.data.message);
      } else {
        setErrorMessage("Ocorreu um erro ao realizar login");
      }
    } finally {
      setLoadingLogin(false);
    }
  };

  const logoutUser = () => {
    console.log("[LOGOUT USER]: redirecting to /login");
    const userPayload = {
      id: "",
      name: "",
      cpf: "",
      email: "",
      userCompanies: [],
      userWebpages: [],
      username: "",
      refreshToken: "",
      role: "",
    };

    setToLocalStorage(StorageKeysEnum.AUTH_SESSION_TOKEN, "");
    setToLocalStorage(
      StorageKeysEnum.AUTH_SESSION_USER,
      JSON.stringify(userPayload)
    );

    const queriesToInvalidate = [
      queryKeys.AUTH.GET_PROFILE.concat(profile?.id ?? ""),
      queryKeys.APPLICATION.WEBPAGES,
      queryKeys.USERS.USER_COMPANIES.GET_FIND_BY_USER,
    ];

    queriesToInvalidate.forEach((query) =>
      queryClient.invalidateQueries({
        queryKey: [query],
        refetchType: "all",
        exact: false,
      })
    );

    setLoadingLogin(false);
    return router.push(PageRoutes.login());
  };

  /*
   * This is a function that tests user authentication for routes
   */

  useEffect(() => {
    console.log("[AUTH PROVIDER]: Use Effect");
    if (typeof window === "undefined") {
      return;
    }
    const storedUser = getStoredUser();
    const storedToken = getStoredToken();
    const storedWebpages = getStoredWebpages();
    const authRoutes = getAuthRoutes();

    // checar se tem algum usuario
    const haveSomeUserDataStored = !!storedToken && !!storedUser;
    if (!haveSomeUserDataStored) {
      return logoutUser();
    }
    console.log("haveSomeDataStored passed");

    // checar se tem algum profile
    const localProfile = profile ?? storedUser;
    if (!localProfile) {
      return logoutUser();
    }

    console.log("profile passed");

    // checar se a pagina atual é uma rota autenticada
    const isCurrentPageAnAuthRoute = !!authRoutes?.find((i) => i === pathname);
    if (!isCurrentPageAnAuthRoute) {
      return;
    }
    console.log("isCurrentPageAnAuthRoute passed");

    const localWebpages = appWebpages && storedWebpages;
    const currentPage = localWebpages?.find((i) => i.page === pathname);
    const isPublicPage = currentPage?.isPublic ?? false;
    const isAdminUser = localProfile?.role === "admin";
    const hasPagePermission = localProfile?.userWebpages?.some(
      (i) => i.page.page === pathname
    );

    const isCurrentPageAllowed =
      isPublicPage || isAdminUser || hasPagePermission;

    console.log({ pathname, currentPage, localProfile });
    console.log({
      isPublicPage,
      isAdminUser,
      hasPagePermission,
      isCurrentPageAllowed,
    });

    // checar se o usuario tem a webpage
    if (!isCurrentPageAllowed) {
      return logoutUser();
    }
    console.log("isCurrentPageAllowed passed");
  }, [pathname]);

  useEffect(() => {
    console.log("[PROFILE]: Use Effect");
    console.log({ isFetchingProfile, profileError });

    if (!isFetchingProfile && profileError?.isUnauthorized()) {
      return logoutUser();
    }
  }, [pathname, isFetchingProfile]);

  return (
    <AuthContext.Provider
      value={{
        user: profile ?? userDefault,
        isFetchingUser: isFetchingProfile,
        userRoles,
        loadingLogin,
        loginError,
        loginErrorMessage,
        setLoadingLogin,
        setLoginError,
        setLoadingLoginMessage,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used with AuthContextProvider");
  }
  return context;
}
