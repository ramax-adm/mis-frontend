import { RadioInputControlled } from "@/components/Inputs/RadioInput/controlled";
import { MultipleSelectInputControlled } from "@/components/Inputs/Select/Multiple/controlled";
import { StorageKeysEnum } from "@/constants/app/storage";
import { COLORS } from "@/constants/styles/colors";
import { useFilter } from "@/contexts/persisted-filters";
import { useGetUserCompanies } from "@/services/react-query/queries/user-company";
import { OrderPriceConsiderationEnum } from "@/types/business-audit";
import { MarketEnum } from "@/types/sensatta";
import { Grid, Typography } from "@mui/material";

const MARKET_OPTIONS = [
  // {
  //   label: "Todos",
  //   key: "",
  //   value: "",
  // },
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
const PRICE_CONSIDERATION_OPTIONS = [
  { label: "Todos", value: OrderPriceConsiderationEnum.NONE },
  {
    label: "Acima da tabela",
    value: OrderPriceConsiderationEnum.OVER_TABLE_PRICE,
  },
  {
    label: "Abaixo da tabela",
    value: OrderPriceConsiderationEnum.UNDER_TABLE_PRICE,
  },
];

export function SalesSectionFilters() {
  const { data: companies = [] } = useGetUserCompanies({});

  const { filters: companyCodes, setFilters: setCompanyCodes } = useFilter<
    string[]
  >(StorageKeysEnum.MONITORING_SALES_COMPANIES_FILTER);

  const { filters: market, setFilters: setMarket } = useFilter<string>(
    StorageKeysEnum.MONITORING_SALES_MARKET_FILTER,
  );

  const { filters: priceConsideration, setFilters: setPriceConsideration } =
    useFilter<string>(
      StorageKeysEnum.MONITORING_SALES_PRICE_CONSIDERATION_FILTER,
    );

  const handleToogleCompanyCodes = () => {
    if (!companyCodes) return;

    const haveSomeSelectedCompanyCodes = companyCodes?.length > 0;
    if (haveSomeSelectedCompanyCodes) {
      return setCompanyCodes([]);
    }

    return setCompanyCodes(companies?.map((i) => i.sensattaCode));
  };
  const handleSelectMarket = (value: string) => setMarket(value);
  const handleSelectPriceConsideration = (value: string) =>
    setPriceConsideration(value as string);
  const handleSelectCompanyCode = (value: string[]) => setCompanyCodes(value);

  return (
    <>
      <Grid
        item
        marginTop={{
          xs: 0,
          sm: 0,
        }}
        xs={12}
        sm={2}
      >
        <MultipleSelectInputControlled
          label='Empresas'
          size='small'
          value={companyCodes}
          onChange={handleSelectCompanyCode}
          options={companies.map((i) => ({
            label: `${i.sensattaCode} - ${i.name}`,
            value: i.sensattaCode,
            key: i.sensattaCode,
          }))}
        />{" "}
        <Typography
          fontSize={"9px"}
          sx={{
            marginX: "auto",
            "&:hover": {
              color: COLORS.TEXTO,
              cursor: "pointer",
            },
          }}
          onClick={handleToogleCompanyCodes}
        >
          Selecionar/Deselecionar tudo
        </Typography>
      </Grid>
      <Grid
        item
        marginTop={{
          xs: 0,
          sm: -2.5,
        }}
        xs={12}
        sm={"auto"}
      >
        <RadioInputControlled
          row
          name='market'
          label='Mercado'
          emptyMessage='Sem Opções'
          value={market}
          onChange={
            handleSelectMarket as (value: string | number | Date) => void
          }
          options={MARKET_OPTIONS}
        />
      </Grid>
      <Grid
        item
        marginTop={{
          xs: 0,
          sm: -2.5,
        }}
        xs={12}
        sm={"auto"}
      >
        <RadioInputControlled
          label='Tipo consideração preço'
          emptyMessage='Sem opções'
          name='priceConsideration'
          value={priceConsideration}
          onChange={
            handleSelectPriceConsideration as (
              value: string | number | Date,
            ) => void
          }
          options={PRICE_CONSIDERATION_OPTIONS}
        />
      </Grid>
    </>
  );
}
