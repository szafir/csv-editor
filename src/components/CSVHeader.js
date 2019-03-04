import React from "react";
import {
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TextField
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  head: {
    backgroundColor: theme.palette.grey["300"],
    "& > *": {
   
    }
  },
  textField: {
    margin: 0,
    "& input": {
      padding: "8px 8px 6px"
    }
  }
});

const ref = React.createRef();

const CSVHeader = props => {
  const { classes, columns } = props;
  return (
    <TableHead>
      <TableRow>
        {columns.map((item, ind) => {
          // console.log(item);
          return (
            <TableCell className={classes.head} key={`header-${ind}`}
            onClick={props.startEditHandler.bind(this, ind)}
            >
              {item.editable ? (
                <TextField
                  className={classes.textField}
                  value={item.value}
                  margin="normal"
                  variant="outlined"
                  onBlur={props.handleInputBlur.bind(this, ind, false)}
                  onChange={props.handleInputBlur.bind(this, ind, true)}
                  //   ref={ref}
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
    </TableHead>
  );
};

export default withStyles(styles)(CSVHeader);
