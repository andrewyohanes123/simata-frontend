/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FlexContainer, PageContainer, SearchBar } from "components";
import { IconEdit, IconTrash, IconUser } from "@tabler/icons-react";
import { FC, ReactElement, useCallback, useMemo, useState } from "react";
import { ActionIcon, Button, Group, Text, Tooltip } from "@mantine/core";
import { useClient } from "hooks/useClient";
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { FindResult, UserAttributes } from "types/global";
import Table, { IColumnsProps } from "components/Table";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useSearchWithQueryParam } from "hooks/useSearchWtihQueryParam";
import { likeClause } from "consts";

const $limit = 20;

const Layout: FC = (): ReactElement => {
  const { client } = useClient();
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [page, setPage] = useState<number>(1);
  const [, searchValue] = useSearchWithQueryParam("mama");
  const users = useQuery({
    queryKey: ["users", page, searchValue],
    queryFn: ({
      queryKey: [, page, searchValue],
    }: QueryFunctionContext<[string, number, string | number | null]>) => {
      const $skip = (page - 1) * $limit;
      const data: Promise<FindResult<UserAttributes>> = client
        .service("users")
        .find({
          query: {
            $limit,
            $skip,
            name: {
              [likeClause]: `%${searchValue ?? ""}%`,
            },
          },
        });

      return data;
    },
  });
  const [selectedUser, setSelectedUser] = useState<UserAttributes | null>(null);
  const deleteUser = useMutation({
    mutationFn: (id: number) => {
      const data: Promise<UserAttributes> = client.service("users").remove(id);

      return data;
    },
  });

  const onDeleteUser = useCallback(
    (user: UserAttributes) => {
      openConfirmModal({
        title: `Hapus ${user.name}?`,
        children: (
          <>
            <Text>Apakah Anda ingin menghapus {user.name}?</Text>
          </>
        ),
        labels: { confirm: "Hapus", cancel: "Batal" },
        confirmProps: { color: "red" },
        onConfirm() {
          deleteUser.mutate(user.id!, {
            onSuccess(data) {
              showNotification({
                title: "Pengguna berhasil dihapus",
                message: `Pengguna ${data.name} berhasil dihapus`,
                color: "red",
              });
              users.refetch();
              deleteUser.reset();
            },
          });
        },
      });
    },
    [deleteUser, users]
  );

  const columns = useMemo<IColumnsProps<UserAttributes>[]>(
    () => [
      {
        title: "Nama Pengguna",
        key: "name",
        dataIndex: "name",
      },
      {
        title: "Username",
        key: "username",
        dataIndex: "username",
      },
      {
        title: "Edit | Hapus",
        key: "action",
        render: (_, row) => (
          <Group>
            <Tooltip label={`Edit ${row.name}`}>
              <ActionIcon
                onClick={() => {
                  setModal("edit");
                  setSelectedUser(row);
                }}
                color="orange"
              >
                <IconEdit />
              </ActionIcon>
            </Tooltip>
            <Tooltip label={`Hapus ${row.name}?`}>
              <ActionIcon
                loading={
                  deleteUser.isLoading && deleteUser.variables === row.id
                }
                onClick={() => onDeleteUser(row)}
                color="red"
              >
                <IconTrash />
              </ActionIcon>
            </Tooltip>
          </Group>
        ),
      },
    ],
    [deleteUser.isLoading, deleteUser.variables, onDeleteUser]
  );

  return (
    <PageContainer title="Pengguna" icon={IconUser}>
      <FlexContainer justifyContent="space-between">
        <Button onClick={() => setModal("add")} color="green">
          Tambah Pengguna
        </Button>
        <SearchBar keyword="nama" />
      </FlexContainer>
      <Table
        loading={users.isLoading}
        hoverable
        keyExtractor={(data) => `key-${data.id}-${data.name}`}
        data={users.data?.data ?? []}
        columns={columns}
        mt="md"
        border
        pagination={{
          page,
          onChange: setPage,
          limit: $limit,
          totalData: users.data?.total ?? 0,
        }}
      />
      <AddModal opened={modal === "add"} onClose={() => setModal(null)} />
      <EditModal
        user={selectedUser}
        onClose={() => setModal(null)}
        opened={modal === "edit" && selectedUser !== null}
      />
    </PageContainer>
  );
};

export default Layout;
