import {FETCH_DATA} from './actionTypes';

const init = {
  data: null,
  loading: true,
};

const reducer = (state = init, {type, payload}) => {
  switch (type) {
    case FETCH_DATA:
      return {
        ...state,
        data: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
