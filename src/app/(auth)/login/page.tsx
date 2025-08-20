"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/auth";
import { AxiosError } from "axios";
import { PageRoutes } from "@/utils/appRoutes";
import { InputPassword } from "./components/inputPassword";
import { PostLogin } from "@/services/webApi/auth-api";
import RamaxLogo from "@/assets/RAMAX-Group_Horizontal_Cor.png";
import Image from "next/image";
import { StorageKeysEnum } from "@/constants/app/storage";

export default function Login() {
  const router = useRouter();
  const { loadingLogin, loginUser, setLoadingLogin } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleEmail = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(e.target.value);
  };

  const doLogin = async () =>
    await loginUser({ data: { email, password }, setError, setErrorMessage });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "98vh",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "100%", sm: 500 },
          }}
        >
          <Image
            src={RamaxLogo}
            alt='logo'
            width={200}
            style={{ margin: "0 auto" }}
          />
          <Box>
            <Typography sx={{ fontSize: 40, fontWeight: 700 }}>
              Entrar
            </Typography>
            <Typography sx={{ fontSize: 16 }}>
              Bem vindo! Por favor insira suas credenciais para entrar no
              sistema.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <form onSubmit={doLogin}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginY: 3,
                  gap: 3,
                }}
              >
                <TextField
                  sx={{
                    border: "1px",
                    borderColor: "#323232",
                    placeHolderColor: "#fff",
                    borderRadius: 2,
                  }}
                  size='small'
                  error={error}
                  fullWidth
                  id={`email`}
                  label='E-mail *'
                  value={email}
                  onChange={(event) => {
                    handleEmail(event);
                  }}
                />
                <InputPassword
                  size='small'
                  error={error}
                  errorMessage={errorMessage}
                  password={password}
                  setPassword={setPassword}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginLeft: "-11px",
                }}
              >
                <Typography
                  sx={{
                    color: "#3E63DD",
                    cursor: "pointer",
                    "&:hover": {
                      opacity: 0.8,
                    },
                  }}
                  onClick={() => router.push(PageRoutes.forgotPassword())}
                >
                  Esqueceu sua senha?
                </Typography>
              </Box>

              <Button
                size='small'
                type='submit'
                variant='contained'
                disabled={loadingLogin}
                onClick={() => doLogin()}
                sx={{
                  marginTop: 2,
                  borderRadius: 2,
                }}
                fullWidth
              >
                {loadingLogin ? "Carregando..." : "Login"}
              </Button>
            </form>
          </Box>
        </Box>
      </Box>

      <Typography
        variant='h3'
        sx={{
          fontSize: "14px",
          position: "absolute",
          bottom: "20px",
          color: "#29323a",
        }}
      >
        {new Date().getFullYear()} © RAMAX - GROUP - APP
      </Typography>
    </>
  );
}
