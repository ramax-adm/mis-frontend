import { useTabsContext } from '@/contexts/tabs'
import { Box, BoxProps, Tab, Tabs } from '@mui/material'
import { ReactNode } from 'react'

interface TabsOptionsProps extends BoxProps {
  children: ReactNode
}
export function TabsOptions({ children, ...props }: TabsOptionsProps) {
  const { currentTab, handleChange } = useTabsContext()
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', ...props.sx }}>
      <Tabs value={currentTab} onChange={handleChange} aria-label='basic tabs example'>
        {children}
      </Tabs>
    </Box>
  )
}
