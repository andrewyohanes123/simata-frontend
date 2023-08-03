import { FC, ReactElement, useCallback } from "react";
import { saveAs } from "file-saver";
import { ActionIcon, Box, Card, Text } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { FileAttributes } from "types/global";
import { baseURL } from "consts";
import { FlexContainer } from "components";

interface props {
  file: FileAttributes;
}

const AttachmentCard: FC<props> = ({ file }): ReactElement => {
  const downloadFile = useCallback(() => {
    saveAs(`${baseURL}/storage/files/${file.id}`, file.name);
  }, [file.id, file.name]);

  return (
    <Card p={0} my="xs" withBorder>
      <Box p="md">
        <FlexContainer justifyContent="space-between" alignItems="center">
          <Box>
            <Text fw="bold">{file.name}</Text>
          </Box>
          <Box>
            <ActionIcon onClick={downloadFile} variant="light" color="lime">
              <IconDownload />
            </ActionIcon>
          </Box>
        </FlexContainer>
      </Box>
    </Card>
  );
};

export default AttachmentCard;
