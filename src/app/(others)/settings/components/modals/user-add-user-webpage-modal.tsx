import { ControlledSelect } from "@/components/Inputs/Select/Customized";
import { useAddUserWebpage } from "@/services/react-query/mutations/user";
import { useGetAppWebpages } from "@/services/react-query/queries/application";
import { useGetUser } from "@/services/react-query/queries/user";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

interface AddUserWebpageModalProps {
  userId: string;
  onClose: () => void;
}
export function AddUserWebpageModal({
  userId,
  onClose,
}: AddUserWebpageModalProps) {
  const { data: webpages } = useGetAppWebpages();
  const { data: userData } = useGetUser(userId);
  const { mutateAsync: addUserWebpage, isPending } = useAddUserWebpage();
  const [webpage, setWebpage] = useState("");

  const handleSelectWebpage = (value: string) => setWebpage(value);

  const handleSubmit = async () => {
    await addUserWebpage({ userId: userId, pageId: webpage });

    onClose();
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={{
          borderRadius: "8px 8px 0 0",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant='h6' component='h2'>
          Adicionar nova página
        </Typography>
      </Box>

      <ControlledSelect
        size='small'
        id='webpage'
        label='Página'
        name='webpage'
        value={webpage}
        onChange={handleSelectWebpage}
        disablePortal={false}
        options={webpages
          ?.filter((i) => !i.isPublic)
          ?.filter((i) => {
            const relatedUserCompany = userData?.userWebpages.find(
              (p) => p.pageId === i.id
            );
            if (!relatedUserCompany) {
              return true;
            }
            return false;
          })
          ?.map((i) => ({
            key: i.id,
            value: i.id,
            label: i.name,
          }))}
      />

      <Button variant='contained' disabled={isPending} onClick={handleSubmit}>
        Adicionar
      </Button>
    </Box>
  );
}
