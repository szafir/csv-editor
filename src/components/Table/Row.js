import React from "react";

import { TableCell, TableRow, TextField, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = theme => ({
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    },
    "& > *": {
      position: "relative"
    }
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
  },
  cell: {
    cursor: "text"
  }
});

let refElem = React.createRef();

const Row = props => {
  const { classes, row, rowsPerPage, page } = props;

  const onRowFocusHandler = (rowInd, colInd, event) => {
    props.onRowFocusHandler(rowInd, colInd, event);
    requestAnimationFrame(() => {
      refElem.focus();
    });
  };
  return (
    <TableRow className={classes.row}>
      {row && row.map((item, ind) => {
        return (
          <TableCell
            onClick={onRowFocusHandler.bind(this, props.index, ind)}
            padding="dense"
            className={classes.cell}
            key={`${page * rowsPerPage + props.index}-${ind}-cell`}
          >
            {item.editable ? (
              <TextField
                className={classes.textField}
                value={item.value}
                margin="normal"
                variant="outlined"
                onBlur={props.onRowChangeHandler.bind(
                  this,
                  props.index,
                  ind,
                  false
                )}
                onChange={props.onRowChangeHandler.bind(
                  this,
                  props.index,
                  ind,
                  true
                )}
                inputRef={ref => (refElem = ref)}
              />
            ) : (
              <Typography variant="h6" color="textSecondary">
                {item.value}
              </Typography>
            )}
            {ind === row.length - 1 && (
              <DeleteIcon
                className={classes.deleteIcon}
                onClick={props.onDelete.bind(this, props.index)}
              />
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default withStyles(styles)(Row);
