import { useTabsContext } from '@/contexts/tabs'
import { Box, BoxProps, Tab, Tabs } from '@mui/material'
import { ReactNode } from 'react'

interface TabsSelectProps extends BoxProps {
  children: ReactNode
}
export function TabsSelect({ children, ...props }: TabsSelectProps) {
  const { currentTab, handleChange } = useTabsContext()
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', ...props.sx }}>
      <Tabs value={currentTab} onChange={handleChange} aria-label='basic tabs example'>
        {children}
      </Tabs>
    </Box>
  )
}
