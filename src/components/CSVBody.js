import React from "react";
import CSVRow from "./CSVRow";
import { withStyles } from "@material-ui/core/styles";
import { TableBody } from "@material-ui/core";

const CSVBody = props => {
  const { rows, page, rowsPerPage } = props;
  return (
    <TableBody>
      {rows.map((item, index) => {
        return (
          <CSVRow
            row={item}
            startEditHandler={props.startEditHandler}
            handleInputBlur={props.handleInputBlur}
            index={index}
            key={`${index}-row`}
            rowsPerPage={rowsPerPage}
            page={page}
          />
        );
      })}
    </TableBody>
  );
};

export default CSVBody;
