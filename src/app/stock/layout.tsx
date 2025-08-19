import { ReactNode, Suspense } from "react";

export default function StockLayout({ children }: { children: ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
