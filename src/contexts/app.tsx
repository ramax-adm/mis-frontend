'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { SvgIconProps } from '@mui/material'
import { LuLayers } from 'react-icons/lu'
import { HiMiniUsers } from 'react-icons/hi2'
import { IconType } from 'react-icons'
import { FaMoneyBillAlt } from 'react-icons/fa'
import { PageRoutes } from '@/utils/appRoutes'
import { userRoles } from './auth'

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

  const isMobile = width <= 768

  const menuItems: MenuItem = [
    {
      name: 'CASH FLOW',
      href: PageRoutes.cashFlow(),
      icon: FaMoneyBillAlt,
    },
    {
      name: 'ESTOQUE',
      href: PageRoutes.stock(),
      icon: LuLayers,
    },
    {
      name: 'USUARIOS',
      href: PageRoutes.users(),
      icon: HiMiniUsers,
    },
    // END SUBMENU
  ]

  const NAV_ITEMS: SideNavItem[] = [
    {
      title: 'CASH FLOW',
      path: PageRoutes.cashFlow(),
      role: [userRoles.admin, userRoles.directory, userRoles.industry],
      icon: FaMoneyBillAlt,
      submenu: true,
      subMenuItems: [
        {
          path: PageRoutes.cashFlow(),
          title: 'Simulador',
        },
        {
          path: PageRoutes.championCattle(),
          title: 'Boi Campeão',
        },
      ],
    },
    {
      title: 'ESTOQUE',
      path: PageRoutes.stock(),
      icon: LuLayers,
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
      title: 'USUARIOS',
      path: PageRoutes.users(),
      role: [userRoles.admin, userRoles.directory],
      icon: HiMiniUsers,
      submenu: false,
    },
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
