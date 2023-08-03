import { IconRoute, TablerIconsProps } from "@tabler/icons-react";
import { FC, ReactElement, ReactNode } from "react";
import {
  Box,
  createStyles,
  Group,
  SpacingValue,
  SystemProp,
  Title,
} from "@mantine/core";
import FlexContainer from "./atoms/FlexContainer";

interface props {
  title?: string | ReactNode;
  children?: ReactNode;
  icon?: FC<TablerIconsProps>;
  h?: SystemProp<string | number>;
  p?: SystemProp<SpacingValue>;
}

const useStyles = createStyles(({ colors, spacing, colorScheme }) => ({
  flexContainer: {
    backgroundColor: colorScheme !== "dark" ? colors.gray[0] : colors.dark[6],
    position: "relative",
    zIndex: 50,
  },
  titleContainer: {
    backgroundColor: colorScheme !== "dark" ? colors.gray[0] : colors.dark[6],
    // background: fn.linearGradient(0, colors.dark[7], colors.dark[4]),
    height: 65,
    // borderRadius: radius.lg,
    alignSelf: "start",
    // width: "fit-content",
    paddingRight: spacing.sm,
    paddingLeft: spacing.xl,
  },
  textStyle: {
    color: colorScheme === "dark" ? colors.gray[2] : colors.dark[7],
  },
  container: {
    height: "calc(100% - 50px)",
    overflow: "auto",
  },
}));

const PageContainer: FC<props> = ({
  title,
  children,
  icon: Icon = IconRoute,
  h,
  p = "lg",
}): ReactElement => {
  const { classes } = useStyles();

  document.title = `Dashboard - ${title}`;

  return (
    <Box h={h}>
      <Box className={classes.flexContainer}>
        <FlexContainer
          alignItems="center"
          justifyContent="space-between"
          pr="lg"
        >
          <Group className={classes.titleContainer}>
            <Icon className={classes.textStyle} />
            <Title className={classes.textStyle} order={3}>
              {title ?? ""}
            </Title>
          </Group>
        </FlexContainer>
      </Box>
      <Box className={classes.container} p={p}>
        {children}
      </Box>
    </Box>
  );
};

export default PageContainer;
