import { FC, ReactElement, useCallback, useEffect } from "react";
import { Modal, TextInput, PasswordInput, Button } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as yup from "yup";
import { useClient } from "hooks/useClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserAttributes } from "types/global";
import { showNotification } from "@mantine/notifications";

interface props {
  opened: boolean;
  onClose: () => void;
  user: UserAttributes | null;
}

const initialValues = {
  name: "",
  username: "",
};

const validate = yupResolver(
  yup.object().shape({
    name: yup.string().required("Masukkan nama pengguna"),
    username: yup.string().required("Masukkan username"),
  })
);

const EditModal: FC<props> = ({ opened, onClose, user }): ReactElement => {
  const form = useForm({ initialValues, validate });
  const { setFieldValue } = form;
  const { client } = useClient();
  const queryClient = useQueryClient();
  const updateUser = useMutation({
    mutationFn: (val: typeof initialValues) => {
      const data: Promise<UserAttributes> = client
        .service("users")
        .patch(user?.id ?? null, val);

      return data;
    },
  });

  useEffect(() => {
    if (user !== null) {
      setFieldValue("name", user.name);
      setFieldValue("username", user.username);
    }
  }, [setFieldValue, user]);

  const onFinish = useCallback(
    (val: typeof initialValues) => {
      updateUser.mutate(val, {
        onSuccess: (data) => {
          form.reset();
          updateUser.reset();
          queryClient.invalidateQueries(["users"]);
          showNotification({
            title: "Data berhasil disimpan",
            message: `Pengguna ${data.name} berhasil disimpan`,
          });
          onClose();
        },
      });
    },
    [updateUser, form, onClose, queryClient]
  );

  return (
    <Modal title="Tambah Pengguna" opened={opened} onClose={onClose}>
      <form onSubmit={form.onSubmit(onFinish)}>
        <TextInput
          placeholder="Nama"
          label="Nama"
          {...form.getInputProps("name")}
          disabled={updateUser.isLoading}
        />
        <TextInput
          placeholder="Username"
          label="Username"
          {...form.getInputProps("username")}
          disabled={updateUser.isLoading}
        />
        <PasswordInput
          placeholder="Password"
          label="Password"
          {...form.getInputProps("password")}
          disabled={updateUser.isLoading}
        />
        <Button
          fullWidth
          mt="md"
          disabled={updateUser.isLoading}
          loading={updateUser.isLoading}
          color="green"
          type="submit"
        >
          Simpan
        </Button>
      </form>
    </Modal>
  );
};

export default EditModal;
