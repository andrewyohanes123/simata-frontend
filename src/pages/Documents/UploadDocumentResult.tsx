import { FC, ReactElement, useCallback, useState } from "react";
import { Modal, Button, FileButton, Text, Box } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as yup from "yup";
import { DocumentAttributes, FileWithProgress } from "types/global";
import axios, { AxiosProgressEvent } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptedMimes, baseURL } from "consts";
import { useAccessToken } from "hooks";
import { UploadOverlay } from "components";
import { showNotification } from "@mantine/notifications";
import { IconFile } from "@tabler/icons-react";
import FileCard from "./FileCard";
import { useClient } from "hooks/useClient";

const validate = yupResolver(
  yup.object().shape({
    files: yup.array().of(yup.mixed()).min(1, "Masukkan minimal 1 berkas"),
  })
);

interface props {
  opened: boolean;
  onClose: () => void;
  selectedDocument: DocumentAttributes | null;
}

const initialValues: { files: FileWithProgress[] } = {
  files: [],
};

const UploadDocumentResult: FC<props> = ({
  opened,
  onClose,
  selectedDocument,
}): ReactElement => {
  const form = useForm({
    initialValues,
    validate,
  });
  const [files, setFiles] = useState<FileWithProgress[]>([]);
  const queryClient = useQueryClient();
  const token = useAccessToken();
  const { client } = useClient();

  const fileUploadProgress = useCallback((fileIndex: number) => {
    return (progress: AxiosProgressEvent) => {
      const percentage = Math.floor(
        (progress.loaded * 100) / (progress?.total ?? 1)
      );
      setFiles((files) =>
        files.map((file, idx) =>
          idx === fileIndex ? { ...file, progress: percentage } : file
        )
      );
    };
  }, []);
  const uploadFile = useMutation({
    mutationFn: ({ files }: { files: FileWithProgress[] }) =>
      Promise.all(
        files.map(({ file }, i) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("documentId", (selectedDocument?.id ?? 0).toString());
          formData.append("type", "result");

          return axios.post(`${baseURL}/files`, formData, {
            headers: {
              Authorization: token,
            },
            onUploadProgress: fileUploadProgress(i),
          });
        })
      ),
    onError: (error) => console.log(error),
    onSuccess: (data) => {
      console.log(data);
      onClose();
      queryClient.invalidateQueries(["documents"]);
      queryClient.invalidateQueries(["results"]);
      queryClient.invalidateQueries(["attachments"]);
    },
  });

  const verifyDocument = useMutation({
    mutationFn: ({ id }: { id?: number }) =>
      client.service("documents").patch(id ?? null, { verified: true }),
  });

  const onFinish = useCallback(
    (val: typeof initialValues) => {
      verifyDocument.mutate(
        { id: selectedDocument?.id },
        {
          onSuccess: (data) => {
            showNotification({
              title: "Verifikasi berhasil",
              message: `Verifikasi dokumen ${data.name} berhasil`,
              color: "green",
            });
            uploadFile.mutate(val);
          },
        }
      );
    },
    [selectedDocument?.id, uploadFile, verifyDocument]
  );

  const onAddFile = useCallback(
    (file: File) => {
      if (acceptedMimes.split(",").includes(file.type)) {
        form.insertListItem("files", { progress: 0, file });
      } else {
        showNotification({
          title: "File tidak dapat diupload",
          message: `File ${file.name} tidak dapat diupload`,
        });
      }
    },
    [form]
  );

  return (
    <>
      <Modal opened={opened} onClose={onClose} title="Verifikasi Dokumen">
        <Box onSubmit={form.onSubmit(onFinish)} component="form">
          <FileButton accept={acceptedMimes} onChange={onAddFile}>
            {(props) => (
              <Button variant="outline" {...props} leftIcon={<IconFile />}>
                Pilih Berkas
              </Button>
            )}
          </FileButton>
          {form.values.files.length === 0 && (
            <Box my="xl" py="xl">
              <Text align="center" fw="bold">
                Silakan masukkan berkas hasil untuk menverifikasi dokumen
              </Text>
            </Box>
          )}
          {form.values.files.map(({ file }, i) => (
            <FileCard
              key={`${i}${file.lastModified}`}
              file={file}
              index={i}
              progress={0}
              uploading={false}
              formInstance={form}
            />
          ))}
          {typeof form.errors.files !== "undefined" && (
            <Text>{form.errors.files}</Text>
          )}
          <Button
            type="submit"
            loading={uploadFile.isLoading || verifyDocument.isLoading}
            fullWidth
          >
            Verifikasi
          </Button>
        </Box>
      </Modal>
      {uploadFile.isLoading && <UploadOverlay files={files} />}
    </>
  );
};

export default UploadDocumentResult;
