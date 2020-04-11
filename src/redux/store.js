import { createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import {persistStore} from 'redux-persist';
import rootReducer from './root-reducer';
import thunk from 'redux-thunk';

const middlewares = [thunk];

// logger would only be activate when running into 
// DEVELOPMENT Environment 
if(process.env.NODE_ENV === "development"){
    middlewares.push(logger);
}

export const store = createStore(rootReducer,applyMiddleware(...middlewares));
export const persistor = persistStore(store);

export default { store, persistor };

