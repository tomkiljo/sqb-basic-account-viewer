import { Button, ButtonGroup } from "@material-ui/core";
import { FC } from "react";
import { Network } from "../services/network";

type NetworkSelectProps = {
  options: Network[];
  selected: Network;
  setSelected: (network: Network) => void;
};

const NetworkSelect: FC<NetworkSelectProps> = ({
  options,
  selected,
  setSelected,
}) => {
  return (
    <ButtonGroup color="primary">
      {options.map((net) => (
        <Button
          key={net.name}
          onClick={() => setSelected(net)}
          variant={net.name === selected.name ? "contained" : "outlined"}
        >
          {net.name}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default NetworkSelect;
