import {
  Card,
  CardContent,
  Container,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { Keypair } from "stellar-base";
import { Server } from "stellar-sdk";
import AccountCard from "./components/AccountCard";
import AssetsCard from "./components/AssetsCard";
import NetworkSelect from "./components/NetworkSelect";
import WalletButton from "./components/WalletButton";
import { AccountDetails, fetchAccount } from "./services/account";
import { Network, networks } from "./services/network";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
  },
}));

const App: FC = () => {
  const classes = useStyles();
  const [network, setNetwork] = useState<Network>(networks[0]);
  const [server, setServer] = useState<Server>();
  const [keypair, setKeypair] = useState<Keypair>();
  const [loading, setLoading] = useState<boolean>(false);
  const [account, setAccount] = useState<AccountDetails>();

  useEffect(() => {
    if (network) {
      setServer(new Server(network.serverUrl));
    } else {
      setServer(undefined);
    }
    setAccount(undefined);
  }, [network]);

  useEffect(() => {
    if (server && keypair) {
      setLoading(true);
      fetchAccount(server, keypair).then((res) => {
        if (!res.isError) {
          setAccount(res);
        } else {
          setAccount(undefined);
        }
        setLoading(false);
      });
    } else {
      setAccount(undefined);
    }
  }, [server, keypair, setLoading]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className={classes.buttons}>
          <NetworkSelect
            options={networks}
            selected={network}
            setSelected={setNetwork}
          />
          <WalletButton keypair={keypair} setKeypair={setKeypair} />
        </div>
        {!!account && !account.isError ? (
          <div>
            <AccountCard account={account} network={network} />
            <AssetsCard account={account} network={network} />
          </div>
        ) : (
          <div>
            <Card>
              <CardContent>
                <Typography>
                  {loading
                    ? "Loading..."
                    : !keypair
                    ? "Connect your wallet to show account information."
                    : "Couldn't find account information, check that you have correct network selected."}
                </Typography>
              </CardContent>
            </Card>
          </div>
        )}
      </Container>
    </div>
  );
};

export default App;
