import { Center, Title, useMantineTheme } from "@mantine/core";
import { FC, ReactElement } from "react";
import { TablerIconsProps, IconInbox } from "@tabler/icons-react";

interface props {
  title?: string;
  icon?: FC<TablerIconsProps>;
  height?: number | string;
}

const EmptyData: FC<props> = ({
  title,
  icon = IconInbox,
  height = "100%",
}): ReactElement => {
  const Icon = icon;
  const { colors } = useMantineTheme();
  return (
    <Center sx={{ flexDirection: "column", height, width: "100%" }} p="lg">
      <Icon size={80} stroke={1} color={colors.dark[2]} />
      <Title order={5} color="dark.2" mt="md" align="center">
        {title ?? "Tidak ada data"}
      </Title>
    </Center>
  );
};

export default EmptyData;
