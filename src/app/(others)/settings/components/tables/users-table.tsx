import { useGetUsers } from "@/services/react-query/queries/user";
import { useQueryStates, parseAsString, parseAsBoolean } from "nuqs";
import { LoaderIcon } from "../customized/loader-icon";
import { Alert, Box, Button } from "@mui/material";
import { cpfMask } from "@/utils/functions";
import PaginatedTable, {
  PaginatedTableColumn,
} from "@/components/Table/paginated-table";
import { User, UserRoleEnum } from "@/types/user";
import { EditIcon } from "lucide-react";
import { useAuthContext } from "@/contexts/auth";

export function UsersTable() {
  const [states, setStates] = useQueryStates({
    username: parseAsString.withDefault(""),
    newUserCompanyModalOpen: parseAsBoolean.withDefault(false),
    newUserWebpageModalOpen: parseAsBoolean.withDefault(false),
    editUserModalOpen: parseAsBoolean.withDefault(false),
    editUserId: parseAsString.withDefault(""),
  });
  const handleOpenEditModal = (userId: string) => {
    setStates({
      editUserId: userId,
      editUserModalOpen: true,
      newUserCompanyModalOpen: false,
      newUserWebpageModalOpen: false,
    });
  };

  const { user } = useAuthContext();
  const { data: users = [], isFetching: isFetchingUsers } = useGetUsers(
    states.username
  );

  const isUserAdmin = user.role === UserRoleEnum.Admin;
  const columns = getColumns({ handleOpenEditModal, isUserAdmin });
  const haveSomeData = users.length > 0;

  if (isFetchingUsers) {
    return (
      <Box
        sx={{
          display: "grid",
          height: "calc(100vh - 230px);",
          bgcolor: "background.paper",
          placeContent: "center",
        }}
      >
        <LoaderIcon />
      </Box>
    );
  }

  if (!haveSomeData) {
    return (
      <Box
        sx={{
          display: "grid",
          height: "550px",
          bgcolor: "background.paper",
          placeContent: "center",
        }}
      >
        <Alert severity='info'> Sem Dados</Alert>
      </Box>
    );
  }

  return (
    <PaginatedTable<User>
      rows={users}
      columns={columns}
      tableStyles={{
        height: "calc(100vh - 230px);",
      }}
    />
  );
}

const getColumns = ({
  handleOpenEditModal,
  isUserAdmin,
}: {
  handleOpenEditModal: (userId: string) => void;
  isUserAdmin: boolean;
}): PaginatedTableColumn<User>[] => [
  {
    headerKey: "name",
    headerName: "Nome",
    cellSx: { fontSize: "12px" },

    sx: { padding: 0.2 },
  },
  {
    headerKey: "email",
    headerName: "Email",

    cellSx: { fontSize: "12px" },
    sx: { padding: 0.2 },
  },
  {
    headerKey: "cpf",
    headerName: "CPF",

    cellSx: { fontSize: "12px" },
    sx: { padding: 0.2 },

    render: (value, row) => cpfMask(value as string),
  },
  {
    headerKey: "isActive",
    headerName: "Status",

    cellSx: { fontSize: "12px" },
    sx: { padding: 0.2 },

    render: (value, row) => (value ? "Ativo" : "Inativo"),
  },
  {
    headerKey: "role",
    headerName: "Departamento",

    cellSx: { fontSize: "12px" },
    sx: { padding: 0.2 },
  },
  {
    headerKey: "id",
    headerName: "Editar",
    align: "center",
    render: (value, row) => (
      <Button
        variant='text'
        disabled={!isUserAdmin}
        onClick={() => handleOpenEditModal(row.id)}
      >
        <EditIcon size={14} />
      </Button>
    ),
  },
];
