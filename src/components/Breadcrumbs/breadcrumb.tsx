// src/components/Breadcrumbs.tsx
"use client";

import NextLink from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from "@mui/material";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";

export function Breadcrumbs() {
  const items = useBreadcrumbs();

  if (!items.length) return null;

  return (
    <MUIBreadcrumbs
      separator={<NavigateNextIcon fontSize='small' sx={{ opacity: 0.6 }} />}
      aria-label='breadcrumb'
      sx={{
        fontSize: 13,
        color: "text.secondary",
        mb: 1,
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return isLast ? (
          <Typography
            key={item.page}
            color='text.primary'
            sx={{ fontWeight: 500 }}
          >
            {item.name}
          </Typography>
        ) : (
          <Link
            key={item.page}
            component={NextLink}
            href={item.page}
            underline='hover'
            color='inherit'
            sx={{
              "&:hover": { color: "primary.main" },
              transition: "color 0.2s ease",
            }}
          >
            {item.name}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
}
