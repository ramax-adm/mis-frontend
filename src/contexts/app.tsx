"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { SvgIconProps } from "@mui/material";
import { IconType } from "react-icons";
import { PageRoutes } from "@/utils/appRoutes";
import { userRoles } from "./auth";
import { PiCrownFill } from "react-icons/pi";
import { MdLocalShipping, MdReceipt, MdTrendingUp } from "react-icons/md";
import { IoLayersSharp } from "react-icons/io5";
import { IoPeople } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";
import { useGetAppWebpages } from "@/services/react-query/queries/application";
import { AppWebpage } from "@/types/application";
import { MdFactCheck } from "react-icons/md";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa";
import { User, UserRoleEnum } from "@/types/user";

type AppContextProviderProps = {
  children: React.ReactNode;
};

type MenuItem = {
  name: string;
  href: string;
  icon: (props: SvgIconProps) => JSX.Element;
}[];

export type SideNavItem = {
  title: string;
  path: string;
  icon?: IconType;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
  role?: string[];
};

type AppContext = {
  webpages: AppWebpage[];
  isFetchingWebpages: boolean;
  isCollapsed: boolean;
  isBurgerMenuOpened: boolean;
  width: number;
  isMobile: boolean;
  menuItems: MenuItem;
  NAV_ITEMS: SideNavItem[];
  toggleSidebarcollapse: () => void;
  openSidebarcollapse: () => void;
  closeSidebarcollapse: () => void;
  toggleBurgerMenuOpened: () => void;
  openBurgerMenu: () => void;
  closeBurgerMenu: () => void;
  checkPagePermission: ({
    user,
    webpages,
    item,
  }: {
    user: User;
    webpages: AppWebpage[];
    item: SideNavItem;
  }) => boolean;
};

export const AppContext = createContext<AppContext | null>(null);

export default function AppProvider({ children }: AppContextProviderProps) {
  const [isCollapsed, setCollapse] = useState(false);
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);
  const [width, setWidth] = useState(0);

  const { data: webpages = [], isFetching: isFetchingWebpages } =
    useGetAppWebpages();

  const isMobile = width <= 768;

  const menuItems: MenuItem = [];

  const NAV_ITEMS: SideNavItem[] = [
    {
      title: "Intranet",
      path: PageRoutes.intranet(),
      icon: FaGlobe,
      submenu: false,
    },
    {
      title: "Cash Flow",
      path: PageRoutes.cashFlow(),
      icon: FaMoneyBillTransfer,
      submenu: false,
    },
    {
      title: "Boi Campeão",
      path: PageRoutes.championCattle(),
      icon: PiCrownFill,
      submenu: false,
    },
    {
      title: "Monitoramento",
      path: PageRoutes.businessAudit(), // TODO: mudar para businessMonitoring
      icon: MdFactCheck,
      submenu: false,
    },
    // {
    //   title: "DRE OPERAÇÃO",
    //   path: PageRoutes.operationFinanceSummary(),
    //   icon: RiMoneyDollarCircleFill,
    //   submenu: false,
    // },
    {
      title: "Compras",
      path: PageRoutes.cattleRegistries(),
      icon: FaMoneyCheckAlt,
      submenu: true,
      subMenuItems: [
        {
          path: PageRoutes.cattlePurchase(),
          title: "Compra de gado",
        },
      ],
    },
    {
      title: "Estoque",
      path: PageRoutes.stock(),
      icon: IoLayersSharp,
      submenu: true,
      subMenuItems: [
        {
          path: PageRoutes.miStock(),
          title: "Produtos MI",
        },
        {
          path: PageRoutes.meStock(),
          title: "Produtos ME",
        },
        {
          path: PageRoutes.incomingBatches(),
          title: "Etiquetas",
        },
        {
          path: PageRoutes.stockBalance(),
          title: "Saldo Estoque",
        },
      ],
    },
    {
      title: "Fretes",
      path: PageRoutes.freights(),
      icon: MdLocalShipping,
      submenu: true,
      subMenuItems: [
        {
          path: PageRoutes.cattlePurchaseFreights(),
          title: "Compra Gado",
        },
      ],
    },
    {
      title: "Vendas",
      path: PageRoutes.sales(),
      icon: MdReceipt,
      submenu: true,
      subMenuItems: [
        {
          path: PageRoutes.invoices(),
          title: "Notas Fiscais",
        },
      ],
    },
    {
      title: "RH",
      path: PageRoutes.humanResources(),
      icon: IoPeople,
      submenu: true,
      subMenuItems: [
        {
          path: PageRoutes.humanResourcesHours(),
          title: "Horas Extras",
        },
      ],
    },
    {
      title: "Outros",
      path: PageRoutes.others(),
      role: [userRoles.admin, userRoles.directory],
      icon: FaCirclePlus,
      submenu: true,
      subMenuItems: [
        {
          path: PageRoutes.users(),
          title: "Usuarios",
        },
        {
          path: PageRoutes.uploads(),
          title: "Uploads",
        },
        {
          path: PageRoutes.storageSyncedFiles(),
          title: "Snapshots",
        },
        // {
        //   path: PageRoutes.parameters(),
        //   title: "Parametros",
        // },
      ],
    },
    // {
    //   title: 'USUARIOS',
    //   path: PageRoutes.users(),
    //   role: [userRoles.admin, userRoles.directory],
    //   icon: HiMiniUsers,
    //   submenu: false,
    // },
  ];

  const toggleSidebarcollapse = () => {
    setCollapse((prevState) => !prevState);
  };

  const openSidebarcollapse = () => {
    setCollapse(true);
  };

  const closeSidebarcollapse = () => {
    setCollapse(false);
  };

  const toggleBurgerMenuOpened = () => {
    setIsBurgerMenuOpened((prevState) => !prevState);
  };

  const openBurgerMenu = () => {
    setIsBurgerMenuOpened(true);
  };

  const closeBurgerMenu = () => {
    setIsBurgerMenuOpened(false);
  };

  const updateWidth = () => {
    const newWidth = window.innerWidth;
    const isMobile = newWidth <= 768;
    setCollapse(!isMobile);
    setWidth(newWidth);
  };

  const checkPagePermission = ({
    user,
    webpages,
    item,
  }: {
    user: User;
    webpages: AppWebpage[];
    item: SideNavItem;
  }) => {
    const isUserAdmin = user.role === UserRoleEnum.Admin;
    const isUserHasWebpage = user?.userWebpages?.find(
      (i) => i.page.page === item.path
    );
    const isPublicPage = webpages.find(
      (i) => i.page === item.path && i.isPublic
    );

    return !!isUserHasWebpage || !!isPublicPage || !!isUserAdmin;
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
  }, []);

  return (
    <AppContext.Provider
      value={{
        webpages,
        isFetchingWebpages,
        isCollapsed,
        isBurgerMenuOpened,
        width,
        isMobile,
        menuItems,
        NAV_ITEMS,
        toggleSidebarcollapse,
        openSidebarcollapse,
        closeSidebarcollapse,
        toggleBurgerMenuOpened,
        openBurgerMenu,
        closeBurgerMenu,
        checkPagePermission,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used with AppContextProvider");
  }
  return context;
}
