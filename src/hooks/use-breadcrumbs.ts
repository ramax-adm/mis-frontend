// src/hooks/useBreadcrumbs.ts
import { useAppContext } from "@/contexts/app";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

export interface BreadcrumbItem {
  name: string;
  page: string;
}

export function useBreadcrumbs(): BreadcrumbItem[] {
  const pathname = usePathname();
  const { NAV_ITEMS } = useAppContext();

  return useMemo(() => {
    const path = pathname.split("?")[0]; // remove query params
    const segments = path.split("/").filter(Boolean);

    const crumbs: BreadcrumbItem[] = [{ name: "MIS", page: "/home" }];

    let currentPath = "";
    for (const segment of segments) {
      currentPath += `/${segment}`;
      const match = NAV_ITEMS.find((r) => r.path === currentPath);
      if (match) crumbs.push({ name: match.title, page: match.path });
    }

    return crumbs;
  }, [pathname, NAV_ITEMS]);
}
