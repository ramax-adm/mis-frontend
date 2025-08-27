import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

import TabsProvider from "@/contexts/tabs";

interface TabsRootProps extends BoxProps {
  children: ReactNode;
  defaultTab: string;
}
export function TabsRoot({ children, defaultTab, ...props }: TabsRootProps) {
  return (
    <TabsProvider defaultTab={defaultTab}>
      <Box sx={{ width: "100%", ...props.sx }}>{children}</Box>
    </TabsProvider>
  );
}
