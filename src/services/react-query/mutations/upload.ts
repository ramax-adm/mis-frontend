import { PostUploadFile } from '@/services/webApi/upload-api'
import { GetUploadFilesResponse } from '@/types/api/upload'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useUploadFile = ({
  uploadFileWithInputs,
}: {
  uploadFileWithInputs: GetUploadFilesResponse | undefined
}) => {
  return useMutation({
    mutationFn: async (data: Record<string, any>) => {
      const formData = new FormData()
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value)
      }

      if (uploadFileWithInputs?.uploadFile.apiUrl) {
        formData.append('url', uploadFileWithInputs?.uploadFile.apiUrl)
      }

      formData.append('file', data.files[0])

      const response = await PostUploadFile(uploadFileWithInputs?.uploadFile.type, formData)

      return response
    },
    onError() {
      toast.error('Erro', {
        description: 'Erro ao fazer o upload do arquivo!',
      })
    },

    onSuccess() {
      toast.success('Sucesso', {
        description: 'O Upload do arquivo foi concluido com sucesso',
      })
    },
  })
}
