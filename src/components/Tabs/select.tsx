import { useTabsContext } from "@/contexts/tabs";
import { Box, BoxProps, Tab, Tabs } from "@mui/material";
import { ReactNode } from "react";

interface TabsSelectProps extends BoxProps {
  children: ReactNode;
  customHandler?: (value: string) => void;
}
export function TabsSelect({
  children,
  customHandler,
  ...props
}: TabsSelectProps) {
  const { currentTab, handleChange } = useTabsContext();
  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: "divider",

        ...props.sx,
      }}
    >
      <Tabs
        value={currentTab}
        variant='scrollable'
        onChange={(e, value) => {
          handleChange(e, value);
          if (typeof customHandler === "function") {
            customHandler(value);
          }
        }}
        aria-label='basic tabs example'
      >
        {children}
      </Tabs>
    </Box>
  );
}
