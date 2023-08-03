import { Center, createStyles, Loader, Text, Title } from "@mantine/core";
import { FC, ReactElement } from "react";

const useStyles = createStyles((theme) => ({
  loadingContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    background:
      theme.colorScheme === "dark" ? theme.colors.pink[4] : theme.colors.pink[5],
  },
}));

interface props {
  title?: string;
  description?: string;
}

const LoadingScreen: FC<props> = ({ title, description }): ReactElement => {
  const { classes } = useStyles();
  return (
    <Center className={classes.loadingContainer}>
      <Title color="white" order={2} my="xs" align="center">
        {title ?? "Loading"}
      </Title>
      <Loader color="white" variant="oval" size="xl" mb="xl" />
      <Text color="white" size="lg" align="center">
        {description ?? "Mohon tunggu sebentar"}
      </Text>
    </Center>
  );
};

export default LoadingScreen;
