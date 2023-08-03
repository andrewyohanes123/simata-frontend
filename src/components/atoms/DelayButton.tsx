import { FC, ReactElement } from "react";
import {
  UnstyledButton,
  createStyles,
  DefaultMantineColor,
  UnstyledButtonProps,
  Loader,
  Box,
  Text,
} from "@mantine/core";
import { PolymorphicComponentProps } from "@mantine/utils";
import { When } from "react-if";

interface props
  extends PolymorphicComponentProps<"button", UnstyledButtonProps> {
  color?: DefaultMantineColor;
  label?: string;
  loading?: boolean;
}

interface styleProps {
  color?: DefaultMantineColor;
}

const useStyles = createStyles((theme, { color = "yellow" }: styleProps) => ({
  button: {
    ":disabled": {
      background: theme.colors.gray[5],
      border: `1px solid ${theme.colors["gray"][4]}`,
      ":hover": {
        background: theme.colors.gray[5],
        border: `1px solid ${theme.colors["gray"][4]}`,
        cursor: "not-allowed",
      },
    },
    background: theme.colors[color][5],
    border: `1px solid ${theme.colors[color][4]}`,
    color: "white",
    padding: `${theme.spacing.xl}px ${theme.spacing.lg}px`,
    borderRadius: theme.radius.lg,
    width: "100%",
    margin: `${theme.spacing.lg}px 0`,
    ":hover": {
      background: theme.colors[color][4],
      border: `1px solid ${theme.colors[color][5]}`,
    },
    ":focus": {
      background: theme.colors[color][6],
    },
    ":active": {
      background: theme.colors[color][6],
    },
    display: "flex",
    alignItems: "center",
  },
  buttonTitle: {
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      // Type safe child reference in nested selectors via ref
      fontSize: theme.fontSizes.lg,
    },
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      // Type safe child reference in nested selectors via ref
      fontSize: theme.fontSizes.xl,
    },
    [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
      // Type safe child reference in nested selectors via ref
      fontSize: theme.fontSizes.xl,
    },
    fontWeight: "bolder",
  },
}));

const DelayButton: FC<props> = ({
  color,
  label,
  loading = false,
  ...rest
}): ReactElement => {
  const { classes } = useStyles({ color });
  return (
    <UnstyledButton {...rest} className={classes.button}>
      <When condition={loading}>
        <Box sx={{ flex: 0 }}>
          <Loader size="lg" color="gray" />
        </Box>
      </When>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text align="center" color="white" className={classes.buttonTitle}>
          {label}
        </Text>
      </Box>
    </UnstyledButton>
  );
};

export default DelayButton;
