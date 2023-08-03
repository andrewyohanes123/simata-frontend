import { FC, ReactElement } from "react";
import { Box, Group, Modal, Title } from "@mantine/core";
import { DocumentAttributes } from "types/global";
import { TextWithLabel } from "components";
import { useClient } from "hooks/useClient";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import AttachmentCard from "./AttachmentCard";
import { When } from "react-if";

interface props {
  selectedDoc: DocumentAttributes | null;
  onClose: VoidFunction;
  opened: boolean;
}

const DetailModal: FC<props> = ({
  opened,
  onClose,
  selectedDoc,
}): ReactElement => {
  const { client } = useClient();
  const attachments = useQuery({
    queryKey: ["attachments", selectedDoc?.id],
    queryFn: ({
      queryKey: [, documentId],
    }: QueryFunctionContext<[string, number | undefined]>) =>
      client.service("files").find({
        query: {
          type: "attachment",
          documentId,
        },
      }),
    enabled: selectedDoc !== null,
  });
  const results = useQuery({
    queryKey: ["results", selectedDoc?.id],
    queryFn: ({
      queryKey: [, documentId],
    }: QueryFunctionContext<[string, number | undefined]>) =>
      client.service("files").find({
        query: {
          type: "result",
          documentId,
        },
      }),
    enabled: selectedDoc !== null,
  });

  return (
    <Modal size="xl" title="Detail Dokumen" opened={opened} onClose={onClose}>
      <Group align="flex-start" grow>
        <Box>
          <TextWithLabel title="Nama" value={selectedDoc?.name} />
          <TextWithLabel title="Alamat" value={selectedDoc?.address} />
          <TextWithLabel title="No. HP" value={selectedDoc?.phone} />
          <TextWithLabel title="Pekerjaan" value={selectedDoc?.job} />
          <TextWithLabel
            title="Mengajukan permohonan untuk keperluan"
            value={selectedDoc?.type}
          />
          <TextWithLabel
            title="Koordinat"
            value={`${selectedDoc?.latitude}, ${selectedDoc?.longitude}`}
          />
          <TextWithLabel title="Jalan" value={selectedDoc?.street} />
          <TextWithLabel title="RT/RW" value={selectedDoc?.neighbor} />
          <TextWithLabel title="Kelurahan" value={selectedDoc?.subdistrict} />
          <TextWithLabel title="Kecamatan" value={selectedDoc?.district} />
        </Box>
        <Box>
          <When condition={selectedDoc?.verified}>
            <Title my="md" order={4}>
              Hasil
            </Title>
            {results.data?.data.map((result) => (
              <AttachmentCard
                file={result}
                key={`${result.id}${result.createdAt}`}
              />
            ))}
          </When>
          <Title mb="md" order={4}>
            Lampiran
          </Title>
          {attachments.data?.data.map((attachment) => (
            <AttachmentCard
              file={attachment}
              key={`${attachment.id}${attachment.createdAt}`}
            />
          ))}
        </Box>
      </Group>
    </Modal>
  );
};

export default DetailModal;
