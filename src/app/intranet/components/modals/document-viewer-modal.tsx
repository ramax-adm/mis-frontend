"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Box, Typography, Alert } from "@mui/material";
import { useUserConfirmDocumentAcceptance } from "@/services/react-query/mutations/intranet";
import { toast } from "sonner";
import { NextResponse } from "next/server";
import dayjs from "dayjs";
import { getDiffBetweenDates } from "@/utils/date.utils";
import dynamic from "next/dynamic";

// Import dinâmico
const PdfViewer = dynamic(() => import("@/components/PdfViewer"), {
  ssr: false, // se precisar desabilitar renderização no servidor
});

interface DocumentViewerModalProps {
  versionId: string;
  status: string;
  signedUrl: string;
  onClose: () => void;
}

export function DocumentViewerModal({
  versionId,
  status,
  signedUrl,
  onClose,
}: DocumentViewerModalProps) {
  // const [pdf, setPdf] = useState<Uint8Array | null>(null);
  const [state, setState] = useState({
    openedAt: new Date(),
    loadingIp: false,
    currentIp: null as string | null,
    canUserAcceptDocument: false,
  });

  const {
    mutateAsync: confirmDocumentAcceptance,
    isPending: isConfirmDocumentAcceptance,
  } = useUserConfirmDocumentAcceptance();

  const onConfirmDocumentAcceptance = async () => {
    if (!state.currentIp) {
      toast.error("erro", { description: "Não foi possivel definir o seu ip" });
      return;
    }
    const startTime = dayjs(state.openedAt.getTime());
    startTime.diff();
    await confirmDocumentAcceptance({
      documentVersionId: versionId,
      acceptanceTimeInSeconds: getDiffBetweenDates(
        state.openedAt,
        new Date(),
        "second"
      ),
      ipAddress: state.currentIp,
    });
    onClose();
  };

  // 👉 Busca IP
  useEffect(() => {
    setState((prev) => ({ ...prev, loadingIp: true }));
    getIp()
      .then((res) => setState((prev) => ({ ...prev, currentIp: res.ip })))
      .catch((error) => console.log(error))
      .finally(() => setState((prev) => ({ ...prev, loadingIp: false })));
    // getPdf(signedUrl).then((res) => setPdf(res));
  }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: { xs: "90%", md: "50%" },
        height: "80%",
        bgcolor: "background.paper",

        boxShadow: 24,
      }}
    >
      <PdfViewer
        pdfUrl={signedUrl}
        containerStyle={{ width: "100%", height: "100%" }}
        onReachEnd={() => {
          setState((prev) =>
            prev.canUserAcceptDocument
              ? prev
              : { ...prev, canUserAcceptDocument: true }
          );
        }}
      />

      {status === "OK" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 0.5,
            bgcolor: "background.paper",
          }}
        >
          <Alert severity='success'>Documento já confirmado</Alert>
        </Box>
      )}

      {status !== "OK" && (
        <Box
          sx={{
            py: 1,
            display: "flex",
            justifyContent: "center",
            bgcolor: "background.paper",
          }}
        >
          <Button
            variant='contained'
            disabled={
              !state.canUserAcceptDocument || isConfirmDocumentAcceptance
            }
            onClick={onConfirmDocumentAcceptance}
          >
            Confirmar leitura
          </Button>
        </Box>
      )}
    </Box>
  );
}

// const getPdf = async (signedUrl: string) => {
//   const res = await fetch(
//     `/intranet/api/pdf?url=${encodeURIComponent(signedUrl)}`
//   );

//   const buffer = await res.arrayBuffer();
//   return new Uint8Array(buffer);
// };

// 👉 Mantém só essa função auxiliar
const getIp = async () => {
  const response = await fetch("/intranet/api/get-ip");
  return await response.json();
};
