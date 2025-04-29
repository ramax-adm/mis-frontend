/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties, ReactNode } from 'react'
import { UseFormReturn, FormProvider, FieldValues } from 'react-hook-form'

type FormRootProps<T extends FieldValues> = {
  onSubmit: (data: any) => void
  style?: CSSProperties
  children: ReactNode
  methods: UseFormReturn<T, any, undefined> // Removido os parâmetros adicionais desnecessários
}
export function FormRoot<T extends FieldValues>({
  onSubmit,
  style,
  children,
  methods,
}: FormRootProps<T>) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} style={{ ...style }}>
        {children}
      </form>
    </FormProvider>
  )
}
