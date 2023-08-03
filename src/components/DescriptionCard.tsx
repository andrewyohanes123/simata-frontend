import { FC, ReactElement } from "react";
import { Card, Text } from "@mantine/core";
import FlexContainer from "./atoms/FlexContainer";

interface props {
  label?: string;
  value?: string | number;
}

const DescriptionCard: FC<props> = ({ label, value }): ReactElement => {
  return (
    <Card my="sm" withBorder>
      <FlexContainer justifyContent="space-between">
        <Text>{label}</Text>
        <Text fw="bold">{value}</Text>
      </FlexContainer>
    </Card>
  );
};

export default DescriptionCard;
