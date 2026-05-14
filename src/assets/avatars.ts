/** Eager-import all avatar images so Vite adds content hashes. */
const modules = import.meta.glob<{ default: string }>('./avatars/*.webp', {
  eager: true,
})

const cache: Record<string, string> = {}
for (const [path, mod] of Object.entries(modules)) {
  const name = path.split('/').pop()!.replace(/\.webp$/, '')
  cache[name] = mod.default
}

/** Resolve a hashed avatar URL by speaker id (e.g. `'yang-yue'`). */
export function avatar(id: string): string {
  return cache[id] ?? ''
}
