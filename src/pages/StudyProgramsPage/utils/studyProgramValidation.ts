export function hasDuplicateSubjectNames(subjects: { name: string }[]): boolean {
  const seen = new Set<string>()

  for (const subject of subjects) {
    const normalized = subject.name.trim().toLowerCase()
    if (!normalized) continue

    if (seen.has(normalized)) {
      return true
    }

    seen.add(normalized)
  }

  return false
}
