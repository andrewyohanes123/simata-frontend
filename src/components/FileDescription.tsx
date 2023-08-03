import { ActionIcon, Box, Card, Text, Title } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { formatBytes } from "modules/byteToReadable";
import { FC, ReactElement } from "react";
import FlexContainer from "./atoms/FlexContainer";

interface props {
  file: File;
  onRemove?: () => void;
}

const FileDescription: FC<props> = ({ file, onRemove }): ReactElement => {
  return (
    <Card withBorder my="md">
      <FlexContainer justifyContent="space-between" alignItems="center">
        <Box>
          <Title order={4}>{file.name}</Title>
          <Text color="dimmed" size="sm">
            {formatBytes(file.size)}
          </Text>
        </Box>
        <ActionIcon onClick={onRemove} color="red">
          <IconX />
        </ActionIcon>
      </FlexContainer>
    </Card>
  );
};

export default FileDescription;
