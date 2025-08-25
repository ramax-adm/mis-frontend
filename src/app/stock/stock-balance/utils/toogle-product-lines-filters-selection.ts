import { ProductLine } from "@/types/api/sensatta";
import { SetValues, ParserBuilder } from "nuqs";

export const toogleProductLinesFiltersSelection = ({
  selectedProductLines,
  productLines,
  setQueryStates,
  setTableStates,
}: {
  selectedProductLines: string[];
  productLines?: ProductLine[];
  setTableStates: SetValues<{
    page: ParserBuilder<number>;
  }>;
  setQueryStates: (
    data: Partial<{
      selectedCompany: string;
      selectedMarket: string;
      selectedDataVisualization: "analytical" | "aggregated-analytical";
      selectedProductLines: string[];
    }>
  ) => {};
}) => {
  if (!productLines) return;

  setTableStates({ page: 0 });
  const haveSomeSelectedProductLines = selectedProductLines.length > 0;
  if (haveSomeSelectedProductLines) {
    return setQueryStates({ selectedProductLines: [] });
  }

  return setQueryStates({
    selectedProductLines: productLines.map(
      (i) => `${i.sensattaCode}-${i.acronym}`
    ),
  });
};
