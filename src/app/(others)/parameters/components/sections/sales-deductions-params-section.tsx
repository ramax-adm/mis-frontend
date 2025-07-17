import { RadioInputControlled } from "@/components/Inputs/RadioInput/controlled";
import { TextInputControlled } from "@/components/Inputs/TextInput/controlled";
import { MarketEnum } from "@/types/sensatta";
import { Grid } from "@mui/material";
import { useState } from "react";
import { SalesDeductionsParamsTable } from "../tables/sales-deductions-params-table";

const MARKETS_OPTIONS = [
  {
    label: "TODOS",
    key: MarketEnum.BOTH,
    value: MarketEnum.BOTH,
  },
  {
    label: "ME",
    key: MarketEnum.ME,
    value: MarketEnum.ME,
  },
  {
    label: "MI",
    key: MarketEnum.MI,
    value: MarketEnum.MI,
  },
];

interface SalesDeductionsParamsSectionProps {
  companyCode: string | null;
}
export function SalesDeductionsParamsSection({
  companyCode,
}: SalesDeductionsParamsSectionProps) {
  const [selectedMarket, setSelectedMarket] = useState<string>("");
  const [parameterName, setParameterName] = useState<string>("");

  const handleSelectMarket = (value: string) => setSelectedMarket(value);
  const handleSetParameterName = (value: string | null) =>
    setParameterName(value ?? "");
  return (
    <>
      <Grid container marginTop={1}>
        <Grid item xs={12} sm={2}>
          <RadioInputControlled
            label='Mercado'
            name='market'
            emptyMessage='Sem opções'
            value={selectedMarket}
            onChange={
              handleSelectMarket as (value: string | number | Date) => void
            }
            options={MARKETS_OPTIONS}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextInputControlled
            size='small'
            label='Nome do parametro'
            value={parameterName}
            setValue={handleSetParameterName}
          />
        </Grid>
      </Grid>

      {/** Table here */}
      <Grid container>
        <Grid item xs={12}>
          <SalesDeductionsParamsTable
            companyCode={companyCode}
            market={selectedMarket as MarketEnum}
            name={parameterName}
          />
        </Grid>
      </Grid>
    </>
  );
}
