export class CustomFile extends File {
  id: string
  filename: string

  constructor({ id, filename }: { id: string; filename: string }) {
    super([], filename)
    this.id = id
    this.filename = filename
  }
}
