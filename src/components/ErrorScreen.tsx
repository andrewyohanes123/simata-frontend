import { Center, createStyles, Text, Title } from "@mantine/core";
import { FC, ReactElement } from "react";

const useStyles = createStyles((theme) => ({
  loadingContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    background:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.dark[3],
  },
}));

const ErrorScreen: FC = (): ReactElement => {
  const { classes } = useStyles();
  return (
    <Center className={classes.loadingContainer}>
      <Title color="white" order={2} my="md" align="center">
        Koneksi dengan server tidak stabil
      </Title>
      <Text color="white" size="lg" align="center">
        Aplikasi tidak dapat terkoneksi dengan server.
      </Text>
    </Center>
  );
};

export default ErrorScreen;
