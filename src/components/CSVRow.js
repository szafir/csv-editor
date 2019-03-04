import React from "react";

import { TableCell, TableRow, TextField, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

const CSVRow = props => {
  const { classes, row } = props;
  return (
    <TableRow className={classes.row}>
      {row.map((item, ind) => {
        return (
          <TableCell>
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
  );
};

export default withStyles(styles)(CSVRow);

// {
//   item.editable ? (
//     <TextField
//       className={classes.textField}
//       value={item.value}
//       margin="normal"
//       variant="outlined"
//       onBlur={props.handleInputBlur.bind(this, ind, false)}
//       onChange={props.handleInputBlur.bind(this, ind, true)}
//       //   ref={ref}
//     />
//   ) : (
//     <Typography variant="h6" color="textSecondary" className={classes.header}>
//       {item.value}
//     </Typography>
//   );
// }
