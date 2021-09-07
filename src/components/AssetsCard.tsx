import { FC, Fragment } from "react";
import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { OpenInNew as OpenInNewIcon } from "@material-ui/icons";
import { AccountDetails } from "../services/account";
import { Network } from "../services/network";

type AssetsCardProps = {
  account: AccountDetails;
  network: Network;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const randomColor = () => {
  const hex = Math.floor(Math.random() * 0xffffff);
  return "#" + hex.toString(16);
};

const shortId = (accountId?: string) => {
  return accountId
    ? `${accountId.slice(0, 9)}...${accountId.slice(-9)}`
    : undefined;
};

const AssetsCard: FC<AssetsCardProps> = ({ account, network }) => {
  const classes = useStyles();

  const laboratoryUrl = (assetCode: string, assetIssuer?: string) => {
    const values = encodeURIComponent(
      Buffer.from(
        JSON.stringify({
          asset_code: assetCode,
          asset_issuer: assetIssuer,
        })
      ).toString("base64")
    );
    return `https://laboratory.stellar.org/#explorer?resource=assets&endpoint=single&values=${values}&network=${network.name}`;
  };

  return !account.isError ? (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5">Balances</Typography>
        <List>
          {account.balances.map((asset, index) => (
            <ListItem key={`asset_${index}`}>
              <ListItemAvatar>
                <Avatar
                  style={{
                    backgroundColor: randomColor(),
                  }}
                >
                  {asset.assetCode.slice(0, 1)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${asset.balance} ${asset.assetCode}`}
                secondary={shortId(asset.assetIssuer)}
              />
              {asset.assetIssuer && (
                <ListItemSecondaryAction>
                  <Tooltip title="Show in Stellar Laboratory">
                    <IconButton
                      edge="end"
                      href={laboratoryUrl(asset.assetCode, asset.assetIssuer)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <OpenInNewIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  ) : (
    <Fragment />
  );
};

export default AssetsCard;
