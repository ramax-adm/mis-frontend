import { GetSyncedFileSignedUrl } from '@/services/webApi/utils-api'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useDownloadSyncedFile = () => {
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      const data = await GetSyncedFileSignedUrl({ id })

      return data.signedUrl
    },
    onSuccess: (signedUrl) => {
      // Criar link para forçar o download
      const link = document.createElement('a')
      link.href = signedUrl
      link.setAttribute('download', '')
      link.setAttribute('target', '')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast.success('Sucesso', {
        description: 'Sucesso ao fazer o download',
      })
    },
    onError: (error) => {
      toast.error('Erro', {
        description: 'Erro ao obter a signed URL',
      })
      console.error('Erro ao obter a signed URL:', error)
    },
  })
}
