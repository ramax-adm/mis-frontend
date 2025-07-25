import { createTheme } from "@mui/material/styles";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    bold: true;
    danger: true;
  }
}

const CustomTheme = createTheme({
  typography: {
    fontSize: 12, // fonte base global (padrão é 14)
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem", // sobrescreve o estilo base do Typography
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.MuiOutlinedInput-sizeSmall": {
            height: 32,
            padding: 0,
          },
          // remove possível conflito de altura com adornments
          "& .MuiInputAdornment-root": {
            height: "100%",
            maxHeight: "100%",
            marginTop: 0,
          },
        },
        inputSizeSmall: {
          padding: "6px 8px", // padrão visual bom para campos pequenos
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&.MuiInputBase-sizeSmall": {
            minHeight: 32, // garante altura mínima consistente
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          height: 32,
          maxHeight: 32,
          marginTop: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        startIcon: {
          marginRight: 4, // default é 8, diminui aqui
        },
        endIcon: {
          marginLeft: 4, // idem
        },
      },

      variants: [
        {
          props: { variant: "bold" },
          style: {
            fontWeight: "bold",
            border: `1px solid black`,
            color: "#3E63DD",
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            fontWeight: "bold",
            border: `1px solid #3e63dd45`,
            color: "#3E63DD",
          },
        },
        {
          props: { variant: "contained" },
          style: {
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#3E63DD",
            "&:hover": {
              opacity: 0.8,
              boxShadow: "none",
            },
          },
        },
      ],
      defaultProps: {
        disableElevation: true,
        disableFocusRipple: true,
        disableRipple: true,
      },
    },
  },
});

export { CustomTheme };
