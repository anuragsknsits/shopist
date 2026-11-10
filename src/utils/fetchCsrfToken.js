let pendingToken;

export function fetchCsrfToken(client) {
  if (!pendingToken) {
    pendingToken = client.get('/csrf-token')
      .then(({ data }) => {
        if (typeof data?.headerName !== 'string' ||
            data.headerName.toLowerCase() !== 'x-xsrf-token' ||
            typeof data.token !== 'string' || !data.token.trim()) {
          throw new Error('The gateway did not return a valid CSRF token.');
        }
        return data;
      })
      .finally(() => {
        pendingToken = undefined;
      });
  }
  return pendingToken;
}
