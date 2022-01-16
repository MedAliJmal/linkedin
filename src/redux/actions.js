import axios from 'axios';
import {FETCH_DATA} from './actionTypes';

export const fetchData = (x) => async (dispatch) => {
  try {
    const {data} = await axios.request(x);
    dispatch({
      type: FETCH_DATA,
      payload: data,
    });
  } catch (error) {
    alert('fetch error');
  }
};
