import { FC, ReactElement } from "react";
import { Drawer } from "@mantine/core";
import { LandUseProperties } from "types/global";
import { TextWithLabel } from "components";

interface props {
  opened: boolean;
  onClose: () => void;
  featureProperties: LandUseProperties | null;
}

const LandDetail: FC<props> = ({
  opened,
  onClose,
  featureProperties,
}): ReactElement => {
  return (
    <Drawer
      title={featureProperties?.POLA_RUANG ?? ""}
      onClose={onClose}
      opened={opened}
      withOverlay={false}
      position="right"
      zIndex={310}
    >
      {Object.entries(featureProperties ?? {}).map((entry) => (
        <TextWithLabel key={entry[0]} title={entry[0]} value={entry[1]} />
      ))}
    </Drawer>
  );
};

export default LandDetail;
