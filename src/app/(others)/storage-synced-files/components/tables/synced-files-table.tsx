import { LoadingOverlay } from "@/components/Loading/loadingSpinner";
import { Column, CustomizedTable } from "@/components/Table/normal-table/body";
import { useDownloadSyncedFile } from "@/services/react-query/mutations/utils";
import { useGetSyncedFiles } from "@/services/react-query/queries/utils";
import { GetSyncedFilesResponse } from "@/types/api/utils";
import { Alert, Button, Grid, Typography } from "@mui/material";
import { IoMdDownload } from "react-icons/io";

interface SyncedFilesTableProps {
  dateSelected: Date | null;
  entitySelected: string | null;
}
export function SyncedFilesTable({
  dateSelected,
  entitySelected,
}: SyncedFilesTableProps) {
  const { data: syncedFiles = [], isFetching } = useGetSyncedFiles({
    date: dateSelected,
    entity: entitySelected,
  });
  const {
    mutateAsync: downloadSyncedFile,
    isPending: isDownloadingSyncedFile,
  } = useDownloadSyncedFile();

  const handleDownloadSyncedFile = async (id: string) =>
    await downloadSyncedFile({ id });

  const columns = getColumns({
    handleDownloadSyncedFile,
    isDownloadingSyncedFile,
  });
  const haveSomeData = syncedFiles.length > 0;

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <Grid container marginTop={4}>
      <Grid item xs={12}>
        <Typography fontSize={"12px"} fontWeight={700}>
          Snapshots anteriores
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {haveSomeData && (
          <CustomizedTable<any>
            columns={columns}
            data={syncedFiles}
            cellStyles={{ fontSize: "12px" }}
          />
        )}
        {!haveSomeData && (
          <Alert severity='info' sx={{ marginY: 2, marginX: "auto" }}>
            Sem Dados
          </Alert>
        )}
      </Grid>
    </Grid>
  );
}

const getColumns = ({
  handleDownloadSyncedFile,
  isDownloadingSyncedFile,
}: {
  handleDownloadSyncedFile: (id: string) => Promise<any>;
  isDownloadingSyncedFile: boolean;
}): Column<GetSyncedFilesResponse>[] => {
  return [
    {
      headerName: "Data de criação",
      type: "string",
      value: {
        first: {
          value: "date",
        },
      },
    },
    {
      headerName: "Entidade",
      type: "string",
      value: {
        first: {
          value: "entity",
        },
      },
    },
    {
      headerName: "Storage",
      type: "string",
      value: {
        first: {
          value: "storageType",
        },
      },
    },
    {
      headerName: "Bucket",
      type: "string",
      value: {
        first: {
          value: "bucket",
        },
      },
    },
    {
      headerName: "Url Arquivo",
      type: "string",
      value: {
        first: {
          value: "fileUrl",
        },
      },
    },
    {
      headerName: "Download",
      type: "action",
      value: {
        first: {
          value: (row: GetSyncedFilesResponse) => (
            <Button
              variant='contained'
              disabled={isDownloadingSyncedFile}
              sx={{
                backgroundColor: "white",
                color: "#3E63DD",
                "&:hover": { opacity: 0.95, color: "white" },
              }}
              onClick={() => handleDownloadSyncedFile(row.id)}
            >
              <IoMdDownload />
            </Button>
          ),
        },
      },
    },
  ];
};
