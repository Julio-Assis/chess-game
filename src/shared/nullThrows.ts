export function nullThrows<T>(obj: T | null | undefined): T {
  if (obj == null) {
    throw Error('Object is null');
  }

  return obj;
}
