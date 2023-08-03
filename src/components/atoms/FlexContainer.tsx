import { createStyles, MantineSize } from "@mantine/core";
import { CSSProperties, FC, ReactElement, ReactNode } from "react";

const useStyles = createStyles(({ spacing }, props: props) => {
  const isString = (val?: MantineSize): boolean => typeof val === "string";
  const isUndefined = (val?: MantineSize): boolean =>
    typeof val === "undefined";
  const fn = (
    prop: keyof Pick<
      props,
      | "m"
      | "mb"
      | "ml"
      | "p"
      | "mr"
      | "mt"
      | "mx"
      | "px"
      | "my"
      | "pb"
      | "pl"
      | "pr"
      | "pt"
      | "py"
    >
  ) => {
    return isUndefined(props[prop])
      ? undefined
      : isString(props[prop])
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ? spacing[props[prop]!]
      : props[prop];
  };

  const marginTop = fn("mt");
  const margin = fn("m");
  const marginX = fn("mx");
  const marginY = fn("my");
  const marginBottom = fn("mb");
  const marginLeft = fn("ml");
  const marginRight = fn("mr");
  const paddingTop = fn("pt");
  const paddingbottom = fn("pb");
  const padding = fn("p");
  const paddingLeft = fn("pl");
  const paddingRight = fn("pr");
  const paddingX = fn("px");
  const paddingY = fn("py");

  return {
    container: {
      display: "flex",
      justifyContent: props.justifyContent,
      alignItems: props.alignItems,
      padding,
      margin,
      marginLeft: marginLeft || marginX,
      marginRight: marginRight || marginX,
      marginTop: marginTop || marginY,
      marginBottom: marginBottom || marginY,
      paddingLeft: paddingLeft || paddingX,
      paddingRight: paddingRight || paddingX,
      paddingTop: paddingTop || paddingY,
      paddingBottom: paddingbottom || paddingY,
      gap: props.spacing,
      flex: props.flex,
    },
  };
});

// type TSpacing = MantineSizes | number;

interface props extends Pick<CSSProperties, "justifyContent" | "alignItems"> {
  p?: MantineSize;
  px?: MantineSize;
  py?: MantineSize;
  my?: MantineSize;
  mx?: MantineSize;
  m?: MantineSize;
  mt?: MantineSize;
  mb?: MantineSize;
  ml?: MantineSize;
  mr?: MantineSize;
  pt?: MantineSize;
  pb?: MantineSize;
  pr?: MantineSize;
  pl?: MantineSize;
  children?: ReactNode;
  spacing?: number;
  flex?: number;
  className?: string;
}

const FlexContainer: FC<props> = (props): ReactElement => {
  const { classes, cx } = useStyles(props);
  return (
    <div className={cx(classes.container, props.className)}>
      {props.children}
    </div>
  );
};

export default FlexContainer;
