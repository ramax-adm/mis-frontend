'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SideNavItem, useAppContext } from '@/contexts/app'
import { blue, grey } from '@mui/material/colors'
import { useAuthContext } from '@/contexts/auth'

import { Box, Button, Typography } from '@mui/material'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { RiLogoutBoxFill } from 'react-icons/ri'
import { IconType } from 'react-icons'
import Image from 'next/image'
import RamaxLogo from '@/assets/RAMAX-Group_Horizontal_Cor.png'
import RamaxMiniLogo from '@/assets/RAMAX-Group_Vertical_Cor.png'
import { COLORS } from '@/constants/styles/colors'

type Props = {
  logout: () => void
}

const SideNav = (props: Props) => {
  const { isCollapsed, NAV_ITEMS, toggleSidebarcollapse } = useAppContext()
  const { user } = useAuthContext()

  return (
    <Box
      sx={{
        display: { xs: 'none', sm: 'flex' },
        position: 'fixed',
        flex: '1 1 0%',
        height: '100%',
        backgroundColor: '#fff',
        borderLeft: '1px solid rgba(62, 99, 221, 0.2)',
      }}
    >
      <button
        style={{
          position: 'absolute',
          right: '15px',
          top: '4.7rem',
          width: '1.5rem',
          height: '1.5rem',
          border: '1px solid #e5e7eb',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          transform: 'translateX(50%)',
          fontSize: '1.5rem',
        }}
        onClick={toggleSidebarcollapse}
      >
        {isCollapsed ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
      </button>
      <aside
        style={{
          width: isCollapsed ? '12rem' : '48px',
          height: '100%',
          paddingRight: '1.5rem',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)',
          overflow: 'hidden',
        }}
        data-collapse={isCollapsed}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '97%',
          }}
        >
          <Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                paddingBottom: '1rem',
                marginBottom: '1rem',
                '&:hover': {
                  // transition: 'all 0.4s ease-out',
                  transform: 'scale(1.05)',
                },
              }}
            >
              <Link href='/home'>
                <Image
                  style={{
                    width: isCollapsed ? '14rem' : '3rem',
                    height: '4rem',
                    objectFit: 'contain',
                  }}
                  src={isCollapsed ? RamaxLogo : RamaxMiniLogo}
                  alt='logo'
                />
              </Link>
            </Box>

            <Box
              sx={{
                display: 'flex',
                marginTop: '0.5rem',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
              }}
            >
              {NAV_ITEMS.map((item, idx) => {
                if (item.role && item.role?.length > 0 && !item.role?.includes(user?.role)) {
                  return null
                } else {
                  return <MenuItem key={idx} item={item} Icon={item.icon} />
                }
              })}
              <Button
                onClick={() => props.logout()}
                sx={{
                  display: 'flex',
                  paddingX: 0,
                  paddingY: 0,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: '0.5rem',
                  marginTop: '0.5rem',
                  width: '100%',
                  '&:hover': { backgroundColor: 'rgba(62, 99, 221, 0.2)' },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    color: '#000',
                    width: '100%',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '1.2rem',
                      marginTop: 2,
                      marginLeft: '0.2rem',
                    }}
                  >
                    <RiLogoutBoxFill />
                  </span>
                  {isCollapsed && (
                    <Typography
                      sx={{
                        display: 'flex',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        fontFamily: 'sans-serif',
                        marginLeft: 1.5,
                        marginTop: -0.2,
                      }}
                    >
                      Sair
                    </Typography>
                  )}
                </Box>
              </Button>
            </Box>
          </Box>
        </Box>
      </aside>
    </Box>
  )
}

export default SideNav

const MenuItem = ({ item, Icon }: { item: SideNavItem; Icon?: IconType }) => {
  const { isCollapsed, openSidebarcollapse } = useAppContext()
  const pathname = usePathname()
  const [subMenuOpen, setSubMenuOpen] = useState(false)
  const [authorizedSubmenus, setAuthorizedSubmenus] = useState<SideNavItem[]>()
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen)
    openSidebarcollapse()
  }
  const { user } = useAuthContext()

  useEffect(() => {
    const submenus =
      item.subMenuItems?.filter((subItem) => {
        const isPublic = !subItem.role
        const hasPermission = subItem.role?.includes(user.role)
        return isPublic || hasPermission
      }) || []
    setAuthorizedSubmenus(submenus)

    const menuPaths = submenus.map((submenu) => submenu.path)
    if (menuPaths.some((path) => pathname.includes(path))) {
      setSubMenuOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.subMenuItems, user.role])

  return (
    <Box
      sx={{
        marginTop: '0.5rem',
      }}
    >
      {item.submenu ? (
        <>
          <Button
            onClick={toggleSubMenu}
            sx={{
              display: 'flex',
              paddingX: '0.1rem',
              paddingY: '4px',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: '0.5rem',
              width: '100%',
              '&:hover': { backgroundColor: 'rgba(62, 99, 221, 0.2)' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                color: grey[900],
              }}
            >
              {item.icon && Icon ? (
                <span style={{ display: 'inline-block', fontSize: '1.2rem', marginLeft: '0.2rem' }}>
                  <Icon />
                </span>
              ) : (
                ''
              )}
              {isCollapsed && (
                <Typography
                  sx={{
                    display: 'flex',
                    fontSize: '0.8rem',
                    lineHeight: '1.75rem',
                    fontWeight: 700,
                    fontFamily: 'sans-serif',
                    marginLeft: 1.5,
                  }}
                >
                  {item.title}
                </Typography>
              )}
            </Box>

            <Box>{subMenuOpen && isCollapsed ? <IoIosArrowUp /> : <IoIosArrowDown />}</Box>
          </Button>

          {subMenuOpen && isCollapsed && (
            <Box
              sx={{
                display: 'flex',

                marginLeft: '2rem',
                marginRight: '1rem',
                flexDirection: 'column',
              }}
            >
              {authorizedSubmenus?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    style={{
                      display: 'flex',
                      padding: '0.3rem',
                      marginLeft: '0.5rem',
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      fontFamily: 'sans-serif',
                      fontWeight: `${pathname.includes(subItem.path) ? 700 : 500}`,
                      fontSize: '0.75rem',
                      color: grey[900],
                    }}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                )
              })}
            </Box>
          )}
        </>
      ) : (
        <Box
          sx={{
            display: 'flex',
            paddingX: '0.1rem',
            paddingY: '4px',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '0.5rem',
            width: '100%',
            backgroundColor: item.path === location.pathname ? 'rgba(62, 99, 221, 0.3)' : '',
            '&:hover': { backgroundColor: 'rgba(62, 99, 221, 0.2)' },
          }}
          // sx={{
          //   paddingX: '0.1rem',
          //   paddingY: '4px',
          //   borderRadius: '0.5rem',
          //   width: '100%',

          //   '&:hover': { backgroundColor: 'rgba(62, 99, 221, 0.2)' },
          // }}
        >
          <Link
            href={item.path}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              textDecoration: 'none',
              fontFamily: 'sans-serif',
              width: '100%',
              color: location.pathname === item.path ? '#3E63DD' : '#000',
            }}
          >
            {item.icon && Icon ? (
              <span style={{ display: 'inline-block', fontSize: '1.2rem', marginLeft: '0.2rem' }}>
                <Icon />
              </span>
            ) : (
              ''
            )}
            {isCollapsed && (
              <Typography
                sx={{
                  display: 'flex',
                  fontSize: '0.8rem',
                  lineHeight: '1.75rem',
                  fontWeight: 700,
                  fontFamily: 'sans-serif',
                  marginLeft: 1.5,
                }}
              >
                {item.title}
              </Typography>
            )}
          </Link>
        </Box>
      )}
    </Box>
  )
}
