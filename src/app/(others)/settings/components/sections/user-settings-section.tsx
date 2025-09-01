import {
  PopoverTrigger,
  PopoverContent,
  PopoverTypography,
  PopoverRoot,
} from "@/components/Button/PopoverButton";
import { useGetUsers } from "@/services/react-query/queries/user";
import { Typography, Button, Grid, Box, FormControl } from "@mui/material";
import { Plus } from "lucide-react";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { LoaderIcon } from "../customized/loader-icon";
import { TextInputControlled } from "@/components/Inputs/TextInput/controlled";
import { FinpecModal } from "@/components/Modal/FinpecModal/FinpecModal";
import { AddUserWebpageModal } from "@/app/(others)/settings/components/modals/user-add-user-webpage-modal";
import { AddUserCompanyModal } from "@/app/(others)/settings/components/modals/user-add-user-company-modal";
import { useAuthContext } from "@/contexts/auth";
import EditUserModal from "@/app/(others)/settings/components/modals/user-edit-user-modal";
import { UsersTable } from "../tables/users-table";
import NewUserModal from "../modals/user-new-user-modal";

export function UserSettingsSection() {
  const { user } = useAuthContext();
  const [sectionStates, setSectionStates] = useQueryStates({
    username: parseAsString.withDefault(""),
    newUserModalOpen: parseAsBoolean.withDefault(false),
    newUserCompanyModalOpen: parseAsBoolean.withDefault(false),
    newUserWebpageModalOpen: parseAsBoolean.withDefault(false),
    editUserModalOpen: parseAsBoolean.withDefault(false),
    editUserId: parseAsString.withDefault(""),
  });

  const handleUserNameInput = (value: string | null) =>
    setSectionStates({ username: value });

  const handleOpenNewUserModal = () =>
    setSectionStates({ newUserModalOpen: true });
  const handleCloseNewUserModal = () =>
    setSectionStates({ newUserModalOpen: false });
  const handleOpenCloseModal = () => {
    setSectionStates({
      editUserId: "",
      editUserModalOpen: false,
      newUserCompanyModalOpen: false,
      newUserWebpageModalOpen: false,
    });
  };

  const handleOpenAddUserCompanyModal = () => {
    setSectionStates({
      editUserModalOpen: false,
      newUserCompanyModalOpen: true,
    });
  };

  const handleOpenAddUserWebpageModal = () => {
    setSectionStates({
      editUserModalOpen: false,
      newUserWebpageModalOpen: true,
    });
  };

  const handleCloseAddUserCompanyModal = () => {
    setSectionStates({
      newUserCompanyModalOpen: false,
      editUserModalOpen: true,
    });
  };

  const handleCloseAddUserWebpageModal = () => {
    setSectionStates({
      newUserWebpageModalOpen: false,
      editUserModalOpen: true,
    });
  };

  return (
    <>
      <Grid container marginTop={1}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant='h6'>Cadastros - Usuários</Typography>
          <Box sx={{ display: "inline-flex", gap: 1 }}>
            <PopoverRoot>
              <PopoverTrigger startIcon={<Plus size={15} />}>
                Novo registro
              </PopoverTrigger>
              <PopoverContent>
                <PopoverTypography onClick={handleOpenNewUserModal}>
                  Adicionar usuário
                </PopoverTypography>
              </PopoverContent>
            </PopoverRoot>
          </Box>
        </Grid>
      </Grid>
      <Grid container marginTop={0.5}>
        <Grid item xs={12}>
          <Typography fontSize={"12px"} fontWeight={600}>
            Buscar p/ usuario
          </Typography>
          <FormControl fullWidth>
            <TextInputControlled
              id='username'
              label='Usuario'
              type='text'
              value={sectionStates.username}
              setValue={handleUserNameInput}
              autoComplete='new-field'
            />
          </FormControl>
        </Grid>
      </Grid>

      <Grid container marginTop={0.5}>
        <Grid item xs={12}>
          <UsersTable />
        </Grid>
      </Grid>

      <FinpecModal
        open={sectionStates.newUserModalOpen}
        onClose={handleCloseNewUserModal}
      >
        <NewUserModal onClose={handleCloseNewUserModal} />
      </FinpecModal>
      <FinpecModal
        open={sectionStates.newUserWebpageModalOpen}
        onClose={handleCloseAddUserWebpageModal}
      >
        <AddUserWebpageModal
          userId={sectionStates.editUserId}
          onClose={handleCloseAddUserWebpageModal}
        />
      </FinpecModal>
      <FinpecModal
        open={sectionStates.newUserCompanyModalOpen}
        onClose={handleCloseAddUserCompanyModal}
      >
        <AddUserCompanyModal
          userId={sectionStates.editUserId}
          onClose={handleCloseAddUserCompanyModal}
        />
      </FinpecModal>

      <FinpecModal
        open={sectionStates.editUserModalOpen}
        onClose={handleOpenCloseModal}
      >
        <EditUserModal
          userId={sectionStates.editUserId}
          onClose={handleOpenCloseModal}
          currentUserRole={user.role}
          setAddUserCompanyModalOpen={handleOpenAddUserCompanyModal}
          setAddUserWebpageModalOpen={handleOpenAddUserWebpageModal}
        />
      </FinpecModal>
    </>
  );
}
