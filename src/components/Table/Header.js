import React from "react";
import {
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TextField
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = theme => ({
  cell: {
    backgroundColor: theme.palette.grey["300"],
    minWidth: 100,
    position: "relative",
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.grey["200"]
    },
    cursor: "text"
  },
  textField: {
    margin: 0,
    width: "100%",
    "& input": {
      padding: "8px 8px 6px"
    }
  },
  deleteIcon: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: theme.spacing.unit / 2,
    cursor: "pointer"
  }
});

let refElem = React.createRef();

const Header = props => {
  const { classes, columns } = props;

  const onHeaderFocusHandler = rowInd => event => {
    props.onHeaderFocusHandler(rowInd, event);
    requestAnimationFrame(() => {
      refElem.focus();
    });
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((item, ind) => {
          return (
            <TableCell
              className={classes.cell}
              key={item.id}
              onClick={onHeaderFocusHandler(ind)}
              style={{
                width: `${1 / (0.01 * columns.length)}%`
              }}
              padding="dense"
            >
              {item.editable ? (
                <TextField
                  className={classes.textField}
                  value={item.value}
                  margin="normal"
                  variant="outlined"
                  onBlur={props.onHeaderChangeHandler(ind, false)}
                  onChange={props.onHeaderChangeHandler(ind, true)}
                  inputRef={ref => (refElem = ref)}
                />
              ) : (
                <Typography
                  variant="h6"
                  color="textSecondary"
                  className={classes.header}
                >
                  {item.value}
                </Typography>
              )}
              <DeleteIcon
                className={classes.deleteIcon}
                onClick={props.onDelete(ind)}
              />
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default withStyles(styles)(Header);
