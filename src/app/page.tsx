'use client'
import { PageRoutes } from '@/utils/appRoutes'
import { Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RootPage() {
  const router = useRouter()
  useEffect(() => {
    router.push(PageRoutes.home())
  }, [router])

  return (
    <main
      style={{
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      }}
    >
      <div>
        <Typography
          variant='h3'
          sx={{
            fontSize: '14px',
            position: 'absolute',
            bottom: '20px',
            color: '#29323a',
          }}
        >
          {new Date().getFullYear()} © RAMAX - GROUP
        </Typography>
      </div>
    </main>
  )
}
