import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const useHttpState = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const getState = (queryName: string) => {
    return searchParams.get(queryName)
  }
  const setState = (queryName: string, queryValue: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (queryValue) {
      params.set(queryName, queryValue)
      router.replace(`${pathname}?${params.toString()}`)
    } else {
      router.replace(`${pathname}`)
    }
  }

  return {
    searchParams,
    setState,
    getState,
  }
}
