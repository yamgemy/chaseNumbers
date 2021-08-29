import 'rxjs';
import {combineEpics, ofType} from 'redux-observable';
import {from, mergeMap, concatMap} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {GENERATE_NEW_NUMBER, MOVE_CURSOR_NEXT} from '../types';
import axios from 'axios';
import {
  getIpsumSuccess,
  getIpsumFailed,
  setElementCompleted,
  moveCursorToNextComplete,
} from '../actions/defaultActions';

//const url = 'https://baconipsum.com/api/?type=all-meat&paras=1';

//this epic needs to take a stream of actions and return a stream of actions
// const generateNewNumberEpicWithMockApi = (action$, state$) =>
//   action$.pipe(
//     ofType(GENERATE_NEW_NUMBER),
//     mergeMap(action =>
//       from(axios.get(url)).pipe(
//         map(response => getIpsumSuccess(response.data)),
//         catchError(e => {
//           return getIpsumFailed(e);
//         }),
//       ),
//     ),
//   );

async function fakeApiCall() {
  return new Promise(resolve => {
    setTimeout(() => resolve('someData'), 2000);
  });
}

//'map' is an rxjs operator
//an rxjs operator
const generateNewNumberEpic = (action$, state$) => {
  return action$.pipe(
    ofType(GENERATE_NEW_NUMBER),
    concatMap(action => {
      return from(fakeApiCall()).pipe(
        map(result => getIpsumSuccess(result)), //for each result return the action instead
        catchError(e => getIpsumFailed),
      );
    }),
  );
};

async function takeTime() {
  return new Promise(resolve => {
    setTimeout(() => resolve('move cursor finished', 3000));
  });
}

const moveCursorToNextEpic = (action$, state$) => {
  return action$.pipe(
    ofType(MOVE_CURSOR_NEXT),
    concatMap(action => {
      return from(takeTime()).pipe(
        map(result => setElementCompleted(action.nextUncoveredIdx)),
        //map(() => moveCursorToNextComplete(action.nextUncoveredIdx + 1)),
        catchError(e => moveCursorFailed(e)),
      );
    }),
    // .concatMap(action =>
    //   moveCursorToNextComplete(action.nextUncoveredIdx + 1),
    // ),
  );
};

export default RootEpic = combineEpics(
  generateNewNumberEpic,
  moveCursorToNextEpic,
);
