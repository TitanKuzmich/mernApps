import {dataManip} from "../actions/changeData";

const initialState = {
  data:{},
  withTrace:false,
  fifoData:[],
  strfData:[]
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
        data: {
          ...state.data,
          [action.payload.id]: action.payload.values
        }
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
    default:
      return state;
  }
}

export default changeData;
