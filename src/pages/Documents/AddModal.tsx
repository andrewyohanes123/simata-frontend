import { FC, ReactElement, useCallback, useEffect, useState } from "react";
import { Modal } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as yup from "yup";
import {
  DocumentAttributes,
  ExcludeAttributes,
  FileWithProgress,
} from "types/global";
import Form from "./Form";
import { useClient } from "hooks/useClient";
import axios, { AxiosProgressEvent } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseURL } from "consts";
import { useAccessToken, useAuth } from "hooks";
import { UploadOverlay } from "components";
import { showNotification } from "@mantine/notifications";

interface props {
  opened: boolean;
  onClose: VoidFunction;
}

export type DocumentFormValue = ExcludeAttributes<
  DocumentAttributes,
  "createdAt" | "updatedAt" | "id" | "userId" | "user" | 'verified'
> & {
  files: FileWithProgress[];
};

const initialValues: DocumentFormValue = {
  name: "",
  address: "",
  district: "",
  job: "",
  latitude: 0,
  longitude: 0,
  neighbor: "",
  phone: "",
  street: "",
  subdistrict: "",
  type: "",
  files: [],
};

const validate = yupResolver(
  yup.object().shape({
    name: yup.string().required("Masukkan nama"),
    address: yup.string().required("Masukkan alamat"),
    phone: yup.string().required("Masukkan nomor telepon"),
    job: yup.string().required("Masukkan pekerjaan"),
    type: yup.string().required("Masukkan tipe"),
    latitude: yup
      .number()
      .min(1, "Masukkan garis lintang yang valid")
      .required("Masukkan garis lintang"),
    longitude: yup
      .number()
      .min(1, "Masukkan garis bujur yang valid")
      .required("Masukkan garis bujur"),
    neighbor: yup.string().required("Masukkan RT/RW"),
    street: yup.string().required("Masukkan jalan"),
    subdistrict: yup.string().required("Masukkan kelurahan"),
    district: yup.string().required("Masukkan kecamatan"),
    files: yup
      .array()
      .of(
        yup.object().shape({
          progress: yup.number().required("tidak ada progress bar"),
          file: yup.mixed().required("Pilih file gambar terlebih dahulu!"),
        })
      )
      .min(1, "Pilih minimal 1 file"),
  })
);

const AddModal: FC<props> = ({ opened, onClose }): ReactElement => {
  const form = useForm({ initialValues, validate });
  const { client } = useClient();
  const { account } = useAuth();
  const token = useAccessToken();
  const queryClient = useQueryClient();
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
    mutationFn: ({
      files,
      documentId,
    }: {
      files: FileWithProgress[];
      documentId: number;
    }) =>
      Promise.all(
        files.map(({ file }, i) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("documentId", documentId.toString());
          formData.append("type", "attachment");

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
    },
  });

  const createDocument = useMutation({
    mutationFn: (val: DocumentFormValue) =>
      client
        .service("documents")
        .create({ ...val, files: undefined, userId: account?.id }),
    onSuccess(data, { files }) {
      console.log(data);
      uploadFile.mutate({ documentId: data.id ?? 0, files });
      showNotification({
        title: "Dokumen ditambah",
        message: `Dokumen atas nama ${data.name} berhasil ditambah`,
        color: "green",
      });
    },
  });
  const [files, setFiles] = useState<FileWithProgress[]>([]);
  const { values } = form;
  useEffect(() => {
    setFiles(values.files);
  }, [values.files]);

  return (
    <>
      <Modal
        size="96%"
        opened={opened}
        onClose={onClose}
        title="Tambah Dokumen"
      >
        <Form form={form} onSubmit={createDocument.mutate} />
      </Modal>
      {uploadFile.isLoading && <UploadOverlay files={files} />}
    </>
  );
};

export default AddModal;
