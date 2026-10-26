import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { getOAuthProviderCredentials } from "./authProviders";

let mongoClientPromise;
let authInstance;

function requiredEnv(keys, label) {
  for (const key of keys) {
    if (process.env[key]) return process.env[key];
  }

  throw new Error(`Missing ${label}. Set one of: ${keys.join(", ")}`);
}

export async function getAuth() {
  if (authInstance) return authInstance;

  const databaseUrl = requiredEnv(
    ["MONGODB_URI", "BETTER_AUTH_DB_URL", "BETTER_Auth_DB_URL"],
    "MongoDB connection string",
  );
  const secret = requiredEnv(["BETTER_AUTH_SECRET"], "Better Auth secret");
  const baseURL = requiredEnv(["BETTER_AUTH_URL"], "Better Auth base URL");

  if (!mongoClientPromise) {
    mongoClientPromise = new MongoClient(databaseUrl).connect();
  }

  const client = await mongoClientPromise;
  authInstance = betterAuth({
    database: mongodbAdapter(client.db(), { client }),
    secret,
    baseURL,
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      autoSignIn: false,
    },
    socialProviders: getOAuthProviderCredentials(),
  });

  return authInstance;
}
