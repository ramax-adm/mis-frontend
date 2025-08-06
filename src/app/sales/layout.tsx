import { ReactNode, Suspense } from "react";

export default function SalesLayout({ children }: { children: ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
