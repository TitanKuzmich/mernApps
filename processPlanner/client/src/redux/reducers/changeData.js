import {dataManip} from "../actions/changeData";

const initialState = {
  withTrace:false,
  data:[],
  fifoData:[],
  fifoStats: {},
  strfData:[],
  strfStats:{},
}

const changeData = (state = initialState, action) => {
  switch (action.type) {
    case dataManip.CHANGE_WITH_TRACE:
      return {
        ...state,
        withTrace: action.payload
      }
    case dataManip.CHANGE_MAIN_DATA:
      return {
        ...state,
        data: action.payload
      }
    case dataManip.CHANGE_FIFO_DATA:
      return {
        ...state,
        fifoData: action.payload
      }
    case dataManip.CHANGE_STRF_DATA:
      return {
        ...state,
        strfData: action.payload
      }
    case dataManip.CHANGE_FIFO_STATS:
      return {
        ...state,
        fifoStats: action.payload
      }
    case dataManip.CHANGE_STRF_STATS:
      return {
        ...state,
        strfStats: action.payload
      }
    default:
      return state;
  }
}

export default changeData;
