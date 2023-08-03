import { Group, Text } from "@mantine/core";
import {
  ComponentPropsWithoutRef,
  forwardRef,
  ForwardRefExoticComponent,
} from "react";

interface ItemProps extends ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  description: string | number;
  ["data-selected"]: boolean;
}

export const SelectItemWithDescription: ForwardRefExoticComponent<
  ItemProps & React.RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);
