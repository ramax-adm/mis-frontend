import { Box, BoxProps, Typography } from '@mui/material'

interface PageContainerHeaderProps extends BoxProps {
  title: string
}
export function PageContainerHeader({ title, children, ...props }: PageContainerHeaderProps) {
  return (
    <Box
      {...props}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: '10px',
        alignItems: { sm: 'center' },
        ...props?.sx,
      }}
    >
      <Typography variant='h6' fontWeight={800} fontSize={'16px'}>
        {title}
      </Typography>
      {children}
    </Box>
  )
}
