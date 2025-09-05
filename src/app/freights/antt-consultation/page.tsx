"use client";
import { PageContainer } from "@/components/PageContainer";
import { PageContainerHeader } from "@/components/PageContainer/header";
import { Box, Grid } from "@mui/material";
import { FreightCompaniesTable } from "./components/table/freight-companies-table";
import { ControlledSelect } from "@/components/Inputs/Select/Customized";

export default function FreightsAnttConsultationPage() {
  return (
    <PageContainer>
      <PageContainerHeader
        title='Fretes - Consulta ANTT'
        sx={{
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 0,
        }}
      />

      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item xs={12}>
          <ControlledSelect
            label='Transportadora'
            name='freightCompany'
            id='freightCompany'
            value={""}
            options={[]}
            size='small'
          />
        </Grid>
        <Grid item xs={12}>
          <Box>Resultado da consulta</Box>
        </Grid>
        <Grid item xs={12}>
          <Box>KPIs</Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item xs={12}>
          <FreightCompaniesTable />
        </Grid>
      </Grid>
    </PageContainer>
  );
}
