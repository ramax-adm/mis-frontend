import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import CustomTable, {
  CustomTableColumn,
} from "@/components/Table/custom-table";
import {
  useGetAcceptedIntranetDocumentsData,
  useGetIntranetDocumentVersions,
} from "@/services/react-query/queries/intranet";
import {
  IntranetDocumentCategoryEnum,
  IntranetDocumentTypeEnum,
  IntranetDocumentVersion,
  UserIntranetDocumentAcceptance,
} from "@/types/intranet";
import { Alert, Box, CircularProgress, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SquareArrowOutUpRight } from "lucide-react";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { LoaderIcon } from "../customized/loader-icon";
import { getDocumentType } from "../../utils/get-document-type";
import { formatSeconds, getDatetime } from "@/utils/date.utils";

export function IntranetPendingAcceptanceDocumentsTable() {
  return (
    <Box
      sx={{
        display: "grid",
        height: "250px",
        backgroundColor: "rgba(62, 99, 221, 0.1)",

        placeContent: "center",
      }}
    >
      <Typography fontWeight={700}>EM DESENVOLVIMENTO</Typography>
    </Box>
  );
}
