import { Box, CircularProgress } from "@mui/material";

interface LoaderIconProps {
  size?: number;
  thickness?: number;
}
export function LoaderIcon({ size = 24, thickness = 3 }: LoaderIconProps) {
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
        thickness={thickness} // Aumenta a espessura do stroke
      />
    </Box>
  );
}
