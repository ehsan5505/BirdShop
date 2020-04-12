import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import rootReducer from './root-reducer';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root.saga';
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

// logger would only be activate when running into 
// DEVELOPMENT Environment 
if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default { store, persistor };

