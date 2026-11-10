import { configureStore, createSlice } from '@reduxjs/toolkit';
import { shopApi } from '../api/shopApi';

const auth = createSlice({
  name: 'auth',
  initialState: { checkingSession: true, user: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(shopApi.endpoints.session.matchFulfilled, (state, { payload }) => {
        state.user = payload?.email ? payload : null;
        state.checkingSession = false;
      })
      .addMatcher(shopApi.endpoints.session.matchRejected, (state) => {
        state.checkingSession = false;
      })
      .addMatcher(shopApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        state.user = payload;
        state.checkingSession = false;
      })
      .addMatcher(shopApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
      });
  },
});

const greeting = { text: 'Hello! How can I help you?', sender: 'bot' };
const chatbot = createSlice({
  name: 'chatbot',
  initialState: { messages: [greeting], requestId: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(shopApi.endpoints.sendMessage.matchPending, (state, { meta }) => {
        state.requestId = meta.requestId;
        state.messages.push({ text: meta.arg.originalArgs, sender: 'user' });
      })
      .addMatcher(shopApi.endpoints.sendMessage.matchFulfilled, (state, { payload, meta }) => {
        if (state.requestId !== meta.requestId) return;
        state.requestId = null;
        const text = typeof payload === 'string' ? payload : payload?.message;
        if (typeof text === 'string') state.messages.push({ text, sender: 'bot' });
      })
      .addMatcher(shopApi.endpoints.logout.matchFulfilled, (state) => {
        state.messages = [greeting];
        state.requestId = null;
      });
  },
});

export function createAppStore() {
  return configureStore({
    reducer: { auth: auth.reducer, chatbot: chatbot.reducer, [shopApi.reducerPath]: shopApi.reducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shopApi.middleware),
    devTools: false, // Auth mutations carry passwords in action metadata.
  });
}

export default createAppStore();
