import { Overlay, Box, Center, Loader, createStyles, Text } from "@mantine/core";
import FileCard from "pages/Documents/FileCard";
import { FC, ReactElement } from "react";
import { FileWithProgress } from "types/global";

const useStyles = createStyles(() => ({
  overlayBoxContainer: {
    width: window.innerWidth * 0.35,
  },
}));

interface props {
  files: FileWithProgress[];
}

const UploadOverlay: FC<props> = ({ files }): ReactElement => {
  const { classes } = useStyles();
  return (
    <>
      <Overlay color="#fff" opacity={0.6} zIndex={400} blur={10} center>
        <Box className={classes.overlayBoxContainer}>
          <Center>
            <Loader size="xl" variant="bars" mb="md" />
          </Center>
          <Text align="center" color="dark">
            Sedang mengunggah berkas
          </Text>
          {files.map((file, index) => (
            <FileCard
              file={file.file}
              key={`${file.file.name}${index} ${file.file.lastModified}`}
              uploading
              withPic={false}
              removeFileButton={false}
              progress={file.progress}
              index={index}
            />
          ))}
        </Box>
      </Overlay>
    </>
  );
};

export default UploadOverlay;
