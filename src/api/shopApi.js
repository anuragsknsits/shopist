import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const gateway = new URL(
  import.meta.env.VITE_GATEWAY_URL || (import.meta.env.DEV ? 'http://localhost:8080' : window.location.origin),
  window.location.origin
);
const request = fetchBaseQuery({
  credentials: 'include',
  redirect: 'error',
  timeout: 15000,
  responseHandler: 'content-type',
});
const safeMethods = ['GET', 'HEAD', 'OPTIONS', 'TRACE'];
let pendingToken;

async function gatewayQuery(args, api, extraOptions) {
  const url = new URL(args.url, gateway);
  if (url.origin !== gateway.origin) {
    return { error: { status: 'CUSTOM_ERROR', error: 'API requests must use the configured gateway origin.' } };
  }

  const headers = new Headers(args.headers);
  if (!safeMethods.includes((args.method ?? 'GET').toUpperCase())) {
    if (!pendingToken) {
      // A cancelled mutation must not cancel the token request for other writes.
      const controller = new AbortController();
      pendingToken = request({
        url: new URL('/csrf-token', gateway).href,
        cache: 'no-store',
        responseHandler: 'json',
      }, { ...api, signal: controller.signal, abort: () => controller.abort() }, extraOptions)
        .finally(() => { pendingToken = undefined; });
    }

    const { data, error } = await pendingToken;
    if (error || typeof data?.headerName !== 'string' ||
        data.headerName.toLowerCase() !== 'x-xsrf-token' ||
        typeof data.token !== 'string' || !data.token.trim()) {
      return { error: { status: 'CUSTOM_ERROR', error: 'Could not obtain a CSRF token. Try again.' } };
    }
    headers.set('X-XSRF-TOKEN', data.token);
  }

  return request({ ...args, url: url.href, headers }, api, extraOptions);
}

const sessionRequest = { url: '/auth/verifyToken', cache: 'no-store' };

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: gatewayQuery,
  tagTypes: ['Profile'],
  endpoints: (build) => ({
    session: build.query({
      query: () => sessionRequest,
      keepUnusedDataFor: 0,
    }),
    login: build.mutation({
      async queryFn(credentials, api, extraOptions, baseQuery) {
        const login = await baseQuery({ url: '/auth/login', method: 'POST', body: credentials });
        if (login.error) return { error: login.error };

        const session = await baseQuery(sessionRequest);
        if (!session.data?.email) {
          return { error: { status: 'CUSTOM_ERROR', error: 'Could not verify your session. Try again.' } };
        }
        return { data: login.data?.email ? login.data : session.data };
      },
    }),
    logout: build.mutation({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
    }),
    register: build.mutation({
      query: (body) => ({ url: '/auth/register', method: 'POST', body }),
    }),
    changePassword: build.mutation({
      query: (body) => ({ url: '/auth/change-password', method: 'POST', body }),
    }),
    forgotPassword: build.mutation({
      query: (email) => ({ url: '/auth/forgot-password', method: 'POST', body: { email } }),
    }),
    roles: build.query({
      query: () => ({ url: '/auth/roles' }),
    }),
    profile: build.query({
      query: () => ({ url: '/auth/profile', cache: 'no-store' }),
      providesTags: ['Profile'],
      keepUnusedDataFor: 0,
    }),
    updateProfile: build.mutation({
      query: (body) => ({ url: '/auth/profile', method: 'PUT', body }),
      transformResponse: () => null,
      invalidatesTags: (_result, error) => error ? [] : ['Profile'],
    }),
    sendMessage: build.mutation({
      query: (body) => ({
        url: '/chat/send',
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }),
    }),
  }),
});

export const {
  useLoginMutation, useLogoutMutation, useRegisterMutation, useChangePasswordMutation,
  useForgotPasswordMutation, useRolesQuery, useProfileQuery, useUpdateProfileMutation,
  useSendMessageMutation,
} = shopApi;

export function apiErrorMessage(error, fallback) {
  return error?.data?.message || (error?.status === 'CUSTOM_ERROR' && error.error) || fallback;
}
