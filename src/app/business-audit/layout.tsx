import { ReactNode, Suspense } from "react";

export default function BusinessAuditLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <Suspense>{children}</Suspense>;
}
