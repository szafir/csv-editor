import React from "react";
import CSVRow from "./Row";
import { TableBody } from "@material-ui/core";

const Body = props => {
  const { rows, page, rowsPerPage, onDelete } = props;
  return (
    <TableBody>
      {rows && rows.map((item, index) => {
        return (
          <CSVRow
            row={item}
            onRowFocusHandler={props.onRowFocusHandler}
            onRowChangeHandler={props.onRowChangeHandler}
            index={index}
            key={`${index}-row`}
            rowsPerPage={rowsPerPage}
            onDelete={onDelete}
            page={page}
          />
        );
      })}
    </TableBody>
  );
};

export default Body;
