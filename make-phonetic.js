import nReadlines from 'n-readlines'
import { distance } from 'fastest-levenshtein'

const [,, inputPath] = process.argv
const phoneticLines = new nReadlines(inputPath)

const result = {}
let line
while (line = phoneticLines.next()) {
  const [word, phonetic] = line.toString('utf8').split(' ')
  const baseWord = word.replace(/^(.*)\([1-9]\)$/, '$1')
  if (baseWord in result) {
    result[baseWord].push(phonetic)
  } else {
    result[baseWord] = [phonetic]
  }
}

console.log('export default {')
for (const word in result) {
  let best = ''
  let bestDistance = 999
  for (const ph of result[word]) {
    const dist = distance(ph, word.toLowerCase())
    if (dist < bestDistance) {
      best = ph
      bestDistance = dist
    }
  }
  console.log(`"${word}": "${best}",`)
}
console.log('};')
