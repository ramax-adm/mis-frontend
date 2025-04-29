import { ReactNode } from 'react'

interface TablePaginationContentProps {
  children: ReactNode
}
export function TableNoPaginationContent({ children }: TablePaginationContentProps) {
  return children
}
