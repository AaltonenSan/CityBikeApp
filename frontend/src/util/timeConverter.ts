/** Convert seconds to minutes and seconds */
export default function durationMMss(duration: number): string {
  const minutes = Math.floor(duration / 60)
  const seconds = duration % 60
  return `${minutes}min ${seconds}s`
}