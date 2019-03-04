import React from "react";
import CSVRow from "./CSVRow";
import { withStyles } from "@material-ui/core/styles";
import { TableBody } from "@material-ui/core";

const CSVBody = props => {
  const { rows } = props;
  return (
    <TableBody>
        {
            rows.map(item => {
                return <CSVRow row={item}/>
            })
        }
    </TableBody>
  );
};

export default CSVBody;
