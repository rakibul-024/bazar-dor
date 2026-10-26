import { toNextJsHandler } from "better-auth/next-js";
import { getAuth } from "../../../../lib/auth";

async function handleAuthRequest(request, method) {
  const auth = await getAuth();
  const handlers = toNextJsHandler(auth);
  return handlers[method](request);
}

export function GET(request) {
  return handleAuthRequest(request, "GET");
}

export function POST(request) {
  return handleAuthRequest(request, "POST");
}
