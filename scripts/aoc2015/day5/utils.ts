export function hasAtLeast3Vowels(text: string) {
  const splitText = text.split('');
  return (splitText.filter(letter => letter === 'a').length
    + splitText.filter(letter => letter === 'e').length
    + splitText.filter(letter => letter === 'i').length
    + splitText.filter(letter => letter === 'o').length
    + splitText.filter(letter => letter === 'u').length) > 2
    ;
}

export function doesContainAbCdPqXy(text: string) {
  return /(ab|cd|pq|xy)/.test(text)
}

export function doesContainALetterTwiceInRow(text: string) {
  return /(aa|bb|cc|dd|ee|ff|gg|hh|ii|jj|kk|ll|mm|nn|oo|pp|qq|rr|ss|tt|uu|vv|ww|xx|yy|zz)/.test(text)
}

export function splitToPairs(text: string, pairs: string[]=[]): {
  remainingText: string
  pairs: string[]
} {
  // if length is n, add first two letters to array, call splitToPairs again
  if (text.length > 2) {
    return splitToPairs(text.slice(1), [...pairs, text.slice(0, 2)])
  }
  // if length is 2, add remainingString to pairs and set remaining strings to '', loop is over
  if (text.length === 2) {
    return {
      remainingText: '',
      pairs: [...pairs, text]
    }
  }
  // if lenght is 1, or 0, return empty array
  if (text.length < 2) {
    return {
      remainingText: text,
      pairs: pairs
    }
  }
  return {
    remainingText: '',
    pairs: []
  }
}

export function hasAPairAppearingTwice(line: string) {
  // split to pairs
  // loop trough pairs, if you will be able to find same two, break
  return false
}
export function has2SameLettersWith1BetweenThem(line: string) {
  return /(a[a-z]a|b[a-z]b|c[a-z]c|d[a-z]d|e[a-z]e|f[a-z]f|g[a-z]g|h[a-z]h|i[a-z]i|j[a-z]j|k[a-z]k|l[a-z]l|m[a-z]m|n[a-z]n|o[a-z]o|p[a-z]p|q[a-z]q|r[a-z]r|s[a-z]s|t[a-z]t|u[a-z]u|v[a-z]v|w[a-z]w|x[a-z]x|y[a-z]y|z[a-z]z)/.test(line)
}