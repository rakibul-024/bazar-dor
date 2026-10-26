const providerEnvironment = {
  google: {
    clientId: ["GOOGLE_CLIENT_ID", "BETTER_AUTH_GOOGLE_CLIENT_ID", "BETTER_AUTH_GEOGLE_CLIENT_ID"],
    clientSecret: ["GOOGLE_CLIENT_SECRET", "BETTER_AUTH_GOOGLE_CLIENT_SECRET", "BETTER_AUTH_GEOGLE_SECRET"],
  },
  github: {
    clientId: ["GITHUB_CLIENT_ID", "BETTER_AUTH_GITHUB_CLIENT_ID"],
    clientSecret: ["GITHUB_CLIENT_SECRET", "BETTER_AUTH_GITHUB_SECRET"],
  },
};

function firstConfigured(keys) {
  return keys.map((key) => process.env[key]).find(Boolean);
}

export function getConfiguredOAuthProviders() {
  return Object.entries(providerEnvironment)
    .filter(([, credentials]) => firstConfigured(credentials.clientId) && firstConfigured(credentials.clientSecret))
    .map(([provider]) => provider);
}

export function getOAuthProviderCredentials() {
  return Object.fromEntries(
    Object.entries(providerEnvironment)
      .map(([provider, credentials]) => {
        const clientId = firstConfigured(credentials.clientId);
        const clientSecret = firstConfigured(credentials.clientSecret);

        return clientId && clientSecret ? [provider, { clientId, clientSecret }] : null;
      })
      .filter(Boolean),
  );
}
