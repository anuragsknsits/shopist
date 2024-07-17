// src/selectors/authSelectors.js
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const userName = (state) => state.auth.user;
