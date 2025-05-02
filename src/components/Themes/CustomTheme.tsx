import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    bold: true
    danger: true
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
          fontSize: '0.875rem', // sobrescreve o estilo base do Typography
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        inputSizeSmall: {
          padding: '4px 8px', // controle interno do campo (input)
        },
        root: {
          '&.MuiInputBase-sizeSmall': {
            minHeight: '32px', // altura do wrapper do TextField
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '6px 8px',
        },
        inputSizeSmall: {
          padding: '4px 8px', // altura reduzida do conteúdo
        },
        root: {
          '&.MuiOutlinedInput-sizeSmall': {
            height: '32px', // altura total do campo
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'bold' },
          style: {
            fontWeight: 'bold',
            border: `1px solid black`,
            color: '#3E63DD',
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            fontWeight: 'bold',
            border: `1px solid #3E63DD`,
            color: '#3E63DD',
          },
        },
        {
          props: { variant: 'contained' },
          style: {
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: '#3E63DD',
            '&:hover': {
              opacity: 0.8,
              boxShadow: 'none',
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
})

export { CustomTheme }
