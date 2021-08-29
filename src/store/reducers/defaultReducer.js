import {
  GENERATE_NEW_NUMBER_SUCCESS,
  GET_IPSUM_SUCCESS,
  ELEMENT_COMPLETE,
} from '../types';

const initState = {myNumberList: []};

export const defaultReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_IPSUM_SUCCESS:
      console.log('at reducer GET_IPSUM_SUCCESS', action.payload);
      const newElement = {
        index: state.myNumberList.length,
        value: 10,
        covered: false,
      };
      return {
        ...state,
        myNumberList: [...state.myNumberList, newElement],
      };

    case ELEMENT_COMPLETE:
      const currentIdxToComplete = action.nextUncoveredIdx;
      const updatedElement = [...state.myNumberList][currentIdxToComplete];
      updatedElement.covered = true;

      const newArr = [
        ...state.myNumberList.slice(0, currentIdxToComplete),
        updatedElement,
        ...state.myNumberList.slice(currentIdxToComplete + 1),
      ];

      console.log('after ELEMENT_COMPLETE', state.myNumberList);

      return {
        ...state,
        myNumberList: newArr,
      };

    default:
      return state;
  }
};
