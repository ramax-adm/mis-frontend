import { ReactNode, Suspense } from "react";

export default function FinanceLayout({ children }: { children: ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
