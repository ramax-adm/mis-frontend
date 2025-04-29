import { Box, InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import { GrFormView, GrFormViewHide } from 'react-icons/gr'

interface inputPasswordProps {
  error: boolean
  errorMessage: string
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  size?: 'small' | 'medium'
}
export function InputPassword({
  error,
  errorMessage,
  password,
  setPassword,
  size = 'medium',
}: inputPasswordProps) {
  const [isShow, setIsShow] = useState(false)

  const handleShowPassword = () => {
    setIsShow(!isShow)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <TextField
        label='Senha'
        size={size}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              {!isShow ? (
                <GrFormView
                  style={{ cursor: 'pointer' }}
                  onClick={handleShowPassword}
                  size={25}
                  color='black'
                />
              ) : (
                <GrFormViewHide
                  style={{ cursor: 'pointer' }}
                  onClick={handleShowPassword}
                  size={25}
                  color='black'
                />
              )}
            </InputAdornment>
          ),
        }}
        type={isShow ? 'text' : 'password'}
        value={password}
        onChange={handlePasswordChange}
        error={error}
        helperText={errorMessage}
        fullWidth
        required
      />
    </Box>
  )
}
