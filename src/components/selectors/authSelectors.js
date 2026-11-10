// src/selectors/authSelectors.js
export const selectIsAuthenticated = (state) => Boolean(state.auth.user);
export const userName = (state) => state.auth.user;
