import { YouTubePlayer } from "@/components/Video/youtube-player";
import { Box } from "@mui/material";

interface IntegrationKitVideoModalProps {
  selectedVideoId: string;
}
export function IntegrationKitVideoModal({
  selectedVideoId,
}: IntegrationKitVideoModalProps) {
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
      <YouTubePlayer videoId={selectedVideoId} />
    </Box>
  );
}
