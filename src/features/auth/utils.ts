export function createAvatarFallback(name: string, email: string) {
  return name
    ? name.charAt(0).toUpperCase()
    : (email.charAt(0).toUpperCase() ?? 'U')
}
