import { FC, Fragment, useState } from "react";
import { Button } from "@material-ui/core";
import { Keypair } from "stellar-base";
import WalletModal from "./WalletModal";

type WalletButtonProps = {
  keypair?: Keypair;
  setKeypair: (keypair?: Keypair) => void;
};

const WalletButton: FC<WalletButtonProps> = ({ keypair, setKeypair }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const disconnect = () => {
    setModalOpen(false);
    setKeypair(undefined);
  };

  return !!!keypair ? (
    <Fragment>
      <Button color="primary" variant="contained" onClick={openModal}>
        Connect wallet
      </Button>
      <WalletModal
        open={modalOpen}
        setOpen={setModalOpen}
        setKeypair={setKeypair}
      />
    </Fragment>
  ) : (
    <Button color="secondary" variant="contained" onClick={disconnect}>
      Disconnect
    </Button>
  );
};

export default WalletButton;
