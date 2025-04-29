import { Form } from '@/components/Form'
import { PageContainer } from '@/components/PageContainer'
import { PageContainerHeader } from '@/components/PageContainer/header'
import { GetDREValuesForm } from './components/forms/get-dre-values-form'

export default function OperationDREPage() {
  return (
    <PageContainer>
      <PageContainerHeader title='DRE de operações' />

      <GetDREValuesForm />
    </PageContainer>
  )
}
