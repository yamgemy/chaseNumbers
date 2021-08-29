import {
  GENERATE_NEW_NUMBER,
  GET_IPSUM_SUCCESS,
  GET_IPSUM_FAILED,
  MOVE_CURSOR_NEXT,
  ELEMENT_COMPLETE,
} from '../types';

//simulate an http request
export const getNewNumber = () => {
  console.log('action getNewNumber called');
  return {type: GENERATE_NEW_NUMBER};
};

export const getIpsumSuccess = response => {
  return {type: GET_IPSUM_SUCCESS, payload: response};
};

export const getIpsumFailed = e => {
  console.log('action getIpsumFailed called', e);
  return {type: GET_IPSUM_FAILED, payload: e};
};

export const moveCursorToNextComplete = nextUncoveredIdx => {
  return {
    type: MOVE_CURSOR_NEXT,
    nextUncoveredIdx,
  };
};

//todo
export const setElementCompleted = nextUncoveredIdx => {
  return {
    type: ELEMENT_COMPLETE,
    nextUncoveredIdx,
  };
};

export const moveCursorFailed = e => {
  console.log('action moveCursorFailed called', e);
  return {type: GET_IPSUM_FAILED, payload: e};
};
