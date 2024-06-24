import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers/rootReducer';
import createSagaMiddleware from 'redux-saga'
import apiCallSaga from './sagas/apiCallSaga';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: rootReducer,
    middleware: () => [sagaMiddleware]
})

sagaMiddleware.run(apiCallSaga)
export default store