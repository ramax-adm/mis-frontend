import { ReactNode, Suspense } from "react";

export default function FreightsLayout({ children }: { children: ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
