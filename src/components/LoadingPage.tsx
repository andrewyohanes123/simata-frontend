import { Box, Skeleton } from "@mantine/core";

const LoadingPage = () => {
  return (
    <Box p="md" h="100%" w="100%">
      <Skeleton animate w="500px" h="70" mb="md" />
      <Skeleton radius="lg" w={500} h={500} animate my="md" />
      <Skeleton radius="lg" w={500} h={60} animate my="md" />
      <Skeleton radius="lg" w={200} h={60} animate my="md" />
      <Skeleton radius="lg" w={250} h={60} animate my="md" />
      <Skeleton radius="lg" w={350} h={60} animate my="md" />
    </Box>
  );
};

export default LoadingPage;
