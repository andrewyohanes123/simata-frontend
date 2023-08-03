import { Box, Button, Text, Title } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "hooks";
import { useErrorCatcher } from "hooks/useErrorCatcher";
import { FC, ReactElement } from "react";

const RestrictedPage: FC = (): ReactElement => {
  const {logout} = useAuth();
  const {errorCatcher} = useErrorCatcher();

  const {mutate, isLoading} = useMutation({
    mutationFn: () => (logout()),
    onError(error) {
      errorCatcher(error);
    },
  })

  return (
    <Box p="md">
      <Title>Tidak dapat mengakses halaman ini.</Title>
      <Text mb="xl">Ini adalah halaman yang hanya dapat diakses dari Tablet.</Text>
      <Button onClick={() => mutate()} loading={isLoading} disabled={isLoading}>
        Logout
      </Button>
    </Box>
  );
};

export default RestrictedPage;
