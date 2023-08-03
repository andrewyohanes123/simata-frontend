import { FC, ReactElement, ReactNode } from "react";
import { Text, Card } from "@mantine/core";

interface props {
  title?: string;
  value?: ReactNode;  
}

const TextWithLabel: FC<props> = ({ title, value }): ReactElement => {
  return (
    <Card withBorder mb="xs">
      <Text size="sm" fw={700}>
        {title}
      </Text>
      <Text>{value}</Text>
    </Card>
  );
};

export default TextWithLabel;
