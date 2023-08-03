/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ReactElement,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  createStyles,
  Table as MantineTable,
  UnstyledButton,
  Group,
  Text,
  Center,
  Box,
  Loader,
  useMantineTheme,
  Title,
  Card,
  CardProps,
  Pagination,
  ScrollArea,
  ActionIcon,
  NumberInput,
  NumberInputHandlers,
  DefaultMantineColor,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconInbox,
} from "@tabler/icons-react";
import { Else, If, Then } from "react-if";

const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
    background:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[1],
    whiteSpace: "break-spaces",
  },

  control: {
    // width: "100%",
    padding: `${theme.spacing.md} ${theme.spacing.md}`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
    background: theme.colors.gray[1],
    alignSelf: "stretch",
  },

  thead: {
    // width: "100%",
    padding: `${theme.spacing.md} ${theme.spacing.md}`,
    background:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[1],
    alignSelf: "stretch",
    whiteSpace: "break-spaces",
  },

  fixedLeft: {
    position: "sticky",
    left: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
    },
  },

  fixedRight: {
    position: "sticky",
    right: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
    },
  },

  theadFixedLeft: {
    position: "sticky",
    left: 0,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[1],
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
    },
  },

  theadFixedRight: {
    position: "sticky",
    right: 0,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[1],
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
    },
  },

  fixedTableShadow: {
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
    },
    boxShadow: "17px 0px 37px 3px rgba(0,0,0,0.51)",
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

export interface IColumnsProps<T = any> {
  title: ReactNode;
  key: string;
  dataIndex?: keyof T | string;
  render?: (
    val: string | number | boolean | T,
    data: T,
    index: number
  ) => ReactNode;
  sort?: boolean;
  width?: number;
  fixed?: "left" | "right";
}

export interface IPaginationConfig {
  page: number;
  onChange: (page: number) => void;
  totalData: number;
  limit: number;
  onLimitChange?: (limit: number) => void;
  showLimitChange?: boolean;
}

interface TableSortProps<T = any>
  extends Pick<CardProps, "mb" | "m" | "mt" | "mr" | "ml"> {
  data: T[];
  columns: IColumnsProps<T>[];
  keyExtractor?: (data: T) => string;
  border?: boolean;
  loading?: boolean;
  pagination?: null | IPaginationConfig;
  hoverable?: boolean;
  rowColor?: (data: T) => DefaultMantineColor;
}

interface ThProps {
  children: React.ReactNode;
  reversed?: boolean;
  sorted?: boolean;
  onSort?: () => void;
  enableSort?: boolean;
  width?: number;
  fixed?: "left" | "right";
  scrolled?: boolean;
}

function Th({
  children,
  reversed,
  sorted,
  onSort,
  enableSort = false,
  width,
  fixed,
  scrolled = false,
}: ThProps) {
  const { classes, cx } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Box
      component="th"
      sx={{ width: width }}
      className={cx(classes.th, {
        [classes.theadFixedLeft]: fixed === "left",
        [classes.theadFixedRight]: fixed === "right",
        [classes.fixedTableShadow]: scrolled && fixed === "left",
      })}
    >
      <If condition={enableSort}>
        <Then>
          <UnstyledButton onClick={onSort} className={classes.control}>
            <Group position="apart">
              <Text weight={800} size="sm">
                {children}
              </Text>
              <Center className={classes.icon}>
                <Icon size={14} stroke={1.5} />
              </Center>
            </Group>
          </UnstyledButton>
        </Then>
        <Else>
          <Box className={classes.thead}>
            <Group position="apart">
              <Text weight={800} size="sm">
                {children}
              </Text>
            </Group>
          </Box>
        </Else>
      </If>
    </Box>
  );
}

const Table = <T,>({
  data,
  columns,
  keyExtractor,
  loading = false,
  border = false,
  pagination = null,
  hoverable = false,
  rowColor,
  ...cardProps
}: TableSortProps<T>): ReactElement => {
  const { colors } = useMantineTheme();
  const [verticallyScrolled, toggleVerticallyScrolled] =
    useState<boolean>(false);
  const renderColumns = useMemo(
    () =>
      columns.map((col) => (
        <Th
          fixed={col.fixed}
          width={col.width}
          enableSort={col.sort}
          key={col.key}
          scrolled={verticallyScrolled}
        >
          {col.title}
        </Th>
      )),
    [columns, verticallyScrolled]
  );
  const boxContainer = useRef<HTMLDivElement>(null);
  const { classes, cx, theme } = useStyles();
  const limitInputRef = useRef<NumberInputHandlers>();

  const renderData = useMemo(() => {
    return data.map((data, index) => {
      const key = keyExtractor?.(data);
      const rowCol = rowColor?.(data);
      return (
        <Box
          component="tr"
          sx={{
            backgroundColor:
              typeof rowCol !== "undefined" ? colors[rowCol][6] : undefined,
          }}
          key={`table-row-key-${key ?? index}`}
        >
          {columns.map((col) => {
            return (
              <Box
                component="td"
                sx={{
                  width: col.width,
                  whiteSpace: "break-spaces",
                }}
                key={`table-row-data-${col.key}`}
                className={cx({
                  [classes.fixedLeft]: col.fixed === "left",
                  [classes.fixedRight]: col.fixed === "right",
                  [classes.fixedTableShadow]:
                    col.fixed === "left" && verticallyScrolled,
                })}
              >
                {typeof col.dataIndex !== "undefined" ? (
                  // @ts-ignore
                  <Text>{data[col?.dataIndex]}</Text>
                ) : (
                  // @ts-ignore
                  col.render?.(
                    typeof col.dataIndex !== "undefined"
                      ? data[col!.dataIndex!]
                      : data,
                    data,
                    index
                  )
                )}
              </Box>
            );
          })}
        </Box>
      );
    });
  }, [
    classes.fixedLeft,
    classes.fixedRight,
    classes.fixedTableShadow,
    colors,
    columns,
    cx,
    data,
    keyExtractor,
    rowColor,
    verticallyScrolled,
  ]);

  const totalPage = useMemo(() => {
    const totalData = pagination?.totalData ?? data.length;
    const total = Math.ceil(totalData / (pagination?.limit ?? 10));

    return total;
  }, [data.length, pagination?.limit, pagination?.totalData]);

  const onScroll = useCallback(({ x }: { x: number; y: number }) => {
    toggleVerticallyScrolled(x > 0);
  }, []);

  return (
    <div>
      <Box w="100%" ref={boxContainer} sx={{ overflow: "hidden" }}>
        <Card
          {...cardProps}
          radius="md"
          p={0}
          withBorder={border}
          component={ScrollArea}
          onScrollPositionChange={onScroll}
        >
          <MantineTable
            horizontalSpacing="md"
            verticalSpacing="sm"
            withColumnBorders={border}
            sx={{
              tableLayout: "auto",
              minWidth: `calc((${boxContainer.current?.clientWidth ?? 0}px) - ${
                theme.spacing.xs
              })`,
            }}
            highlightOnHover={hoverable}
          >
            <thead>
              <tr>{renderColumns}</tr>
            </thead>
            <If condition={loading}>
              <Then>
                <tbody>
                  <tr>
                    <td colSpan={columns.length}>
                      <Center p="lg">
                        <Loader size="lg" />
                      </Center>
                    </td>
                  </tr>
                </tbody>
              </Then>
              <Else>
                <If condition={data.length > 0}>
                  <Then>
                    <tbody>{renderData}</tbody>
                  </Then>
                  <Else>
                    <tbody>
                      <tr>
                        <td colSpan={columns.length}>
                          <Center sx={{ flexDirection: "column" }} p="lg">
                            <IconInbox
                              size={80}
                              stroke={1}
                              color={colors.dark[3]}
                            />
                            <Title order={5} mt="md" align="center">
                              Tidak ada data
                            </Title>
                          </Center>
                        </td>
                      </tr>
                    </tbody>
                  </Else>
                </If>
              </Else>
            </If>
          </MantineTable>
        </Card>
      </Box>
      {pagination !== null && (
        <Group mt="md" align="center" grow>
          <Pagination
            value={pagination?.page ?? 1}
            onChange={pagination?.onChange}
            total={totalPage}
            sx={{ flex: 1 }}
          />
          {pagination.showLimitChange && pagination.totalData > 0 && (
            <Group sx={{ justifyContent: "flex-end" }}>
              <ActionIcon
                onClick={() => limitInputRef.current?.decrement()}
                size="lg"
                variant="default"
              >
                –
              </ActionIcon>
              <NumberInput
                hideControls
                min={5}
                step={5}
                variant="filled"
                handlersRef={limitInputRef}
                styles={{ input: { width: 54, textAlign: "center" } }}
                value={pagination.limit}
                onChange={pagination.onLimitChange}
              />
              <ActionIcon
                onClick={() => limitInputRef.current?.increment()}
                size="lg"
                variant="default"
              >
                +
              </ActionIcon>
            </Group>
          )}
        </Group>
      )}
    </div>
  );
};

export default Table;
