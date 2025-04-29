'use client'
import { Box } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useAppContext } from '@/contexts/app'

const BurgerMenu = () => {
  const { isBurgerMenuOpened, toggleBurgerMenuOpened } = useAppContext()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        top: 0,
      }}
    >
      <Box onClick={toggleBurgerMenuOpened}>
        {isBurgerMenuOpened ? (
          <CloseIcon fontSize='large' color='primary' />
        ) : (
          <MenuIcon fontSize='large' color='primary' />
        )}
      </Box>
    </Box>
  )
}

export default BurgerMenu
