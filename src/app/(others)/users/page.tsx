"use client";
import React, { useState } from "react";
import { Box, Button, Skeleton, Typography } from "@mui/material";
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

export default function UserList() {
  const [openModalNew, setOpenModalNew] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [addUserCompanyModalOpen, setAddUserCompanyModalOpen] = useState(false);
  const [addUserAppWebpageModalOpen, setAddUserAppWebpageModalOpen] =
    useState(false);

  const [userIdToEdit, setUserIdToEdit] = useState<string | null>(null);
  const { user } = useAuthContext();

  const {
    data: users,
    isLoading: isLoadingUsers,
    status: usersQueryStatus,
  } = useGetUsers("");
  const isUserAdmin = user.role === UserRoleEnum.Admin;

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

  const COLUMNSTABLE = [
    {
      headerName: "Nome",
      type: "string",
      value: { first: { value: "name" } },
    },
    {
      headerName: "Email",
      type: "string",
      value: { first: { value: "email" } },
    },
    {
      headerName: "CPF",
      type: "CPF",
      value: { first: { value: "cpf" } },
    },
    {
      headerName: "Função",
      type: "string",
      value: { first: { value: "role" } },
    },
    {
      headerName: "Status",
      type: "boolean",
      value: {
        first: {
          value: (row: User) => (row.isActive ? "Ativo" : "Inativo"),
        },
      },
    },
    {
      headerName: "Editar",
      type: "action",
      value: {
        first: {
          value: (row: User) => (
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
      },
    },
  ];

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
          <CustomizedTable
            data={users}
            columns={COLUMNSTABLE}
            cellStyles={{ fontSize: "12px" }}
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
          {user.role === "admin" && (
            <Button
              variant='contained'
              size='small'
              color='success'
              onClick={() => setOpenModalNew(true)}
            >
              Novo
            </Button>
          )}
        </PageContainerHeader>

        <Box sx={{ marginTop: 2 }}>
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
