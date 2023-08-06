import { FC, ReactElement, useCallback, useMemo } from "react";
import {
  ActionIcon,
  Box,
  Button,
  Group,
  NumberInput,
  Tooltip,
  createStyles,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { When } from "react-if";
import { useSearchParams } from "react-router-dom";
import { useForm, yupResolver } from "@mantine/form";
import { object, number } from "yup";

const useStyles = createStyles((theme) => ({
  container: {
    padding: theme.spacing.sm,
    borderRadius: theme.radius.md,
    position: "absolute",
    zIndex: 300,
    background: theme.fn.rgba(theme.white, 0.75),
    backdropFilter: "blur(10px)",
    top: 10,
    left: 10,
    border: `1px solid ${theme.fn.rgba(theme.colors.gray[0], 0.2)}`,
    boxShadow: theme.shadows.md,
  },
}));

const initialValues = {
  latitude: 0,
  longitude: 0,
};

const validate = yupResolver(
  object().shape({
    latitude: number()
      .min(-90, "Masukkan garis lintang yang valid")
      .max(90, "Masukkan garis lintang yang valid")
      .required("masukkan garis lintang"),
    longitude: number()
      .min(-180, "Masukkan garis bujur yang valid")
      .max(180, "Masukkan garis bujur yang valid")
      .required("masukkan garis bujur"),
  })
);

const SearchCoordinate: FC = (): ReactElement => {
  const { classes } = useStyles();
  const [search, { toggle }] = useDisclosure();
  const [searchParams, setSearchParams] = useSearchParams();
  const form = useForm({ initialValues, validate });

  const onSubmit = useCallback(
    (val: typeof initialValues) => {
      searchParams.set("latitude", val.latitude.toString());
      searchParams.set("longitude", val.longitude.toString());
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const resetSearch = useCallback(() => {
    searchParams.delete("latitude");
    searchParams.delete("longitude");
    setSearchParams(searchParams);
    form.reset();
  }, [form, searchParams, setSearchParams]);

  const latitude = useMemo(
    () => parseFloat(searchParams.get("latitude") ?? "0"),
    [searchParams]
  );
  const longitude = useMemo(
    () => parseFloat(searchParams.get("longitude") ?? "0"),
    [searchParams]
  );

  return (
    <Box className={classes.container}>
      <Tooltip label="Cari koordinat" position="right">
        <ActionIcon onClick={toggle} color="pink" variant="light">
          <IconSearch />
        </ActionIcon>
      </Tooltip>
      <When condition={search}>
        <Box onSubmit={form.onSubmit(onSubmit)} component="form">
          <Group mt="sm">
            <NumberInput
              {...form.getInputProps("latitude")}
              min={-90}
              max={90}
              placeholder="Masukkan garis lintang"
              //    1.4251709897367086
              step={0.0000000000000001}
              precision={18}
              defaultValue={latitude}
            />
            <NumberInput
              {...form.getInputProps("longitude")}
              min={-180}
              max={180}
              placeholder="Masukkan garis bujur"
              step={0.0000000000000001}
              precision={18}
              defaultValue={longitude}
            />
          </Group>
          <Group mt="sm">
            <Button type="submit">Cari</Button>
            <Button onClick={resetSearch} variant="light" color="blue">
              Reset Pencarian
            </Button>
          </Group>
        </Box>
      </When>
    </Box>
  );
};

export default SearchCoordinate;
