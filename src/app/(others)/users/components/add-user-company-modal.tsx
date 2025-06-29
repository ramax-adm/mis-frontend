import { ControlledSelect } from '@/components/Inputs/Select/Customized'
import { useAuthContext } from '@/contexts/auth'
import { useAddUserCompany } from '@/services/react-query/mutations/user'
import { useGetCompanies } from '@/services/react-query/queries/sensatta'
import { useGetUser } from '@/services/react-query/queries/user'
import { User } from '@/types/user'
import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'

interface AddUserCompanyModalProps {
  userId: string
  onClose: () => void
}
export function AddUserCompanyModal({ userId, onClose }: AddUserCompanyModalProps) {
  const { user } = useAuthContext()
  const { data: companies } = useGetCompanies({ token: user.name })
  const { data: userData } = useGetUser(userId)
  const { mutateAsync: addUserCompany, isPending } = useAddUserCompany()
  const [company, setCompany] = useState('')

  const handleSelectCompany = (value: string) => setCompany(value)

  const handleSubmit = async () => {
    await addUserCompany({ userId: userId, companyCode: company })

    onClose()
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box
        sx={{
          borderRadius: '8px 8px 0 0',
          backgroundColor: '#fff',
        }}
      >
        <Typography variant='h6' component='h2'>
          Adicionar Nova Empresa
        </Typography>
      </Box>

      <ControlledSelect
        id='company'
        label='Empresa'
        name='company'
        value={company}
        onChange={handleSelectCompany}
        options={companies
          ?.filter((i) => {
            const relatedUserCompany = userData?.userCompanies.find(
              (c) => c.companyCode === i.sensattaCode,
            )
            if (!relatedUserCompany) {
              return true
            }
            return false
          })
          ?.map((i) => ({
            key: i.sensattaCode,
            value: i.sensattaCode,
            label: i.name,
          }))}
      />

      <Button variant='contained' disabled={isPending} onClick={handleSubmit}>
        Adicionar
      </Button>
    </Box>
  )
}
