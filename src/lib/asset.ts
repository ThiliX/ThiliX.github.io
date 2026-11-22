/**
 * Resolves a file in /public against the site's base path, so links keep working
 * when the site is hosted under a sub-path (e.g. https://user.github.io/repo-name/).
 * External URLs are returned unchanged.
 */
export function asset(path: string): string {
  if (/^(https?:)?\/\//.test(path)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
