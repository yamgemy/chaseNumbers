import {combineEpics, ofType} from 'redux-observable';
import {from, mergeMap, concatMap, of} from 'rxjs';
//import {Observable, Scheduler} from 'rxjs/Observable';
import {map, catchError, finalize, delay} from 'rxjs/operators';
import {
  ELEMENT_COMPLETE,
  GENERATE_NEW_NUMBER,
  MOVE_CURSOR_NEXT,
} from '../types';
import axios from 'axios';
import {
  getIpsumSuccess,
  getIpsumFailed,
  setElementCompleted,
  moveCursorToNext,
  moveCursorFailed,
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
    setTimeout(() => resolve('someData'), 2000); //this ms doesnt delay
  });
}

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

async function takeTime(duration) {
  return new Promise(resolve => {
    if (duration === 0) {
      resolve('immediately move cursor');
    } else {
      setTimeout(() => resolve('move cursor finished', duration));
    }
  });
}

const moveCursorToNextEpic = (action$, state$, {store}) => {
  return action$.pipe(
    ofType(MOVE_CURSOR_NEXT),
    concatMap(action => {
      //creates an Observable with 'of', consist of 2 consecutive actions
      return of(
        setElementCompleted(action.nextUncoveredIdx),
        moveCursorToNext(action.nextUncoveredIdx + 1, 3500),
      ).pipe(delay(3500));
      //this code works but it keeps dispatching movecurosrtonext\
      //use takeuntil..... https://redux-observable.js.org/docs/recipes/Cancellation.html
    }),
  );
};

// finalize(() => {
//   //TODO
//   console.log('yo store ', store);
//   console.log('yo state ', state$);
// }),

// const moveCursorCompletedEpic = (action$, state$) => {
//   return action$.pipe(
//     ofType(ELEMENT_COMPLETE),
//     concatMap(action => {
//       return from(takeTime(3000)).pipe(
//         map(x => moveCursorToNext(action.nextUncoveredIdx + 1, 4000)),
//         catchError(e => moveCursorFailed(e)),
//       );
//     }),
//   );
// };
export default RootEpic = combineEpics(
  generateNewNumberEpic,
  moveCursorToNextEpic,
  // moveCursorCompletedEpic,
);
