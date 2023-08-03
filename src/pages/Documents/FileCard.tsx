import { UseFormReturnType } from "@mantine/form";
import { FC, ReactElement, useCallback } from "react";
import { DocumentFormValue } from "./AddModal";
import { ActionIcon, Box, Card, Progress, Text } from "@mantine/core";
import { formatBytes } from "modules";
import { When } from "react-if";
import { IconTrash } from "@tabler/icons-react";
import { FileWithProgress } from "types/global";
import { FlexContainer } from "components";

type UploadDocumentResultValue = { files: FileWithProgress[] };

interface props {
  progress: number;
  file: File;
  formInstance?: UseFormReturnType<
    DocumentFormValue | UploadDocumentResultValue,
    (
      values: DocumentFormValue | UploadDocumentResultValue
    ) => DocumentFormValue | UploadDocumentResultValue
  >;
  uploading: boolean;
  index: number;
  withPic?: boolean;
  removeFileButton?: boolean;
}

const FileCard: FC<props> = ({
  progress,
  file,
  formInstance,
  uploading,
  index,
  removeFileButton = true,
}): ReactElement => {
  const removeFile = useCallback(() => {
    formInstance?.removeListItem("files", index);
  }, [formInstance, index]);

  return (
    <Card p={0} my="xs" withBorder>
      <Box p="md">
        <FlexContainer justifyContent="space-between" alignItems="center">
          <Box>
            <Text size="lg" fw="bold">
              {file.name}
            </Text>
            <Text size="sm" color="dimmed">
              {formatBytes(file.size, 2)}
            </Text>
          </Box>
          {removeFileButton && (
            <Box>
              <ActionIcon onClick={removeFile} variant="subtle" color="red">
                <IconTrash />
              </ActionIcon>
            </Box>
          )}
        </FlexContainer>
        <When condition={uploading}>
          <Progress value={progress} size="xl" animate my="sm" />
        </When>
      </Box>
    </Card>
  );
};

export default FileCard;
