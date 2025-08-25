/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import InputMask from "react-input-mask";
import { removeCpfMask } from "@/utils/functions";
import { AxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { PostCreateUser } from "@/services/webApi/user-api";
import { ControlledSelect } from "@/components/Inputs/Select/Customized";
import { queryKeys } from "@/services/react-query/query-keys";
import { userRoles } from "@/contexts/auth";
import { useGetUserDepartmentsFilters } from "@/services/react-query/queries/user";
import { TextInputControlled } from "@/components/Inputs/TextInput/controlled";

type Props = { onClose: () => void };
const NewUserModal = (props: Props) => {
  const [load, setLoad] = useState(false);
  const [newCad, setNewCad] = useState({
    name: "",
    email: "",
    cpf: "",
    password: "",
    role: "",
  });

  const { data: departments } = useGetUserDepartmentsFilters();

  const [validation, setValidation] = useState<boolean>(true);
  const [roleSelected, setRoleSelected] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [cpf, setCpf] = useState("");

  const handleCpf = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCpf(e.target.value);
  };

  const handleOnChange = (value: any, key: keyof typeof newCad) => {
    setNewCad({ ...newCad, [key]: value });
  };

  const queryClient = useQueryClient();
  const handleSubmit = async () => {
    try {
      setLoad(true);
      newCad.cpf = removeCpfMask(cpf);
      newCad.role = roleSelected;

      const payload = {
        name: newCad.name,
        email: newCad.email,
        cpf: newCad.cpf,
        password: newCad.password,
        role: newCad.role,
      };

      await PostCreateUser(payload);
      setError(false);

      queryClient.invalidateQueries({
        queryKey: [queryKeys.USERS.FIND_ALL],
        exact: false,
        refetchType: "all",
      });
      props.onClose();
    } catch (error) {
      setError(true);
      console.log({ error });

      if (error instanceof AxiosError) {
        setErrorMessage(error?.response?.data.message);
      } else {
        setErrorMessage("Ocorreu um erro ao cadastrar um novo usuario");
      }
    } finally {
      setLoad(false);
    }
  };

  const roleHandler = (value: string) => {
    setRoleSelected(value);
  };

  useEffect(() => {
    function validateForm() {
      if (
        newCad?.name.length <= 0 ||
        newCad?.email.length <= 0 ||
        cpf.length <= 0 ||
        newCad?.password.length <= 0 ||
        roleSelected === null
      ) {
        return true;
      }

      return false;
    }
    setValidation(validateForm());
  }, [newCad, cpf, roleSelected]);

  return (
    <Box>
      <Box
        sx={{
          borderRadius: "8px 8px 0 0",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant='h6' component='h2'>
          Cadastrar novo Usuario
        </Typography>
      </Box>
      <Box
        sx={{
          maxHeight: "80%",
          backgroundColor: "#fff",
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          paddingY: 1,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl fullWidth>
            <TextInputControlled
              id={`name`}
              label='Nome'
              size='small'
              value={newCad.name}
              setValue={(value) => {
                handleOnChange(value, "name");
              }}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputMask
              mask={"999.999.999-99"}
              value={cpf}
              onChange={(event) => handleCpf(event)}
            >
              <TextField id={`CPF`} label='CPF' size='small' />
            </InputMask>
          </FormControl>
        </Box>

        <ControlledSelect
          disablePortal={false}
          id='role-select'
          name='role-select'
          value={roleSelected}
          label='Departamento'
          onChange={roleHandler}
          size='small'
          options={departments}
        />

        <TextInputControlled
          id={`email`}
          label='E-mail'
          size='small'
          value={newCad.email}
          setValue={(value) => {
            handleOnChange(value, "email");
          }}
        />
        <FormControl fullWidth>
          <TextInputControlled
            id={`password`}
            label='Senha'
            size='small'
            value={newCad.password}
            setValue={(value) => {
              handleOnChange(value, "password");
            }}
          />
        </FormControl>
        {error && (
          <Typography variant='h6' color='red' component='h2'>
            {errorMessage}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
          borderRadius: "0 0 8px 8px",
          backgroundColor: "#fff",
        }}
      >
        <Button
          disabled={validation || load}
          variant='contained'
          color={"success"}
        >
          <Typography color={"#fff"} onClick={() => handleSubmit()}>
            {load ? <CircularProgress color='success' /> : "Cadastrar"}
          </Typography>
        </Button>
        <Button
          variant='outlined'
          color='warning'
          onClick={() => props.onClose()}
        >
          <Typography>Fechar</Typography>
        </Button>
      </Box>
    </Box>
  );
};
export default NewUserModal;
