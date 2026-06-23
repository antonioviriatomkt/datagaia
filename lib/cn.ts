import { twMerge } from "tailwind-merge";

/**
 * className joiner with Tailwind conflict resolution.
 * Later classes win over earlier conflicting ones (e.g. a `py-16` override
 * beats a base `py-[88px]`), so component base styles stay overridable.
 */
export function cn(
  ...parts: Array<string | false | null | undefined>
): string {
  return twMerge(parts.filter(Boolean).join(" "));
}
