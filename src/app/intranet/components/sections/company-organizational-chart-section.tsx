import ApexTree from "apextree";
import { Box, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { COLORS } from "@/constants/styles/colors";
import { red } from "@mui/material/colors";
/**
 * TODO
 */

export function CompanyOrganizationalChartSection() {
  const treeRef = useRef(null);
  const treeInstanceRef = useRef<any>(null); // guarda instância
  useEffect(() => {
    if (treeInstanceRef.current) return; // já inicializado, não recria
    const data = {
      id: "ms",
      data: {
        name: "Magno - CEO",
      },
      options: {
        nodeBGColor: "#121212",
        nodeBGColorHover: "#121212",
      },
      children: [
        {
          id: "mh",
          data: {
            name: "Milton",
          },
          options: {
            nodeBGColor: red["500"],
            nodeBGColorHover: red["600"],
          },
        },
        {
          id: "jr",
          data: {
            name: "José",
          },
          options: {
            nodeBGColor: red["500"],
            nodeBGColorHover: red["600"],
          },
        },
        {
          id: "fc",
          data: {
            name: "Francisco",
          },
          options: {
            nodeBGColor: red["500"],
            nodeBGColorHover: red["600"],
          },
        },
        {
          id: "ad",
          data: {
            name: "Adriano",
          },
          options: {
            nodeBGColor: red["500"],
            nodeBGColorHover: red["600"],
          },
        },
        {
          id: "ma",
          data: {
            name: "Marcio",
          },
          options: {
            nodeBGColor: red["500"],
            nodeBGColorHover: red["600"],
          },
        },
        {
          id: "x-cp",
          data: {
            name: "XXX",
          },
          options: {
            nodeBGColor: red["500"],
            nodeBGColorHover: red["600"],
          },
        },
        {
          id: "mh",
          data: {
            name: "Milton Ribeiro",
          },
          options: {
            nodeBGColor: red["500"],
            nodeBGColorHover: red["600"],
          },
        },
        {
          id: "mh",
          data: {
            name: "Milton Ribeiro",
          },
          options: {
            nodeBGColor: red["500"],
            nodeBGColorHover: red["600"],
          },
        },
      ],
    };
    const options: any = {
      contentKey: "data",
      nodeWidth: 150,
      nodeHeight: 50,
      fontColor: "#fff",
      borderColor: "#333",
      childrenSpacing: 50,
      siblingSpacing: 20,
      direction: "top",
      nodeTemplate: (content: any) =>
        `<div style='display: flex;flex-direction: column;gap: 10px;justify-content: center;align-items: center;height: 100%;'>
            <div style="font-weight: bold; font-family: Arial; font-size: 14px">${content.name}</div>
         </div>`,
      canvasStyle: `margin-top:12px; border: 1px solid ${COLORS.BORDAS}; border-radius:8px;background: #FAFAFA;width:100%; height: calc(100vh - 120px);`,
      enableToolbar: true,
    };

    if (treeRef.current) {
      treeInstanceRef.current = new ApexTree(treeRef.current, options);
      treeInstanceRef.current.render(data);
    }
  }, []);

  return (
    <Box>
      <div ref={treeRef} />
    </Box>
  );
}
