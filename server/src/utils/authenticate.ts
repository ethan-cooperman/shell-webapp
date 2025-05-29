/**
 * Check credentials to env-stored password
 * @param cred bearer token
 * @returns whether or not the token matches
 */
export default function authenticate(cred: string): boolean {
  return cred === process.env.PASSWORD;
}
