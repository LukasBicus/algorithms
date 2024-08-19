export function hasAtLeast3Vowels(text: string) {
  return [text.includes('a')
    , text.includes('e')
    , text.includes('i')
    , text.includes('o')
    , text.includes('u')].filter(Boolean).length > 2
    ;
}

export function doesContainAbCdPqXy(text: string) {
  return /(ab|cd|pq|xy)/.test(text)
}

export function doesContainALetterTwiceInRow(text: string) {
  return /(aa|bb|cc|dd|ee|ff|gg|hh|ii|jj|kk|ll|mm|nn|oo|pp|qq|rr|ss|tt|uu|vv|xx|yy|zz)/.test(text)
}