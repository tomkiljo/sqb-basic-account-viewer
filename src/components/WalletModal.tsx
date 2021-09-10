import { FC, Fragment } from "react";
import {
  Grid,
  IconButton,
  Link,
  makeStyles,
  Modal,
  Paper,
  Theme,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import {
  AlbedoWallet,
  FreighterWallet,
  RabetWallet,
  Wallet,
} from "../services/wallet";
import { Close as CloseIcon } from "@material-ui/icons";
import { Keypair } from "stellar-base";

type WalletModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setKeypair: (keypair: Keypair) => void;
};

const useStyles = makeStyles((theme) => ({
  body: {
    position: "absolute",
    top: "10%",
    left: "50%",
    transform: "translate(-50%, -10%)",
    width: 340,
    padding: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
  },
  closeButton: {},
  wallets: {},
  wallet: {
    textAlign: "center",
  },
  walletButton: {
    textAlign: "center",
    width: theme.spacing(12),
    height: theme.spacing(12),
    background: "none",
    borderStyle: "solid",
    borderColor: theme.palette.grey[200],
    borderRadius: theme.spacing(1),
    "&:hover": {
      cursor: "pointer",
      opacity: 0.5,
    },
  },
  walletIcon: {
    maxWidth: "100%",
    maxHeight: "70%",
  },
}));

const WalletTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
  },
}))(Tooltip);

const wallets: Wallet[] = [
  new AlbedoWallet(),
  new RabetWallet(),
  new FreighterWallet(),
];

const WalletModal: FC<WalletModalProps> = ({ open, setOpen, setKeypair }) => {
  const classes = useStyles();

  const close = () => {
    setOpen(false);
  };

  const connect = (wallet: Wallet) => {
    wallet.connect().then((res) => {
      console.log(res);
      if (!res.isError) {
        setKeypair(res.keypair);
      }
    });
  };

  return (
    <Modal open={open} onClose={close}>
      <Paper className={classes.body}>
        <Typography variant="h5" className={classes.title}>
          Connect wallet
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        </Typography>
        <Grid container className={classes.wallets} spacing={2}>
          {wallets.map((wallet, index) => (
            <Grid
              item
              className={classes.wallet}
              key={`wallet_${index}`}
              xs={6}
            >
              <WalletTooltip
                interactive={!wallet.isAvailable()}
                leaveDelay={100}
                title={
                  <Fragment>
                    <Typography variant="body2">
                      <strong>{`Connect with ${wallet.name()}`}</strong>
                    </Typography>
                    {!wallet.isAvailable() && (
                      <Typography variant="body2">
                        {`${wallet.name()} extension is not installed`}
                        <br />
                        Get it from{" "}
                        <Link
                          href={wallet.installUrl()}
                          target="_blank"
                          rel="noreffer"
                        >
                          {wallet.installUrl()}
                        </Link>
                      </Typography>
                    )}
                  </Fragment>
                }
              >
                <button
                  className={classes.walletButton}
                  disabled={!wallet.isAvailable()}
                  onClick={() => connect(wallet)}
                >
                  <img
                    className={classes.walletIcon}
                    src={wallet.logoUrl()}
                    alt={wallet.name()}
                  />
                  <Typography variant="body2">{wallet.name()}</Typography>
                </button>
              </WalletTooltip>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Modal>
  );
};

export default WalletModal;
