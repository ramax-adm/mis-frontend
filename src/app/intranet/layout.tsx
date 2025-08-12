import { ReactNode, Suspense } from "react";
import "@/app/globals.css";

export default function IntranetLayout({ children }: { children: ReactNode }) {
  return <Suspense>{children}</Suspense>;
}
