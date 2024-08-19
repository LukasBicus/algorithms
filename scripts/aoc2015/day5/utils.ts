export function hasAllVowels(text: string) {
  return text.includes('a')
    && text.includes('e')
    && text.includes('i')
    && text.includes('o')
    && text.includes('u')
    ;
}

export function doesContainAbCdPqXy(text: string) {
  return /(ab|cd|pq|xy)/.test(text)
}