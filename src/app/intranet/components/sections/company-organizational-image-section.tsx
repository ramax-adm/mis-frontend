import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { COLORS } from "@/constants/styles/colors";
import Organograma from "../../assets/Organograma.jpg";

export function CompanyOrganizationalImageSection() {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100; // posição em %
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <Grid container>
      <Grid item xs={12} marginTop={1} marginX={1}>
        <Typography fontSize={"12px"} fontWeight={700}>
          Organograma empresarial da RAMAX
        </Typography>
      </Grid>
      <Grid item xs={12} marginX={1}>
        <Box
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          style={{
            overflow: "hidden",
            width: "100%",
            height: "500px",
            position: "relative",
            border: `1px solid ${COLORS.BORDAS}`,
            borderRadius: "4px",
          }}
        >
          <Image
            src={Organograma.src}
            alt='Organograma'
            fill
            style={{
              objectFit: "fill",
              transition: isZoomed
                ? "transform 0.1s ease"
                : "transform 0.5s ease",
              transformOrigin: `${position.x}% ${position.y}%`,
              transform: isZoomed ? "scale(1.5)" : "scale(1)",
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
