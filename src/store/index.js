import {createEpicMiddleware} from 'redux-observable';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {defaultReducer} from './reducers/defaultReducer';
import RootEpic from './epics/index';

const epicMiddleware = createEpicMiddleware();

const rootReducer = combineReducers({defaultReducer});

export const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(RootEpic);
