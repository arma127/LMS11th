import { createStore, combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { progressReducer } from './progressReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  progress: progressReducer
});

const store = createStore(rootReducer);

export default store;
