import React from "react";

import { TableCell, TableRow, TextField, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  textField: {
    margin: 0,
    width: "100%",
    "& input": {
      padding: "8px 8px 6px"
    }
  }
});

let refElem = React.createRef();

const CSVRow = props => {
  const { classes, row, rowsPerPage, page } = props;

  const startEditHandler = (rowInd, colInd, event) => {
    props.startEditHandler(rowInd, colInd, event);

    requestAnimationFrame(() => {
      refElem.focus();
    });
  };
  return (
    <TableRow className={classes.row}>
      {row.map((item, ind) => {
        return (
          <TableCell
            onClick={startEditHandler.bind(this, props.index, ind)}
            padding="dense"
            key={`${page * rowsPerPage + props.index}-${ind}-cell`}
          >
            {item.editable ? (
              <TextField
                className={classes.textField}
                value={item.value}
                margin="normal"
                variant="outlined"
                onBlur={props.handleInputBlur.bind(
                  this,
                  props.index,
                  ind,
                  false
                )}
                onChange={props.handleInputBlur.bind(
                  this,
                  props.index,
                  ind,
                  true
                )}
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
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default withStyles(styles)(CSVRow);
