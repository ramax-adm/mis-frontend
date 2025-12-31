import { ReactNode, Suspense } from "react";

export default function CattlePurchaseLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <Suspense>{children}</Suspense>;
}
