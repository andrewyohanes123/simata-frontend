import { FC, ReactElement, useCallback } from "react";
import {
  Box,
  Container,
  TextInput,
  PasswordInput,
  Button,
  createStyles,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useClient } from "hooks/useClient";
import * as yup from "yup";
import { ExcludeAttributes, UserAttributes } from "types/global";
import { useMutation } from "@tanstack/react-query";
import { AuthenticationResult } from "@feathersjs/authentication";
import { useAuth } from "hooks";
import { showNotification } from "@mantine/notifications";
import { Link, useNavigate } from "react-router-dom";

export type UserFormValue = ExcludeAttributes<
  UserAttributes,
  "createdAt" | "updatedAt" | "id"
> & {
  password_confirmation: string;
};

const initialValues: UserFormValue = {
  name: "",
  password: "",
  type: "public",
  username: "",
  password_confirmation: "",
};

const validate = yupResolver(
  yup.object().shape({
    name: yup.string().required("Masukkan nama"),
    username: yup.string().required("Masukkan username"),
    password: yup.string().required("Masukkan password"),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password")], "Password yang dimasukkan tidak sama")
      .required("Masukkan konfirmasi password"),
  })
);

const useStyles = createStyles((theme) => ({
  loginContainer: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    height: "100%",
  },
  link: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
    textDecoration: "none",
    color: theme.colors.pink[5],
    display: "block",
    ":hover": {
      color: theme.colors.pink[6],
    },
  },
}));

const Layout: FC = (): ReactElement => {
  const { client } = useClient();
  const form = useForm({ initialValues, validate });
  const { authenticate } = useAuth();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const loginMutation = useMutation({
    mutationFn: (val: { username: string; password: string }) => {
      const data: Promise<AuthenticationResult> = authenticate(val, {
        strategy: "local",
      });
      return data;
    },
    onError(error) {
      console.log({ error });
    },
    onSuccess(data) {
      console.log({ data });
      navigate("/dashboard");
    },
  });
  const registerUser = useMutation({
    mutationFn: (val: UserFormValue) => {
      const data: Promise<UserAttributes> = client.service("users").create(val);
      return data;
    },
    onSuccess: (data, variable) => {
      loginMutation.mutate({
        username: variable.username,
        password: variable.password,
      });
      showNotification({
        title: `Daftar berhasil`,
        message: `Selamat datang, ${data.name}!`,
      });
    },
  });

  const onFinish = useCallback(
    (val: UserFormValue) => {
      registerUser.mutate(val);
    },
    [registerUser]
  );

  return (
    <Container my="xl" py="xl">
      <Link className={classes.link} to="/">
        Kembali
      </Link>
      <Box onSubmit={form.onSubmit(onFinish)} component="form">
        <TextInput
          placeholder="Nama"
          label="Nama"
          {...form.getInputProps("name")}
        />
        <TextInput
          placeholder="Username"
          label="Username"
          {...form.getInputProps("username")}
        />
        <PasswordInput
          placeholder="Password"
          label="Password"
          {...form.getInputProps("password")}
        />
        <PasswordInput
          placeholder="Konfirmasi Password"
          label="Konfirmasi Password"
          {...form.getInputProps("password_confirmation")}
        />
        <Button
          loading={registerUser.isLoading}
          type="submit"
          mt="md"
          fullWidth
        >
          Daftar
        </Button>
      </Box>
    </Container>
  );
};

export default Layout;
