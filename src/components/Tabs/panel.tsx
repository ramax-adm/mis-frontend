import { useTabsContext } from '@/contexts/tabs'
import { forwardRef, useEffect, useImperativeHandle } from 'react'
import { ReactNode } from 'react'
import { TabPanel } from './core/tab-panel'

export interface TabsPanelRef {
  getCurrentTabName: () => string
}

interface TabsPanelProps {
  tabName: string
  children: ReactNode
}

export const TabsPanel = forwardRef<TabsPanelRef, TabsPanelProps>(({ tabName, children }, ref) => {
  const { currentTab } = useTabsContext()

  useImperativeHandle(
    ref,
    () => ({
      getCurrentTabName: () => currentTab,
    }),
    [currentTab],
  )

  return (
    <TabPanel value={currentTab} tabName={tabName}>
      {children}
    </TabPanel>
  )
})

TabsPanel.displayName = 'TabsPanel'
