import { v4 as uuidv4 } from "uuid"
import {processArray} from "../../utils/helper";
import {fifo, strf} from "../../utils/algorithms";

export const dataManip = {
  CHANGE_WITH_TRACE: "CHANGE_WITH_TRACE",
  CHANGE_MAIN_DATA: "CHANGE_MAIN_DATA",
  CHANGE_FIFO_DATA: "CHANGE_FIFO_DATA",
  CHANGE_FIFO_STATS: "CHANGE_FIFO_STATS",
  CHANGE_STRF_DATA: "CHANGE_STRF_DATA",
  CHANGE_STRF_STATS: "CHANGE_STRF_STATS"
}

export const changeWithTrace = (withTrace) => ({
  type: dataManip.CHANGE_WITH_TRACE,
  payload: withTrace,
})

export const changeMainData = (sourceData) => ({
  type: dataManip.CHANGE_MAIN_DATA,
  payload: sourceData,
})

export const changeFifoData = (fifoData) => ({
  type: dataManip.CHANGE_FIFO_DATA,
  payload: fifoData,
})

export const changeFifoStats = (fifoStats) => ({
  type: dataManip.CHANGE_FIFO_DATA,
  payload: fifoStats,
})

export const changeStrfData = (strfData) => ({
  type: dataManip.CHANGE_STRF_DATA,
  payload: strfData,
})

export const changeStrfStats = (strfStats) => ({
  type: dataManip.CHANGE_STRF_DATA,
  payload: strfStats,
})