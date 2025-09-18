"use client";
import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { HiCheckCircle } from "react-icons/hi";
import { green } from "@mui/material/colors";
import { PostCheckToken } from "@/services/webApi/auth-api";

const checkTokenSchema = z.object({
  token: z
    .string()
    .min(1, { message: "O token deve conter 6 digitos" })
    .max(6, { message: "O token deve conter 6 digitos" }),
});
type CheckTokendSchema = z.infer<typeof checkTokenSchema>;

export type CheckTokendPayload = {
  email: string;
  token: string;
};

interface resetPasswordProps {
  email: string;
  setToken: (token: string) => void;
  setCheckToken: (token: boolean) => void;
}

export default function CheckToken(props: resetPasswordProps) {
  const [confirmComponent, setConfirmComponent] = useState<boolean>(false);
  const [errorComponent, setErrorComponent] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CheckTokendSchema>({
    resolver: zodResolver(checkTokenSchema),
    defaultValues: {
      token: "",
    },
  });

  const { mutateAsync: senResetPasswordRequest } = useMutation({
    mutationFn: async ({ email, token }: CheckTokendPayload) => {
      const response = await PostCheckToken({ email, token });
      setConfirmComponent(response);
      props.setCheckToken(response);
    },
    onSuccess() {
      setErrorComponent(false);
    },
    onError() {
      props.setCheckToken(false);
      setErrorComponent(true);
      setConfirmComponent(false);
    },
  });

  async function handleCheckToken(data: CheckTokendSchema) {
    const { token } = data;
    props.setToken(token);

    await senResetPasswordRequest({
      email: props.email,
      token,
    });
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          marginTop: { xs: 4, sm: 8 },
          flexDirection: "column",
          width: { xs: "100%", sm: 600 },
        }}
      >
        {confirmComponent ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography sx={{ fontSize: { xs: 24, sm: 48 }, fontWeight: 700 }}>
              Token válido!
            </Typography>
            <Typography
              sx={{ fontSize: { xs: 16, sm: 24 }, textAlign: "center" }}
            >
              O token de autenticação foi validado. Siga para a alteração de
              senha.
            </Typography>
            <HiCheckCircle fontSize='70px' color={green[500]} />
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography sx={{ fontSize: { xs: 16, sm: 24 } }}>
                Por favor, informe o token recebido via e-mail.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginY: 3,
                  gap: 3,
                }}
              >
                <TextField
                  size='small'
                  sx={{
                    border: "1px",
                    borderColor: "#323232",
                    placeHolderColor: "#464646",
                    borderRadius: 2,
                  }}
                  error={!!errors.token}
                  helperText={errors.token && errors.token.message}
                  id={`token`}
                  label='Token'
                  {...register("token")}
                />
              </Box>

              {errorComponent && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: 12, sm: 18 },
                      textAlign: "center",
                      color: "red",
                    }}
                  >
                    Erro ao validar token.
                  </Typography>
                </Box>
              )}

              <Button
                type='submit'
                color='warning'
                variant='contained'
                disabled={isSubmitting}
                onClick={handleSubmit(handleCheckToken)}
                sx={{
                  marginTop: 2,
                  borderRadius: 2,
                }}
                fullWidth
              >
                {isSubmitting ? "Validando..." : "Validar token"}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
