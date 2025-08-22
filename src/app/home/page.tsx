"use client";
import React, { useEffect } from "react";
import { PageContainer } from "@/components/PageContainer";
import { Box, Divider, Grid, Skeleton, Typography } from "@mui/material";
import { useAuthContext } from "@/contexts/auth";
import { Globe } from "lucide-react";
import { Instagram } from "@/assets/instagram-icon";
import Link from "next/link";
import "@/app/globals.css";
import HomePageVector from "@/assets/homepage-vector";
import { COLORS } from "@/constants/styles/colors";
type HomePageProps = {
  searchParams: {
    operationId?: string;
  };
};

// eslint-disable-next-line no-empty-pattern
export default function Home({}: HomePageProps) {
  const { user, isFetchingUser } = useAuthContext();
  const [mounted, setMounted] = React.useState(false);

  const shortedUserName = user?.name
    ? user.name.trim().split(/\s+/).slice(0, 2).join(" ")
    : "";

  useEffect(() => setMounted(true), []);
  return (
    <PageContainer>
      <Grid container columns={12} sx={{ height: "95dvh" }}>
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              display: "flex",
              height: "100%",
              paddingX: 2,
              flexDirection: "column",
              justifyContent: "center",
              gap: 1,
            }}
          >
            {mounted &&
              (isFetchingUser ? (
                <>
                  <Skeleton variant='rounded' width={500} height={50} />
                  <Skeleton variant='rounded' width={450} height={50} />
                </>
              ) : (
                <Typography
                  variant='h1'
                  sx={{ fontSize: { xs: "48px", md: "64px" } }}
                  fontWeight={600}
                  color={COLORS.TEXTO_ALTERNATIVO}
                >
                  Bem vindo (a), {shortedUserName}
                </Typography>
              ))}

            <Typography
              variant='body1'
              sx={{ fontSize: { xs: "16px", md: "20px" } }}
            >
              Por favor, use o menu para navegar pela aplicação!
            </Typography>

            <Divider
              orientation='horizontal'
              sx={{ color: COLORS.BORDAS_ALTERNATIVA, marginY: 1 }}
            />
            <Typography variant='subtitle2' fontSize={"14px"} fontWeight={400}>
              Caso deseja mais informações da RAMAX, entre nas plataformas
              abaixo:
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "16px",
                width: "100%",
                marginTop: 1,
              }}
            >
              <Link
                className='link'
                target='_blank'
                rel='noreferrer'
                href={`https://www.ramax-group.com/`}
                style={{ textDecoration: "none" }}
              >
                <Globe color='#0F3775' />
              </Link>

              <Link
                className='link'
                target='_blank'
                rel='noreferrer'
                href={`https://www.instagram.com/ramax.official/`}
                style={{ textDecoration: "none" }}
              >
                <Instagram width={24} height={24} fill='#0F3775' />
              </Link>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={0}
          md={7}
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HomePageVector />
        </Grid>
      </Grid>
      <div>
        <Typography
          variant='h3'
          sx={{
            fontSize: "14px",
            position: "absolute",
            bottom: "20px",
            marginLeft: "8px",
            color: "#29323a",
          }}
        >
          {new Date().getFullYear()} © RAMAX - GROUP
        </Typography>
      </div>
    </PageContainer>
  );
}
