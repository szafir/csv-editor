import * as actionTypes from "./actionTypes";
import Papa from "papaparse";

export const processCSV = payload => {
  const { file } = payload;
  return dispatch => {
    Papa.parse(file, {
      complete: data => {
        dispatch({
          type: actionTypes.PROCESS_CSV,
          payload: data
        });
      }
    });
  };
};