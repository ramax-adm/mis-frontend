import { COLORS } from "@/constants/styles/colors";
import { Box, BoxProps, Typography } from "@mui/material";

interface CardRootProps extends BoxProps {}
export function CardRoot(props: CardRootProps) {
  return (
    <Box
      {...props}
      sx={{
        height: "260px",
        display: "flex",
        backgroundColor: "white",
        flexDirection: "column",
        gap: 2,
        paddingX: 3,
        paddingY: 2,
        border: `1px solid ${COLORS.BORDAS}`,
        borderRadius: 3,
        boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.2)",
        ...props?.sx,
      }}
    >
      {props.children}
    </Box>
  );
}
