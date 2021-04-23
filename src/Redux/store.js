import {
  compose,
  createStore,
  applyMiddleware
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/rootReducer'
import { watcherSagasCities, watcherSagasError, watcherSagasForecast, watchFavorites } from './saga/rootSaga';


const composeEnhancers = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : null || compose;

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(watchFavorites);
sagaMiddleware.run(watcherSagasCities);
sagaMiddleware.run(watcherSagasForecast);
sagaMiddleware.run(watcherSagasError);