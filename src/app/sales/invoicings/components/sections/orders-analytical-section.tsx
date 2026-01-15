import { Grid, Typography } from "@mui/material";
import { parseAsArrayOf, parseAsBoolean, parseAsString } from "nuqs";
import { useQueryStates } from "nuqs";
import { OrdersTable } from "../tables/orders-table";
import {
  useGetAnalyticalOrders,
  useGetOrdersSituation,
} from "@/services/react-query/queries/sales";
import { getIso8601DateString } from "@/utils/date.utils";
import { TextInputControlled } from "@/components/Inputs/TextInput/controlled";
import { OrderLinesDetailsModal } from "../modals/order-line-details-modal";
import { FinpecModal } from "@/components/Modal/FinpecModal/FinpecModal";
import { MultipleSelectInputControlled } from "@/components/Inputs/Select/Multiple/controlled";
import { COLORS } from "@/constants/styles/colors";
import { OrdersTotals } from "../totals/orders-totals";

export function OrdersAnalyticalSection() {
  /**
   * Filtros situações, pedido id
   *
   * Tabela de pedidos
   *
   */

  const [globalStates] = useQueryStates({
    companyCodes: parseAsArrayOf(parseAsString, ",").withDefault([]),
    startDate: parseAsString.withDefault(getIso8601DateString(new Date())!),
    endDate: parseAsString.withDefault(getIso8601DateString(new Date())!),
  });
  const [sectionStates, setSectionStates] = useQueryStates({
    orderId: parseAsString.withDefault(""),
    situations: parseAsArrayOf(parseAsString, ",").withDefault([]),
    detailsOrderId: parseAsString.withDefault(""),
    orderLinesDetailsModalOpen: parseAsBoolean.withDefault(false),
  });

  const { data: orders, isFetching } = useGetAnalyticalOrders({
    companyCodes: globalStates.companyCodes.join(","),
    startDate: globalStates.startDate,
    endDate: globalStates.endDate,
    orderId: sectionStates.orderId,
    situations: sectionStates.situations.join(","),
  });

  const { data: ordersSituations } = useGetOrdersSituation();

  const handleOrderSituation = (value: string[]) => {
    setSectionStates({ situations: value });
  };

  const handleToogleSituations = () => {
    const situations = sectionStates.situations;
    if (!situations) return;

    const haveSomeSelectedProductLines = situations?.length > 0;
    if (haveSomeSelectedProductLines) {
      return setSectionStates({ situations: [] });
    }

    return setSectionStates({
      situations: ordersSituations?.map((i) => String(i.key)),
    });
  };

  return (
    <>
      <Grid container spacing={1} marginTop={0.1}>
        <Grid item xs={2}>
          <TextInputControlled
            label='N° Pedido'
            value={sectionStates.orderId}
            setValue={(value) => setSectionStates({ orderId: value })}
          />
        </Grid>
        <Grid item xs={2}>
          <MultipleSelectInputControlled
            label='Situação'
            size='small'
            value={sectionStates.situations}
            onChange={handleOrderSituation}
            options={
              ordersSituations?.map((item) => ({
                key: String(item.key),
                label: item.label,
              })) ?? []
            }
          />
          <Typography
            fontSize={"9px"}
            sx={{
              marginX: "auto",
              "&:hover": {
                color: COLORS.TEXTO,
                cursor: "pointer",
              },
            }}
            onClick={handleToogleSituations}
          >
            Selecionar/Deselecionar tudo
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1} marginTop={0.1}>
        <Grid item xs={12}>
          <OrdersTotals data={orders?.totals} />
        </Grid>
        <Grid item xs={12}>
          <OrdersTable isFetching={isFetching} data={orders?.data} />
        </Grid>
      </Grid>

      <FinpecModal
        title={`Detalhes - Pedido`}
        open={sectionStates.orderLinesDetailsModalOpen}
        onClose={() =>
          setSectionStates({
            orderLinesDetailsModalOpen: false,
            detailsOrderId: "",
          })
        }
      >
        <OrderLinesDetailsModal
          orderId={sectionStates.detailsOrderId}
          onClose={() =>
            setSectionStates({
              orderLinesDetailsModalOpen: false,
              detailsOrderId: "",
            })
          }
        />
      </FinpecModal>
    </>
  );
}
