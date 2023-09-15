export function fromBitVectorSetArray(bitVectorSets: number[]): number[] {
  const ret = []
  if (bitVectorSets == null || bitVectorSets.length == 0) {
    return new Array<number>(0)
  }
  for (let j = 0; j < bitVectorSets.length; j = j + 2) {
    const offset = bitVectorSets[j]
    const data = bitVectorSets[j + 1]
    for (let i = 0; i < 32; i++) {
      if (data == (data | (1 << i))) {
        ret.push(offset * 32 + i)
      }
    }
  }
  return ret
}
