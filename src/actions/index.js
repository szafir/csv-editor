import Papa from "papaparse";
import * as actionTypes from "./actionTypes";

const processCSV = (payload) => {
  const { file } = payload;
  return (dispatch) => {
    Papa.parse(file, {
      complete: (data) => {
        dispatch({
          type: actionTypes.PROCESS_CSV,
          payload: data,
        });
      },
    });
  };
};

export {
  processCSV,
};
