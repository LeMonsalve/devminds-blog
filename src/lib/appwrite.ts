import 'server-only'

import { Account, Client } from 'node-appwrite'

export async function createAdminClient() {
  const {
    NEXT_PUBLIC_APPWRITE_ENDPOINT: endpoint,
    NEXT_PUBLIC_APPWRITE_PROJECT: project,
    NEXT_APPWRITE_API_KEY: key,
  } = process.env

  const client = new Client()
    .setEndpoint(endpoint!)
    .setProject(project!)
    .setKey(key!)

  return {
    get account() {
      return new Account(client)
    },
  }
}
