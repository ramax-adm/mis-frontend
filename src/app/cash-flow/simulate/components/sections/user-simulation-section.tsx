import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import { UserSimulationsCard } from "../cards/user-simulations-card";
import { UseSaveUserSimulationRequest } from "@/types/mutations/cash-flow";

interface UserSimulationsSectionProps {
  data?: UseSaveUserSimulationRequest;
}
export function UserSimulationsSection({ data }: UserSimulationsSectionProps) {
  const [showTable, setShowTable] = useState(false);

  return (
    <Box
      marginTop={6}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: { xs: "350px", sm: "430px", md: "820px", xl: "98%" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button
          variant='contained'
          size='small'
          onClick={() => setShowTable((state) => !state)}
        >
          {showTable ? "Ocultar" : "Mostrar historico de simulações"}
        </Button>
      </Box>
      <UserSimulationsCard showTable={showTable} data={data} />
    </Box>
  );
}
