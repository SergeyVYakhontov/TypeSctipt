export function updateFromPartial<T>(object: T, updates: Partial<T>): T {
  return { ...object, ...updates };
}
