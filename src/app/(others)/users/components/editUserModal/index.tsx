/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  TextField,
  Typography,
  List,
} from "@mui/material";
import InputMask from "react-input-mask";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { UpdateUser } from "@/services/webApi/user-api";
import { ControlledSelect } from "@/components/Inputs/Select/Customized";
import { queryKeys } from "@/services/react-query/query-keys";
import { User, UserCompanies } from "@/types/user";
import { userRoles } from "@/contexts/auth";
import { FaLandmark, FaPhone, FaPlusCircle } from "react-icons/fa";
import { ListItemCustom } from "@/components/ListItemCustom";
import { IoTrashOutline } from "react-icons/io5";
import { useRemoveUserAppWebpage } from "@/services/react-query/mutations/user";
import {
  useGetUser,
  useGetUserDepartmentsFilters,
} from "@/services/react-query/queries/user";
import { RiPagesLine } from "react-icons/ri";
import { useRemoveUserCompany } from "@/services/react-query/mutations/user-company";

type Props = {
  onClose: () => void;
  userId?: string;
  currentUserRole: string;
  setAddUserCompanyModalOpen: () => void;
  setAddUserWebpageModalOpen: () => void;
};

const EditUserModal = ({
  userId,
  currentUserRole,
  onClose,
  setAddUserCompanyModalOpen,
  setAddUserWebpageModalOpen,
}: Props) => {
  const queryClient = useQueryClient();

  const [load, setLoad] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // states de componentes
  const { data: departments } = useGetUserDepartmentsFilters();

  const { mutateAsync: removeUserCompany, isPending: isRemovingUserCompany } =
    useRemoveUserCompany();
  const {
    mutateAsync: removeUserAppWebpage,
    isPending: isRemovingUserAppWebpage,
  } = useRemoveUserAppWebpage();

  const { data: userData } = useGetUser(userId);

  // states de inputs
  const [roleSelected, setRoleSelected] = useState<string>("");
  const [isActiveSelected, setIsActiveSelected] = useState<string>("ativo");

  const haveSomeCompanies = userData && userData?.userCompanies.length > 0;
  const haveSomeWebpages = userData && userData?.userWebpages.length > 0;

  useEffect(() => {
    if (userData) {
      setRoleSelected(userData.role);
      setIsActiveSelected(userData.isActive ? "ativo" : "inativo");
    }
  }, [userData]);

  const handleSubmit = async () => {
    if (currentUserRole !== "admin") {
      setErrorMessage(
        "Apenas administradores podem editar a função do usuário"
      );
      return;
    }

    try {
      setLoad(true);

      await UpdateUser(userData!.id, {
        role: roleSelected,
        isActive: isActiveSelected === "ativo",
      });

      setError(false);

      queryClient.invalidateQueries({ queryKey: [queryKeys.USERS.FIND_ALL] });
      onClose();
    } catch (error) {
      setError(true);
      if (error instanceof AxiosError) {
        setErrorMessage(error.response?.data.message);
      } else {
        setErrorMessage("Ocorreu um erro ao tentar atualizar o usuário");
      }
    } finally {
      setLoad(false);
    }
  };

  const roleHandler = (value: string) => {
    setRoleSelected(value);
  };
  const isActiveHandler = (value: string) => {
    setIsActiveSelected(value);
  };

  return (
    <Box>
      <Box
        sx={{
          borderRadius: "8px 8px 0 0",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant='h6' component='h2'>
          Editar Função do Usuário
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: "16px",
          marginBottom: "16px",
          maxHeight: "80%",
          height: "90%",
          backgroundColor: "#fff",
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl fullWidth>
            <TextField
              id={`name`}
              label='Nome'
              size='small'
              value={userData?.name || ""}
              disabled
            />
          </FormControl>

          <FormControl fullWidth>
            <InputMask
              mask={"999.999.999-99"}
              value={userData?.cpf || ""}
              disabled
            >
              <TextField id={`CPF`} label='CPF' size='small' />
            </InputMask>
          </FormControl>
        </Box>

        <FormControl fullWidth>
          <TextField
            id={`email`}
            label='E-mail'
            size='small'
            value={userData?.email || ""}
            disabled
          />
        </FormControl>

        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl fullWidth>
            <ControlledSelect
              id='role-select'
              name='role-select'
              value={roleSelected}
              label='Função'
              onChange={roleHandler}
              size='small'
              options={departments}
            />
          </FormControl>
        </Box>

        {error && (
          <Typography variant='h6' color='red' component='h2'>
            {errorMessage}
          </Typography>
        )}
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl fullWidth>
            <TextField
              id={`isActive`}
              label='Status do usuário'
              size='small'
              value={userData?.isActive ? "Ativo" : "Inativo"}
              disabled
            />
          </FormControl>
          <FormControl fullWidth>
            <ControlledSelect
              id='isActive-select'
              name='isActive-select'
              value={isActiveSelected}
              label='Desativar/Ativar Usuário'
              size='small'
              onChange={isActiveHandler}
              options={[
                { label: "Ativo", value: "ativo", key: "ativo" },
                { label: "Inativo", value: "inativo", key: "inativo" },
              ]}
            />
          </FormControl>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant='subtitle1'>Empresas vinculadas</Typography>

                <IconButton
                  edge='end'
                  aria-label='plus'
                  style={{ marginLeft: "4px", marginTop: "-2px" }}
                  onClick={() => setAddUserCompanyModalOpen()}
                >
                  <FaPlusCircle />
                </IconButton>
              </Box>
              {!haveSomeCompanies && (
                <Typography variant='body1'>
                  Sem Empresas Cadastradas
                </Typography>
              )}
              <List dense={true}>
                {userData?.userCompanies?.map((item, index) => (
                  <ListItemCustom
                    key={item.id}
                    action={
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          edge='end'
                          aria-label='delete'
                          disabled={isRemovingUserCompany}
                          onClick={async () =>
                            await removeUserCompany({ id: item.id, userId })
                          }
                        >
                          <IoTrashOutline
                            className={"icon-style"}
                            style={{
                              color: "red",
                              opacity: isRemovingUserCompany ? "0.1" : "1",
                            }}
                          />
                        </IconButton>
                      </Box>
                    }
                    title={`Empresa - ${item.companyCode}`}
                    content={""}
                    icon={<FaLandmark />}
                  />
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant='subtitle1'>Paginas Liberadas</Typography>

                <IconButton
                  edge='end'
                  aria-label='plus'
                  style={{ marginLeft: "4px", marginTop: "-2px" }}
                  onClick={setAddUserWebpageModalOpen}
                >
                  <FaPlusCircle />
                </IconButton>
              </Box>
              {!haveSomeWebpages && (
                <Typography variant='body1'>Nenhuma pagina</Typography>
              )}
              <List dense={true}>
                {userData?.userWebpages?.map((item, index) => (
                  <ListItemCustom
                    key={item.id}
                    action={
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          edge='end'
                          aria-label='delete'
                          disabled={isRemovingUserAppWebpage}
                          onClick={async () =>
                            await removeUserAppWebpage({ id: item.id, userId })
                          }
                        >
                          <IoTrashOutline
                            className={"icon-style"}
                            style={{
                              color: "red",
                              opacity: isRemovingUserAppWebpage ? "0.1" : "1",
                            }}
                          />
                        </IconButton>
                      </Box>
                    }
                    title={`Página - ${item.page.name}`}
                    content={item.page.page}
                    icon={<RiPagesLine />}
                  />
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
          padding: 2,
          borderRadius: "0 0 8px 8px",
          backgroundColor: "#fff",
        }}
      >
        <Button
          disabled={load}
          variant='contained'
          color={"success"}
          onClick={handleSubmit}
        >
          {load ? <CircularProgress color='success' size={24} /> : "Salvar"}
        </Button>
        <Button variant='outlined' color='warning' onClick={onClose}>
          <Typography>Fechar</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default EditUserModal;
