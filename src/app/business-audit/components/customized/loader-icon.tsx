import { Box, CircularProgress } from "@mui/material";

export function LoaderIcon() {
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
        size={24} // Aumenta o tamanho do spinner
        thickness={3} // Aumenta a espessura do stroke
      />
    </Box>
  );
}
