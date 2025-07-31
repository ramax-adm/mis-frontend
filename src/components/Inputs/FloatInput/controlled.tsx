import React, { forwardRef } from "react";
import { FormControl, TextField } from "@mui/material";

interface FloatInputControlledProps {
  name: string;
  label: string;
  readonly?: boolean;
  size?: "small" | "medium";
}

// Componente agora recebe o ref via forwardRef
export const FloatInputControlled = forwardRef<
  HTMLInputElement,
  FloatInputControlledProps
>(({ name, label, readonly, size = "medium" }, ref) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Convertendo para número e limitando a duas casas decimais
    const parsedValue = parseFloat(inputValue);

    // Verificando se é um valor válido
    if (ref && typeof ref !== "function") {
      (ref as React.RefObject<HTMLInputElement>).current!.value = isNaN(
        parsedValue
      )
        ? "0.00"
        : parsedValue.toFixed(2);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Verificar se a tecla pressionada é permitida
    const allowedChars = /^[0-9\.]$/;
    const key = e.key;

    // Se a tecla pressionada não for um número, vírgula ou ponto, impedir
    if (!allowedChars.test(key)) {
      e.preventDefault(); // Impede a digitação do caractere
    }
  };

  return (
    <FormControl fullWidth>
      <TextField
        ref={ref} // O ref é passado de fora e atribuído ao TextField
        name={name}
        label={label}
        variant='outlined'
        fullWidth
        onChange={handleInputChange}
        onKeyPress={handleKeyPress} // Adiciona o evento para prevenir caracteres inválidos
        placeholder='Ex: 12,34'
        size={size}
        InputProps={{
          readOnly: readonly,
        }}
      />
    </FormControl>
  );
});
