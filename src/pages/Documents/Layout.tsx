import { Box, Button, Pagination, SimpleGrid, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFile } from "@tabler/icons-react";
import { PageContainer } from "components";
import { FC, ReactElement, useCallback, useMemo, useState } from "react";
import AddModal from "./AddModal";
import { useClient } from "hooks/useClient";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { useAuth } from "hooks";
import DocumentCard from "./DocumentCard";
import { When } from "react-if";
import { DocumentAttributes } from "types/global";
import DetailModal from "./DetailModal";
import UploadDocumentResult from "./UploadDocumentResult";

const $limit = 12;

const Layout: FC = (): ReactElement => {
  const [modal, { open, close }] = useDisclosure();
  const [detailModal, { open: openDetailModal, close: closeDetailModal }] =
    useDisclosure();
  const [uploadResult, { open: openUploadResult, close: closeUploadResult }] =
    useDisclosure();
  const [selectedDocument, setSelectedDocument] =
    useState<DocumentAttributes | null>(null);
  const { client } = useClient();
  const { account } = useAuth();
  const [page, setPage] = useState<number>(1);
  const documents = useQuery({
    queryKey: ["documents", page],
    queryFn: ({ queryKey: [, page] }: QueryFunctionContext<[string, number]>) =>
      client.service("documents").find({
        query: {
          userId: account?.type === "public" ? account.id : undefined,
          $limit,
          $skip: (page - 1) * $limit,
          $sort: {
            createdAt: 1,
          },
        },
      }),
  });

  const totalPage = useMemo(() => {
    if (typeof documents.data?.total !== "undefined") {
      return Math.ceil(documents.data.total / $limit);
    }

    return 0;
  }, [documents.data?.total]);

  const openDetail = useCallback(
    (doc: DocumentAttributes) => {
      setSelectedDocument(doc);
      openDetailModal();
    },
    [openDetailModal]
  );

  const openUploadResultModal = useCallback(
    (doc: DocumentAttributes) => {
      setSelectedDocument(doc);
      openUploadResult();
    },
    [openUploadResult]
  );

  return (
    <PageContainer title="Dokumen" icon={IconFile}>
      <Button onClick={open}>Tambah Dokumen</Button>
      <When condition={documents.data?.data.length === 0}>
        <Box my="lg" py="xl">
          <Text my="lg" align="center">
            Tidak ada data
          </Text>
        </Box>
      </When>
      <SimpleGrid cols={3} verticalSpacing={0} spacing="xs">
        {documents.data?.data.map((doc) => (
          <DocumentCard
            doc={doc}
            key={`${doc.createdAt}${doc.name}${doc.id}`}
            onDetailClick={openDetail}
            onVerify={openUploadResultModal}
          />
        ))}
      </SimpleGrid>
      {typeof documents.data !== "undefined" && (
        <Pagination mt="lg" value={page} onChange={setPage} total={totalPage} />
      )}
      <AddModal opened={modal} onClose={close} />
      <DetailModal
        selectedDoc={selectedDocument}
        opened={detailModal}
        onClose={closeDetailModal}
      />
      <UploadDocumentResult
        selectedDocument={selectedDocument}
        onClose={closeUploadResult}
        opened={uploadResult}
      />
    </PageContainer>
  );
};

export default Layout;
