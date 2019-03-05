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
  head: {
    backgroundColor: theme.palette.grey["300"],
    minWidth: 100,
    position: "relative",
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.grey["200"]
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
  }
});

let refElem = React.createRef();

const CSVHeader = props => {
  const { classes, columns } = props;

  const startEditHandler = (rowInd, colInd, event) => {
    props.startEditHandler(rowInd, colInd, event);
    requestAnimationFrame(() => {
      refElem.focus();
    });
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((item, ind) => {
          return (
            <TableCell className={classes.head} key={`header-${ind}`} 
           
            style={{
                width: `${ 1 / (0.01 * columns.length)}%`
            }}
            padding="dense"
            >
              {item.editable ? (
                <TextField
                  className={classes.textField}
                  value={item.value}
                  margin="normal"
                  variant="outlined"
                  onBlur={props.handleInputBlur.bind(this, ind, false)}
                  onChange={props.handleInputBlur.bind(this, ind, true)}
                  inputRef={ref => (refElem = ref)}
                />
              ) : (
                <Typography
                  variant="h6"
                  color="textSecondary"
                  className={classes.header}
                  onClick={startEditHandler.bind(this, ind)}
                >
                  {item.value}
                </Typography>
              )}
              <DeleteIcon className={classes.deleteIcon}
              onClick={props.onDelete.bind(this, ind)}/>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default withStyles(styles)(CSVHeader);
