import { v4 as uuidv4 } from "uuid"
import {processArray} from "../../utils/helper";
import {fifo, strf} from "../../utils/algorithms";

export const dataManip = {
  CHANGE_WITH_TRACE: "CHANGE_WITH_TRACE",
  CHANGE_MAIN_DATA: "CHANGE_MAIN_DATA",
  CHANGE_FIFO_DATA: "CHANGE_FIFO_DATA",
  CHANGE_STRF_DATA: "CHANGE_STRF_DATA"
}

export const changeWithTrace = (withTrace) => ({
  type: dataManip.CHANGE_WITH_TRACE,
  payload: withTrace,
})

const changeMainData = (data) => ({
  type: dataManip.CHANGE_MAIN_DATA,
  payload: data,
})

export const addMainData = data => {
  return async (dispatch) => {
    try {
      let mainDataItem = [];
      mainDataItem.id = uuidv4();
      mainDataItem.values = data;

      dispatch(changeMainData(mainDataItem));
    } catch (error) {

    }
  }
}

const changeFifoData = (data) => ({
  type: dataManip.CHANGE_FIFO_DATA,
  payload: data,
})

const changeStrfData = (data) => ({
  type: dataManip.CHANGE_STRF_DATA,
  payload: data,
})

export const algoProcess = (data, withTrace) => {
  return async (dispatch) => {
    try {
      let fifoData = processArray(fifo(data), withTrace);
      dispatch(changeFifoData(fifoData));

      let strfData = processArray(strf(data), withTrace);
      dispatch(changeStrfData(strfData));
    } catch (error) {

    }
  }
}