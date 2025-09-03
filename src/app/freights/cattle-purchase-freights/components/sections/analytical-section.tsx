import { RadioInput } from "@/components/Inputs/RadioInput";
import {
  ControlledSelect,
  UncontroledSelect,
} from "@/components/Inputs/Select/Customized";
import { useGetCattleFreightsStatuses } from "@/services/react-query/queries/freights";
import { useGetFreightCompanies } from "@/services/react-query/queries/sensatta";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CattleFreightsTable } from "../tables/cattle-freights-table";
import { forwardRef, useImperativeHandle } from "react";
import { parseAsString, useQueryStates } from "nuqs";
import { RadioInputControlled } from "@/components/Inputs/RadioInput/controlled";

export interface CattlePurchaseFreightsAnalyticalSectionRef {
  getFilterOptions: () => {
    status: string;
    freightCompany: string;
  };
}
interface CattlePurchaseFreightsAnalyticalSectionProps {
  companyCode: string | null;
  startDate: Date | null;
  endDate: Date | null;
}
export const CattlePurchaseFreightsAnalyticalSection = forwardRef<
  CattlePurchaseFreightsAnalyticalSectionRef,
  CattlePurchaseFreightsAnalyticalSectionProps
>(({ companyCode, endDate, startDate }, ref) => {
  const [sectionStates, setSectionStates] = useQueryStates({
    status: parseAsString.withDefault(""),
    freightCompany: parseAsString.withDefault(""),
  });

  const { data: statuses } = useGetCattleFreightsStatuses();
  const { data: freightCompanies } = useGetFreightCompanies();

  // Imperative handlers
  useImperativeHandle(
    ref,
    () => ({
      getFilterOptions: () => ({
        freightCompany: sectionStates.freightCompany,
        status: sectionStates.status,
      }),
    }),
    [sectionStates]
  );

  return (
    <>
      <Box
        sx={{ display: "flex", gap: 2, marginTop: 0.5, alignItems: "center" }}
      >
        <RadioInputControlled
          emptyMessage='Sem Opções'
          value={sectionStates.status}
          onChange={(e) => setSectionStates({ status: e.toString() })}
          label='Status'
          name='status'
          options={statuses}
        />
        <Box sx={{ display: "flex", flexDirection: "column", width: "200px" }}>
          <Typography fontSize={"12px"} fontWeight={700}>
            Transportadora
          </Typography>
          <ControlledSelect
            size='small'
            value={sectionStates.freightCompany}
            onChange={(e) => setSectionStates({ freightCompany: e })}
            id='freight-company'
            name='freightCompany'
            label='Transportadora'
            options={freightCompanies?.map((item) => ({
              label: item.sensattaname,
              value: item.sensattacode,
              key: item.sensattacode,
            }))}
          />
        </Box>
      </Box>

      <CattleFreightsTable
        companyCode={companyCode}
        startDate={startDate}
        endDate={endDate}
        status={sectionStates.status}
        freightCompany={sectionStates.freightCompany}
      />
    </>
  );
});

CattlePurchaseFreightsAnalyticalSection.displayName =
  "CattlePurchaseFreightsAnalyticalSection";
