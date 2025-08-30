"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { useUserConfirmDocumentAcceptance } from "@/services/react-query/mutations/intranet";
import { toast } from "sonner";
import { PdfViewer } from "@/components/PdfViewer";
import { NextResponse } from "next/server";
import dayjs from "dayjs";
import { getDiffBetweenDates } from "@/utils/date.utils";

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
  const [pdf, setPdf] = useState<Uint8Array | null>(null);
  const [state, setState] = useState({
    openedAt: new Date(),
    currentIp: null as string | null,
    canUserAcceptDocument: false,
  });

  const { mutateAsync: confirmDocumentAcceptance } =
    useUserConfirmDocumentAcceptance();

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
    try {
      getIp().then((res) =>
        setState((prev) => ({ ...prev, currentIp: res.ip }))
      );
      getPdf(signedUrl).then((res) => setPdf(res));
    } catch (error) {
      console.log(error);
    }
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
      {pdf ? (
        <PdfViewer
          pdfUrl={pdf}
          containerStyle={{ width: "100%", height: "100%" }}
          onReachEnd={() => {
            setState((prev) =>
              prev.canUserAcceptDocument
                ? prev
                : { ...prev, canUserAcceptDocument: true }
            );
          }}
        />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeContent: "center",
          }}
        >
          <Typography>Carregando PDF...</Typography>
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
            disabled={!state.canUserAcceptDocument}
            onClick={onConfirmDocumentAcceptance}
          >
            Confirmar leitura
          </Button>
        </Box>
      )}
    </Box>
  );
}

const getPdf = async (signedUrl: string) => {
  const res = await fetch(
    `/intranet/api/pdf?url=${encodeURIComponent(signedUrl)}`
  );

  const buffer = await res.arrayBuffer();
  return new Uint8Array(buffer);
};

// 👉 Mantém só essa função auxiliar
const getIp = async () => {
  const response = await fetch("/intranet/api/get-ip");
  return await response.json();
};
