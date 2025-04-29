import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    bold: true
    danger: true
  }
}

const CustomTheme = createTheme({
  components: {
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
