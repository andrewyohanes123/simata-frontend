import { FC, ReactElement, useCallback } from "react";
import {
  ActionIcon,
  Badge,
  Card,
  Group,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { DocumentAttributes } from "types/global";
import {
  IconCheck,
  IconInfoSmall,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";
import { When } from "react-if";
import { useAuth } from "hooks";
import { useClient } from "hooks/useClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "@mantine/notifications";
import { openConfirmModal } from "@mantine/modals";

interface props {
  doc: DocumentAttributes;
  onDetailClick?: (doc: DocumentAttributes) => void;
  onVerify?: (doc: DocumentAttributes) => void;
}

const DocumentCard: FC<props> = ({
  doc,
  onDetailClick,
  onVerify,
}): ReactElement => {
  const { account } = useAuth();
  const { client } = useClient();
  const queryClient = useQueryClient();
  const deleteDocument = useMutation({
    mutationFn: () => client.service("documents").remove(doc.id ?? null),
    onSuccess: (data) => {
      showNotification({
        title: "Dokumen dihapus",
        message: `Dokumen ${data.name} berhasil dihapus`,
      });
      queryClient.invalidateQueries(["documents"]);
    },
  });

  const verifyDocument = useCallback(() => {
    onVerify?.(doc);
  }, [doc, onVerify]);

  const onClickedDetail = useCallback(() => {
    onDetailClick?.(doc);
  }, [doc, onDetailClick]);

  const confirmDelete = useCallback(() => {
    openConfirmModal({
      title: "Hapus dokumen?",
      children: `Apakah Anda ingin menghapus dokumen atas nama ${doc.name}?`,
      labels: {
        cancel: "Batal",
        confirm: "Hapus",
      },
      onConfirm: () => deleteDocument.mutate(),
      confirmProps: { color: "red" },
    });
  }, [deleteDocument, doc.name]);

  return (
    <Card withBorder my="xs">
      <Title order={4}>{doc.name}</Title>
      <Text color="dimmed" size="sm">
        {doc.address}
      </Text>
      <Group my="xs" spacing="xs">
        <IconUser />
        <Text size="sm">{doc.user?.name ?? '-'}</Text>
      </Group>
      <Badge my="xs" color={doc.verified ? "green" : "blue"}>
        {doc.verified ? "Terverifikasi" : "Belum Terverifikasi"}
      </Badge>
      <Group mt="md">
        <Tooltip label="Detail">
          <ActionIcon onClick={onClickedDetail} variant="light" color="blue">
            <IconInfoSmall />
          </ActionIcon>
        </Tooltip>
        <When condition={account?.type === "administrator" && !doc.verified}>
          <Tooltip label="Verifikasi">
            <ActionIcon onClick={verifyDocument} variant="filled" color="green">
              <IconCheck />
            </ActionIcon>
          </Tooltip>
        </When>
        <Tooltip label="Hapus">
          <ActionIcon onClick={confirmDelete} color="red">
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Card>
  );
};

export default DocumentCard;
