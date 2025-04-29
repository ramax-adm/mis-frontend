import { CustomizedTable } from './body'
import { TableNoPaginationContent } from './noPaginationContent'
import { TablePaginationContent } from './paginationContent'
import { TableRoot } from './root'
import { TableTitle } from './title'

export const Table = {
  Root: TableRoot,
  Title: TableTitle,
  Body: CustomizedTable,
  PaginationContent: TablePaginationContent,
  NoPaginationContent: TableNoPaginationContent,
}
