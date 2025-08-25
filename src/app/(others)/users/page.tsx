"use client";
import React, { useState } from "react";
import { Box, Button, FormControl, Skeleton, Typography } from "@mui/material";
import { PageContainer } from "@/components/PageContainer";
import NewUserModal from "./components/newUserModal";
import EditUserModal from "./components/editUserModal";
import { useAuthContext } from "@/contexts/auth";
import EditIcon from "@mui/icons-material/Edit";
import { FinpecModal } from "@/components/Modal/FinpecModal/FinpecModal";
import { useGetUsers } from "@/services/react-query/queries/user";
import { User, UserRoleEnum } from "@/types/user";
import { CustomizedTable } from "@/components/Table/normal-table/body";
import { PageContainerHeader } from "@/components/PageContainer/header";
import { AddUserCompanyModal } from "./components/add-user-company-modal";
import { AddUserWebpageModal } from "./components/add-user-webpage-modal";
import { TextInputControlled } from "@/components/Inputs/TextInput/controlled";
import { parseAsString, useQueryState } from "nuqs";
import PaginatedTable from "@/components/Table/paginated-table";
import { cpfMask } from "@/utils/functions";

export default function UserList() {
  const [openModalNew, setOpenModalNew] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [addUserCompanyModalOpen, setAddUserCompanyModalOpen] = useState(false);
  const [addUserAppWebpageModalOpen, setAddUserAppWebpageModalOpen] =
    useState(false);

  const [userIdToEdit, setUserIdToEdit] = useState<string | null>(null);
  const [userNameInput, setUserNameInput] = useQueryState(
    "username",
    parseAsString.withDefault("")
  );
  const { user } = useAuthContext();

  const {
    data: users,
    isLoading: isLoadingUsers,
    status: usersQueryStatus,
  } = useGetUsers(userNameInput);
  const isUserAdmin = user.role === UserRoleEnum.Admin;

  const handleUserNameInput = (value: string | null) => setUserNameInput(value);
  const handleOpenEditModal = (row: User) => {
    setUserIdToEdit(row.id);
    setOpenEditModal(true);
  };

  const handleOpenAddUserCompanyModal = () => {
    // setUserIdToEdit(row)
    setOpenEditModal(false);
    setAddUserCompanyModalOpen(true);
  };

  const handleOpenAddUserWebpageModal = () => {
    // setUserIdToEdit(row)
    setOpenEditModal(false);
    setAddUserAppWebpageModalOpen(true);
  };

  const handleCloseAddUserCompanyModal = () => {
    // setUserIdToEdit(row)
    setAddUserCompanyModalOpen(false);
    setOpenEditModal(true);
  };

  const handleCloseAddUserWebpageModal = () => {
    // setUserIdToEdit(row)
    setAddUserAppWebpageModalOpen(false);
    setOpenEditModal(true);
  };

  const TableComponent = () => {
    if (isLoadingUsers) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            alignItems: "center",
            justifyContent: "center",
            margin: 3,
            gap: 3,
          }}
        >
          {[...Array(9)].map((_, index) => (
            <Skeleton
              key={index}
              variant='rectangular'
              width={"100%"}
              height={60}
            />
          ))}
        </Box>
      );
    }

    if (usersQueryStatus === "error") {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            alignItems: "center",
            justifyContent: "center",
            margin: 3,
            gap: 3,
          }}
        >
          <Typography variant='h1' sx={{ fontSize: "24px", color: "red" }}>
            Ocorreu um erro ao buscar os dados
          </Typography>
        </Box>
      );
    }

    return (
      <Box>
        {users && users.length > 0 ? (
          <PaginatedTable
            rows={users}
            columns={[
              {
                headerKey: "name",
                headerName: "Nome",
                cellSx: { fontSize: "12px" },
                sx: { padding: 1 },
              },
              {
                headerKey: "email",
                headerName: "Email",

                cellSx: { fontSize: "12px" },
              },
              {
                headerKey: "cpf",
                headerName: "CPF",

                cellSx: { fontSize: "12px" },
                render: (value, row) => cpfMask(value as string),
              },
              {
                headerKey: "isActive",
                headerName: "Status",

                cellSx: { fontSize: "12px" },
                render: (value, row) => (value ? "Ativo" : "Inativo"),
              },
              {
                headerKey: "role",
                headerName: "Departamento",

                cellSx: { fontSize: "12px" },
              },
              {
                headerKey: "id",
                headerName: "Editar",
                align: "center",
                render: (value, row) => (
                  <Button
                    variant='contained'
                    disabled={!isUserAdmin}
                    color='error'
                    sx={{
                      backgroundColor: "white",
                      color: "#3E63DD",
                      "&:hover": { color: "orangered", background: "white" },
                    }}
                    onClick={() => handleOpenEditModal(row)}
                  >
                    <EditIcon />
                  </Button>
                ),
              },
            ]}
            tableStyles={{
              height: "calc(100vh - 150px);",
            }}
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              margin: 3,
            }}
          >
            <Typography
              variant='h6'
              sx={{ fontWeight: 700, fontSize: "18px", paddingBottom: 2 }}
            >
              Não foram encontrados itens
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <>
      <PageContainer>
        <PageContainerHeader title='Usuários'>
          <Button
            variant='contained'
            size='small'
            color='success'
            onClick={() => setOpenModalNew(true)}
          >
            Novo
          </Button>
        </PageContainerHeader>
        <Box sx={{ marginTop: 2 }}>
          <FormControl fullWidth>
            <TextInputControlled
              id='username'
              label='Usuario'
              type='text'
              value={userNameInput}
              setValue={handleUserNameInput}
              autoComplete='new-field'
            />
          </FormControl>
        </Box>
        <Box sx={{ marginTop: 1 }}>
          <TableComponent />
        </Box>
      </PageContainer>

      <FinpecModal open={openModalNew} onClose={() => setOpenModalNew(false)}>
        <NewUserModal onClose={() => setOpenModalNew(false)} />
      </FinpecModal>

      {userIdToEdit && users && (
        <>
          <FinpecModal
            open={addUserAppWebpageModalOpen}
            onClose={handleCloseAddUserWebpageModal}
          >
            <AddUserWebpageModal
              userId={userIdToEdit}
              onClose={handleCloseAddUserWebpageModal}
            />
          </FinpecModal>
          <FinpecModal
            open={addUserCompanyModalOpen}
            onClose={handleCloseAddUserCompanyModal}
          >
            <AddUserCompanyModal
              userId={userIdToEdit}
              onClose={handleCloseAddUserCompanyModal}
            />
          </FinpecModal>

          <FinpecModal
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
          >
            <EditUserModal
              userId={userIdToEdit}
              onClose={() => setOpenEditModal(false)}
              currentUserRole={user.role}
              setAddUserCompanyModalOpen={handleOpenAddUserCompanyModal}
              setAddUserWebpageModalOpen={handleOpenAddUserWebpageModal}
            />
          </FinpecModal>
        </>
      )}
    </>
  );
}
