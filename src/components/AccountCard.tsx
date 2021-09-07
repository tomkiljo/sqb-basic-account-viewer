import {
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { FC, Fragment } from "react";
import { AccountDetails } from "../services/account";
import { Network } from "../services/network";
import AccountId from "./AccountId";
import StellarIdentIcon from "./StellarIdentIcon";

type AccountCardProps = {
  account: AccountDetails;
  network: Network;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  media: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    flexGrow: 0,
  },
  content: {
    flexGrow: 1,
  },
}));

const AccountCard: FC<AccountCardProps> = ({ account, network }) => {
  const classes = useStyles();

  return !account.isError ? (
    <Card className={classes.root}>
      <CardMedia className={classes.media}>
        <StellarIdentIcon accountId={account.accountId} size="medium" />
      </CardMedia>
      <CardContent className={classes.content}>
        <Typography>
          <strong>Account ID</strong>
        </Typography>
        <AccountId accountId={account.accountId} network={network} />
        <Typography>
          <strong>Created by</strong>
        </Typography>
        <AccountId accountId={account.createdBy!} network={network} />
        <Typography>
          <strong>Created at</strong>
          <br />
          {account.createdAt}
        </Typography>
      </CardContent>
    </Card>
  ) : (
    <Fragment />
  );
};

export default AccountCard;
