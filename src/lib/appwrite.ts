import 'server-only'

import { Account, Client } from 'node-appwrite'

export async function createAdminClient() {
  const {
    NEXT_PUBLIC_APPWRITE_ENDPOINT,
    NEXT_PUBLIC_APPWRITE_PROJECT,
    NEXT_APPWRITE_API_KEY,
  } = process.env

  const client = new Client()
    .setEndpoint(NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(NEXT_APPWRITE_API_KEY!)

  return {
    get account() {
      return new Account(client)
    },
  }
}
