import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import createSagaMiddleware from 'redux-saga'
import apiCallSaga from './apiCallSaga';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: rootReducer,
    middleware: () => [sagaMiddleware]
})

sagaMiddleware.run(apiCallSaga)
export default store