import { Box } from '@mui/material'

interface TabPanelProps {
  children?: React.ReactNode
  dir?: string
  value: string
  tabName: string
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, tabName, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== tabName}
      id={`full-width-tabpanel-${tabName}`}
      aria-labelledby={`full-width-tab-${tabName}`}
      {...other}
    >
      {value === tabName && <Box>{children}</Box>}
    </div>
  )
}
