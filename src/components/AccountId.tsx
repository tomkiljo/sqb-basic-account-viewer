import { FC } from "react";
import { IconButton, makeStyles, Tooltip, Typography } from "@material-ui/core";
import copy from "clipboard-copy";
import {
  FileCopy as FileCopyIcon,
  OpenInNew as OpenInNewIcon,
} from "@material-ui/icons";
import { Network } from "../services/network";

type AccountIdProps = {
  accountId: string;
  network: Network;
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
}));

const AccountId: FC<AccountIdProps> = ({ accountId, network }) => {
  const classes = useStyles();
  const shortId = `${accountId.slice(0, 4)}...${accountId.slice(-4)}`;
  const values = encodeURIComponent(
    Buffer.from(
      JSON.stringify({
        account_id: accountId,
      })
    ).toString("base64")
  );
  const laboratoryUrl = `https://laboratory.stellar.org/#explorer?resource=accounts&endpoint=single&values=${values}&network=${network.name}`;

  return (
    <Typography className={classes.root}>
      {shortId}
      <Tooltip title="Copy to clipboard">
        <IconButton
          color="primary"
          size="small"
          onClick={() => copy(accountId)}
        >
          <FileCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Show in Stellar Laboratory">
        <IconButton
          href={laboratoryUrl}
          target="_blank"
          rel="noreferrer"
          color="primary"
          size="small"
        >
          <OpenInNewIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Typography>
  );
};

export default AccountId;
