import { Box, CircularProgress } from "@mui/material";

interface LoaderIconProps {
  size?: number;
}
export function LoaderIcon({ size = 30 }: LoaderIconProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "grid",
        placeContent: "center",
      }}
    >
      <CircularProgress
        color='primary'
        size={size} // Aumenta o tamanho do spinner
        thickness={3} // Aumenta a espessura do stroke
      />
    </Box>
  );
}
