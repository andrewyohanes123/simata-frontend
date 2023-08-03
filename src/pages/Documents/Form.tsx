/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, ReactElement, useCallback } from "react";
import {
  Box,
  Button,
  FileButton,
  Group,
  NumberInput,
  Text,
  TextInput,
} from "@mantine/core";
import {
  IMAGE_MIME_TYPE,
  MIME_TYPES,
  MS_EXCEL_MIME_TYPE,
  MS_POWERPOINT_MIME_TYPE,
  MS_WORD_MIME_TYPE,
} from "@mantine/dropzone";
import { UseFormReturnType } from "@mantine/form";
import { DocumentFormValue } from "./AddModal";
import { showNotification } from "@mantine/notifications";
import FileCard from "./FileCard";

interface props {
  form: UseFormReturnType<
    DocumentFormValue,
    (values: DocumentFormValue) => DocumentFormValue
  >;
  onSubmit: (value: DocumentFormValue) => void;
}

const acceptedMimes = [
  ...IMAGE_MIME_TYPE,
  MIME_TYPES.pdf,
  ...MS_EXCEL_MIME_TYPE,
  ...MS_EXCEL_MIME_TYPE,
  ...MS_POWERPOINT_MIME_TYPE,
  ...MS_WORD_MIME_TYPE,
].join(",");

const Form: FC<props> = ({ form, onSubmit }): ReactElement => {
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
    <Box component="form" onSubmit={form.onSubmit(onSubmit)}>
      <Group align="flex-start" grow>
        <Box>
          <TextInput
            placeholder="Nama"
            label="Nama"
            {...form.getInputProps("name")}
          />
          <TextInput
            placeholder="Alamat"
            label="Alamat"
            {...form.getInputProps("address")}
          />
          <TextInput
            placeholder="No. HP"
            label="No. HP"
            {...form.getInputProps("phone")}
          />
          <TextInput
            placeholder="Pekerjaan"
            label="Pekerjaan"
            {...form.getInputProps("job")}
          />
          <TextInput
            placeholder="Pengurusan Sertifikat"
            label="Mengajukan permohonan Keterangan Rencana Kota untuk keperluan"
            {...form.getInputProps("type")}
          />
          <Text size="sm">Koordinat</Text>
          <Group my="xs" spacing="sm" grow>
            <NumberInput
              placeholder="Garis bujur"
              {...form.getInputProps("latitude")}
            />
            <NumberInput
              placeholder="Garis lintang"
              {...form.getInputProps("longitude")}
            />
          </Group>
          <TextInput
            placeholder="Jalan"
            label="Jalan"
            {...form.getInputProps("street")}
          />
          <TextInput
            placeholder="RT/RW"
            label="RT/RW"
            {...form.getInputProps("neighbor")}
          />
          <TextInput
            placeholder="Kelurahan"
            label="Kelurahan"
            {...form.getInputProps("subdistrict")}
          />
          <TextInput
            placeholder="Kecamatan"
            label="Kecamatan"
            {...form.getInputProps("district")}
          />
          <Button mt="md" fullWidth type="submit">
            Tambah
          </Button>
        </Box>
        <Box>
          <FileButton onChange={onAddFile} accept={acceptedMimes}>
            {(props) => <Button {...props}>Pilih Berkas</Button>}
          </FileButton>
          {form.values.files.map(({ file }, i) => (
            <FileCard
              key={`${i}${file.lastModified}`}
              file={file}
              index={i}
              progress={0}
              uploading={false}
              // @ts-ignore
              formInstance={form}
            />
          ))}
        </Box>
      </Group>
    </Box>
  );
};

export default Form;
