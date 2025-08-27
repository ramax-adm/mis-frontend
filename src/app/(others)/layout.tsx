import { ReactNode, Suspense } from "react";

export default function OthersLayout({ children }: { children: ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
