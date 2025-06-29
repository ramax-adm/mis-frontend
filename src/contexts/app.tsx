'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { SvgIconProps } from '@mui/material'
import { LuLayers } from 'react-icons/lu'
import { HiMiniUsers } from 'react-icons/hi2'
import { IconType } from 'react-icons'
import { FaMoneyBillAlt } from 'react-icons/fa'
import { PageRoutes } from '@/utils/appRoutes'
import { userRoles } from './auth'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { PiCrownFill } from 'react-icons/pi'
import { MdLocalShipping } from 'react-icons/md'
import { IoLayersSharp } from 'react-icons/io5'
import { IoPeople } from 'react-icons/io5'
import { FaCirclePlus } from 'react-icons/fa6'
import { useGetAppWebpages } from '@/services/react-query/queries/application'
import { AppWebpage } from '@/types/application'

type AppContextProviderProps = {
  children: React.ReactNode
}

type MenuItem = {
  name: string
  href: string
  icon: (props: SvgIconProps) => JSX.Element
}[]

export type SideNavItem = {
  title: string
  path: string
  icon?: IconType
  submenu?: boolean
  subMenuItems?: SideNavItem[]
  role?: string[]
}

type AppContext = {
  webpages: AppWebpage[]
  isCollapsed: boolean
  isBurgerMenuOpened: boolean
  width: number
  isMobile: boolean
  menuItems: MenuItem
  NAV_ITEMS: SideNavItem[]
  toggleSidebarcollapse: () => void
  openSidebarcollapse: () => void
  closeSidebarcollapse: () => void
  toggleBurgerMenuOpened: () => void
  openBurgerMenu: () => void
  closeBurgerMenu: () => void
}

export const AppContext = createContext<AppContext | null>(null)

export default function AppProvider({ children }: AppContextProviderProps) {
  const [isCollapsed, setCollapse] = useState(false)
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false)
  const [width, setWidth] = useState(0)

  const { data: webpages = [] } = useGetAppWebpages()

  const isMobile = width <= 768

  const menuItems: MenuItem = []

  const NAV_ITEMS: SideNavItem[] = [
    {
      title: 'CASH FLOW',
      path: PageRoutes.cashFlow(),
      role: [userRoles.admin, userRoles.directory, userRoles.industry],
      icon: RiMoneyDollarCircleFill,
      submenu: false,
    },
    {
      title: 'BOI CAMPEÃO',
      path: PageRoutes.championCattle(),
      role: [userRoles.admin, userRoles.directory, userRoles.industry],
      icon: PiCrownFill,
      submenu: false,
    },
    {
      title: 'ESTOQUE',
      path: PageRoutes.stock(),
      icon: IoLayersSharp,
      submenu: true,
      subMenuItems: [
        {
          path: PageRoutes.miStock(),
          title: 'Produtos MI',
        },
        {
          path: PageRoutes.meStock(),
          title: 'Produtos ME',
        },
      ],
    },
    {
      title: 'FRETES',
      path: PageRoutes.freights(),
      icon: MdLocalShipping,
      submenu: true,
      subMenuItems: [
        {
          path: PageRoutes.cattlePurchaseFreights(),
          title: 'Compra Gado',
        },
      ],
    },
    {
      title: 'RH',
      path: PageRoutes.humanResources(),
      icon: IoPeople,
      submenu: true,
      subMenuItems: [
        {
          path: PageRoutes.humanResourcesHours(),
          title: 'Horas Extras',
        },
      ],
    },
    {
      title: 'OUTROS',
      path: PageRoutes.others(),
      role: [userRoles.admin, userRoles.directory],
      icon: FaCirclePlus,
      submenu: true,
      subMenuItems: [
        {
          path: PageRoutes.users(),
          title: 'Usuarios',
        },
        {
          path: PageRoutes.uploads(),
          title: 'Uploads',
        },
        {
          path: PageRoutes.storageSyncedFiles(),
          title: 'Snapshots',
        },
      ],
    },
    // {
    //   title: 'USUARIOS',
    //   path: PageRoutes.users(),
    //   role: [userRoles.admin, userRoles.directory],
    //   icon: HiMiniUsers,
    //   submenu: false,
    // },
  ]

  const toggleSidebarcollapse = () => {
    setCollapse((prevState) => !prevState)
  }

  const openSidebarcollapse = () => {
    setCollapse(true)
  }

  const closeSidebarcollapse = () => {
    setCollapse(false)
  }

  const toggleBurgerMenuOpened = () => {
    setIsBurgerMenuOpened((prevState) => !prevState)
  }

  const openBurgerMenu = () => {
    setIsBurgerMenuOpened(true)
  }

  const closeBurgerMenu = () => {
    setIsBurgerMenuOpened(false)
  }

  const updateWidth = () => {
    const newWidth = window.innerWidth
    const isMobile = newWidth <= 768
    setCollapse(!isMobile)
    setWidth(newWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', updateWidth)
    updateWidth()
  }, [])

  return (
    <AppContext.Provider
      value={{
        webpages,
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
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used with AppContextProvider')
  }
  return context
}
