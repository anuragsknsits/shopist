import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers/rootReducer';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: rootReducer,
    devTools: false, // Auth actions carry passwords.
    middleware: () => [sagaMiddleware]
})

sagaMiddleware.run(rootSaga)
export default store;
