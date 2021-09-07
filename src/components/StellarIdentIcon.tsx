import { makeStyles } from "@material-ui/core";
import { FC } from "react";
const createStellarIdenticon = require("stellar-identicon-js");

type StellarIdentIconProps = {
  accountId: string;
  size?: "small" | "medium" | "large";
};

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  medium: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  large: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
}));

const StellarIdentIcon: FC<StellarIdentIconProps> = ({
  accountId,
  size = "medium",
}) => {
  const classes = useStyles();
  const canvas = createStellarIdenticon(accountId);
  const renderedIcon = canvas.toDataURL();

  return (
    <img
      src={renderedIcon}
      alt="stellar ident icon"
      className={classes[size]}
    />
  );
};

export default StellarIdentIcon;
