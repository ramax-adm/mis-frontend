import { createContext, useContext, useState } from 'react'

type TabsContextProviderProps = {
  children: React.ReactNode
  defaultTab: string
}
type TabsContextProps = {
  currentTab: string
  handleChange: (event: React.SyntheticEvent, newValue: string) => void
}
const TabsContext = createContext<TabsContextProps | null>(null)

export default function TabsProvider({ children, defaultTab }: TabsContextProviderProps) {
  const [value, setValue] = useState(defaultTab)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <TabsContext.Provider
      value={{
        currentTab: value,
        handleChange,
      }}
    >
      {children}
    </TabsContext.Provider>
  )
}

export function useTabsContext() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('useTabsContext must be used with TabsContextProvider')
  }
  return context
}
