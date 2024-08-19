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