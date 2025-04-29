import { Box, Button, Typography } from '@mui/material'
import TaskAltIcon from '@mui/icons-material/TaskAlt'

type Props = {
  text: string
  onClose: () => void
}
export function SuccessBox({ text, onClose }: Props) {
  return (
    <Box
      sx={{
        boxShadow: '24px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        padding: 4,
      }}
    >
      <TaskAltIcon color='success' fontSize='large' />
      <Typography color='success'>{text}</Typography>
      <Button type='button' variant='contained' color='error' onClick={() => onClose()}>
        <Typography color={'#fff'}>OK</Typography>
      </Button>
    </Box>
  )
}
