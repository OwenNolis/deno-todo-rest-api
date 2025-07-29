export function isRunningLocally(): boolean {
  return Deno.env.get("DENO_DEPLOYMENT_ID") === undefined;
}

export function isDeploy(): boolean {
  return Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;
}