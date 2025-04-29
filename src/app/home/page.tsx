'use client'
import React, { useEffect } from 'react'
import { PageContainer } from '@/components/PageContainer'
import { PageContainerHeader } from '@/components/PageContainer/header'
import { useRouter } from 'next/navigation'
import { PageRoutes } from '@/utils/appRoutes'

type HomePageProps = {
  searchParams: {
    operationId?: string
  }
}

// eslint-disable-next-line no-empty-pattern
export default function Home({}: HomePageProps) {
  // const router = useRouter()

  // useEffect(() => {
  //   router.push(PageRoutes.cashFlow())
  // }, [router])
  return (
    <PageContainer>
      <PageContainerHeader sx={{ textAlign: 'center' }} title='Inicio ' />
    </PageContainer>
  )
}
