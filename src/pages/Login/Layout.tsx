import { FC, ReactElement, useCallback } from "react";
import {
  createStyles,
  Box,
  Center,
  TextInput,
  Button,
  PasswordInput,
  Divider,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as yup from "yup";
import { useAuth } from "hooks";
import { Link, Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AuthenticationResult } from "@feathersjs/authentication/lib";
import { IconChevronLeft } from "@tabler/icons-react";

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
    textDecoration: "none",
    color: theme.colors.pink[5],
    display: "block",
    ":hover": {
      color: theme.colors.pink[6],
    },
  },
}));

const validation = yupResolver(
  yup.object().shape({
    username: yup.string().required("Masukkan username"),
    password: yup.string().required("Masukkan password"),
  })
);

const initialValues = {
  username: "",
  password: "",
};

const Layout: FC = (): ReactElement => {
  const { classes } = useStyles();
  const form = useForm({
    initialValues,
    validate: validation,
  });
  const { authenticate, isLoggedIn } = useAuth();
  const loginMutation = useMutation({
    mutationFn: (val: typeof initialValues) => {
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
    },
  });

  const login = useCallback(
    (val: typeof initialValues) => {
      loginMutation.mutate(val);
    },
    [loginMutation]
  );

  if (isLoggedIn) return <Navigate to="/dashboard" />;

  return (
    <>
      <Center className={classes.loginContainer}>
        <Center className={classes.formContainer}>
          <Box component="form" onSubmit={form.onSubmit(login)} w="100%">
            <Button
              component={Link}
              leftIcon={<IconChevronLeft />}
              // className={classes.link}
              to="/"
              type="button"
              variant="subtle"
            >
              Kembali ke Peta
            </Button>
            <Divider my="md" />
            <TextInput
              label="Username"
              {...form.getInputProps("username")}
              placeholder="Username"
              disabled={loginMutation.isLoading}
            />
            <PasswordInput
              label="Password"
              {...form.getInputProps("password")}
              placeholder="Password"
              disabled={loginMutation.isLoading}
            />
            <Link className={classes.link} to="/daftar">
              Belum Punya Pengguna? Silakan Daftar
            </Link>
            <Button
              loading={loginMutation.isLoading}
              mt="md"
              type="submit"
              fullWidth
            >
              Login
            </Button>
          </Box>
        </Center>
      </Center>
    </>
  );
};

export default Layout;
