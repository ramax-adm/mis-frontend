import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export const LoadingOverlay = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Fundo semi-transparente
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // Garantir que o overlay fique acima de outros elementos
      }}
    >
      <CircularProgress
        color='primary'
        size={80} // Aumenta o tamanho do spinner
        thickness={5} // Aumenta a espessura do stroke
      />{' '}
      {/* Spinner de carregamento */}
    </Box>
  )
}
