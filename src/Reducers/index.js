import { combineReducers } from 'redux'
import addTodo from './TodoReducer';
import addUser from './UserReducer';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key:'primary',
  storage,
  whitelist:['todo','user']
}

const rootReducer = combineReducers({
    todo: addTodo,
    user: addUser,
  });

export default persistReducer(persistConfig, rootReducer);