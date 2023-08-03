import { FC, ReactElement, useCallback } from "react";
import { Modal, TextInput, PasswordInput, Button } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as yup from "yup";
import { useClient } from "hooks/useClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserAttributes } from "types/global";

interface props {
  opened: boolean;
  onClose: () => void;
}

const initialValues = {
  name: "",
  username: "",
  password: "",
};

const validate = yupResolver(
  yup.object().shape({
    name: yup.string().required("Masukkan nama pengguna"),
    username: yup.string().required("Masukkan username"),
    password: yup.string().required("Masukkan password"),
  })
);

const AddModal: FC<props> = ({ opened, onClose }): ReactElement => {
  const form = useForm({ initialValues, validate });
  const { client } = useClient();
  const queryClient = useQueryClient();
  const createUser = useMutation({
    mutationFn: (val: typeof initialValues) => {
      const data: Promise<UserAttributes> = client.service("users").create(val);

      return data;
    },
  });

  const onFinish = useCallback(
    (val: typeof initialValues) => {
      createUser.mutate(val, {
        onSuccess: () => {
          form.reset();
          createUser.reset();
          queryClient.invalidateQueries(["users"]);
          onClose();
        },
      });
    },
    [createUser, form, onClose, queryClient]
  );

  return (
    <Modal title="Tambah Pengguna" opened={opened} onClose={onClose}>
      <form onSubmit={form.onSubmit(onFinish)}>
        <TextInput
          placeholder="Nama"
          label="Nama"
          {...form.getInputProps("name")}
          disabled={createUser.isLoading}
        />
        <TextInput
          placeholder="Username"
          label="Username"
          {...form.getInputProps("username")}
          disabled={createUser.isLoading}
        />
        <PasswordInput
          placeholder="Password"
          label="Password"
          {...form.getInputProps("password")}
          disabled={createUser.isLoading}
        />
        <Button
          fullWidth
          mt="md"
          disabled={createUser.isLoading}
          loading={createUser.isLoading}
          color="green"
          type="submit"
        >
          Tambah Pengguna
        </Button>
      </form>
    </Modal>
  );
};

export default AddModal;
