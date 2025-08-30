import { YouTubePlayer } from "@/components/Video/youtube-player";
import { useUserConfirmDocumentAcceptance } from "@/services/react-query/mutations/intranet";
import { useGetIntranetDocumentVersion } from "@/services/react-query/queries/intranet";
import { getDiffBetweenDates } from "@/utils/date.utils";
import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface DocumentVideoModalProps {
  versionId: string;
  videoUrl: string;
  status: string;
  onClose: () => void;
}
export function DocumentVideoModal({
  versionId,
  videoUrl,
  status,
  onClose,
}: DocumentVideoModalProps) {
  const [state, setState] = useState({
    openedAt: new Date(),
    currentIp: null,
  });

  const { mutateAsync: confirmDocumentAcceptance } =
    useUserConfirmDocumentAcceptance();

  const onConfirmDocumentAcceptance = async () => {
    if (!state.currentIp) {
      toast.error("erro", { description: "Não foi possivel definir o seu ip" });
      return;
    }
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

  useEffect(() => {
    getApiData().then((res) =>
      setState((prev) => ({ ...prev, currentIp: res.ip }))
    );
  }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: {
          xs: "90%",
          md: "60%",
        },
        bgcolor: "background.paper",
        boxShadow: 24,
      }}
    >
      <YouTubePlayer videoId={videoUrl} />

      {status !== "OK" && (
        <Box
          sx={{
            display: "inline-flex",
            justifyContent: "center",
            width: "100%",
            marginY: 1,
          }}
        >
          <Button
            sx={{ marginX: "auto" }}
            onClick={onConfirmDocumentAcceptance}
          >
            Confirmar visualização
          </Button>
        </Box>
      )}
    </Box>
  );
}

const getApiData = async () => {
  const response = await fetch("/intranet/api/get-ip");

  return await response.json();
};
